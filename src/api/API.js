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
    
    console.log(payload);
  
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
