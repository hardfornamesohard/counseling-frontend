// api.js
const HOST = "http://localhost:8080";  // 基础 URL

// 登录 API 请求
export const login = async (username, password) => {
  const payload = {
    name: username,
    secret: password,
  };

  const response = await fetch(HOST + "/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),  // 请求体
  });

  return response;  // 直接返回响应
};

export const register = async (user) => {
    
  const currentTime = new Date().toISOString(); // 获取当前时间的ISO字符串

  const payload = {
      name: user.username,
      secret: user.password,
      email: user.email,
      role: user.role,
      nickname: user.nickname,
      gmtCreated: currentTime,
      gmtModified: currentTime
    };
    

  
    const response = await fetch(HOST + "/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),  // 请求体
    });
  
    return response;  // 直接返回响应
  };

export const logout = (sessionId) => {
  return fetch(`${HOST}/logout?session=${sessionId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export const getUserInfo = (sessionId) => {
  return fetch(`${HOST}/user-info/find?session=${sessionId}`, {
    method: 'GET',
    headers:{
      'Session': localStorage.getItem('Session')
    }
    
  });
};

export const getUsers = (sessionId) => {
  return fetch(`${HOST}/admin-api/users?session=${sessionId}`, {
    method: 'GET',
    headers:{
      'Session': localStorage.getItem('Session')
    }
    
  });
};

export const changePassword = async (user) => {

  const payload = {
      id: user.id,
      secret: user.password,
    };
    console.log(payload);
    const response = await fetch(HOST + "/admin-api/changePassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Session': localStorage.getItem('Session')
      },
      body: JSON.stringify(payload),  // 请求体
    });
  
    return response;  // 直接返回响应
  };

  export const changeOther = async (user) => {

    const payload = {
        id: user.id,
        nickname: user.nickname,
        email: user.email
      };
      
      const response = await fetch(HOST + "/admin-api/changeOther", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Session': localStorage.getItem('Session')
        },
        body: JSON.stringify(payload),  // 请求体
      });
    
      return response;  // 直接返回响应
    };

    export const getCounselors = () => {
      return fetch(`${HOST}/user-info/counselors`, {
        method: 'GET',
        headers:{
          'Session': localStorage.getItem('Session')
        },    
      });
    };

    export const bookCounsel = (payload) => {
      return fetch(`${HOST}/counseling/book`, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers:{
          'Session': localStorage.getItem('Session'),
          'Content-Type': 'application/json'
        },    
      });
    };


    export const myCounselings = () => {
      return fetch(`${HOST}/counseling/my-counseling`, {
        method: 'GET',
        headers:{
          'Session': localStorage.getItem('Session')
        },    
      });
    };

export const saveUserInfo = (formData, sessionId) => {
  return fetch(`${HOST}/user-info/saveOrUpdate?session=${sessionId}`, {
    method: 'POST',
    body: formData,
    headers:{
      'Session': localStorage.getItem('Session')
    }

  });
};
