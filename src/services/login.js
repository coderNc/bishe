import api from "./api";

// 志愿者登录
export const volLogin = (userName, password) => {
  return api.post({
    url: `/user/login`,
    data: {
      user_name: userName,
      password
    }
  });
};

// 志愿者退出登录
export const volUnLogin = id => {
  return api.post({
    url: `/user/un-login`,
    data: {
      id
    }
  });
};

// 组织登录
export const orgLogin = (data) => {
  return api.post({
    url: `/org/login`,
    data,
  });
};

// 组织退出登录
export const orgUnLogin = id => {
  return api.post({
    url: `/org/un-login`,
    data: {
      id
    }
  });
};

