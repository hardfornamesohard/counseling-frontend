import React, { useState, useEffect } from "react";
import { Card, Avatar, Button, Modal, Form, Input, DatePicker,Table } from "antd";
import { getCounselors, bookCounsel, myCounselings } from "../api/API.js";
import moment from 'moment';
import { range } from 'lodash';


const AVATAR_BASE_URL = 'http://localhost:8080/images/avatar/';

const Home = () => {
  const [counselors, setCounselors] = useState([]);

  const [visible, setVisible] = useState(false);
  const [counselorId, setCounselorId] = useState(null);
  const [form] = Form.useForm();
  const[counselingBookData, setCounselingBookData] = useState([]);
  const[onlines, setOnlines] = useState([]);

  useEffect(() => {
    const fetchCounselors = async () => {
      if(localStorage.getItem('Session') != null){
        if(localStorage.getItem('role') === '2' || localStorage.getItem('role') == '0') {
          const response = await getCounselors();
          const json = await response.json();
          if (json && json.data) {
            setCounselors(json.data);
            setOnlines(json.data2);

          }
        }
        if(localStorage.getItem('role') === '1') {
          const response = await myCounselings();
          const json = await response.json();
          if (json && json.data) {
            setCounselingBookData(json.data);
          }
        }
    }
    };
    fetchCounselors();
  }, []);

  const handleBook = (id) => {
    setVisible(true);
    setCounselorId(id);
  };

  const handleOk = async () => {
    form.validateFields().then((values) => {
      // 提交表单数据
      values.counselDate = values.counselDate.valueOf();
      bookCounsel(values).then((response) => {
        response.json().then((json) => {
          console.log(json);
          setVisible(false);
        });
      });
    });
  };

  return (
    <div>
      {localStorage.getItem('role') === '0' || localStorage.getItem('role') === '2' ? (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
          {counselors.map((counselor, index) => (
            <Card
              key={counselor.id}
              style={{ width: 240, margin: 20 }}
              // cover={<img alt="avatar" src={counselor.avatar ? `${AVATAR_BASE_URL}${counselor.avatar}` : undefined} />}
            >
              <Card.Meta
                avatar={<Avatar src={counselor.avatar ? `${AVATAR_BASE_URL}${counselor.avatar}` : undefined} />}
                title={counselor.name}
                description={counselor.signature}
              />s
              <p>性别：{counselor.gender === 0 ? "男" : counselor.gender === 1 ? "女" : "其他"}</p>
              <p>年龄：{counselor.age}</p>
              <p>爱好：{counselor.hobby}</p>
              
              <Button type="primary" style={{ marginRight: 10 }} onClick={() => handleBook(counselor.uid)}>
                预约
              </Button>
              {onlines[index] ? (
      <Button type="primary">
        咨询
      </Button>
    ) : (
      <Button type="primary" disabled>
        不在线
      </Button>)}
            </Card>
          ))}
          <Modal
            title="心理咨询预约"
            open={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
          >
    
            <Form form={form} initialValues={{ puid: counselorId, suid: Number(localStorage.getItem('uid')) }}>
              <Form.Item name="topic" rules={[{ required: true, message: "请填写主题" }]}>
                <Input placeholder="主题" />
              </Form.Item>
              <Form.Item name="description" rules={[{ required: true, message: "请填写问题描述" }]}>
                <Input.TextArea placeholder="问题描述" />
              </Form.Item>
              <Form.Item name="counselDate" rules={[{ required: true, message: "请选择时间" }]}>
                <DatePicker 
                format="YYYY-MM-DD hh:mm"
                showTime={{
                  defaultValue: moment('10:00', 'hh:mm'),
                  format: 'hh:mm',
                  minuteStep: 30,
                  disabledHours: () => range(0, 10).concat(range(17, 24)),
                }}
                disabledDate={(current) => {
                  return current <= moment().startOf('day') + 1;
                }}
                />
              </Form.Item>
              <Form.Item name="puid">
                <Input type="hidden"/>
              </Form.Item>
              <Form.Item name="suid">
                <Input type="hidden"/>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      ) : (
        <div>
<Table columns={[
          {
            title: '状态',
            dataIndex: 'status',
            render: (status) => {
              switch (status) {
                case 0:
                  return '创建';
                case 1:
                  return '已完结';
                case 2:
                  return '已取消';
                default:
                  return '未知';
              }
            },
          },
          {
            title: '创建时间',
            dataIndex: 'gmtCreated',
            render: (gmtCreated) => moment(gmtCreated).format('YYYY-MM-DD HH:mm'),
          },
          {
            title: '咨询时间',
            dataIndex: 'counselDate',
            render: (counselDate) => moment(counselDate).format('YYYY-MM-DD HH:mm'),
          },
          {
            title: '用户ID',
            dataIndex: 'suid',
          },
          {
            title: '主题',
            dataIndex: 'topic',
          },
          {
            title: '描述',
            dataIndex: 'description',
          },
        ]} dataSource={counselingBookData} />
      

        </div>
      )}
    </div>
  );
  
};

export default Home;