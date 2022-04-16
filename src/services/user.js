import api from "./api";

// 用户注册
export const userRegister = data => {
  return api.post({
    url: `/user/register`,
    data
  });
};

// 分页获取用户信息
export const getUserList = data => {
  return api.post({
    url: `/users`,
    data
  });
};

// 删除用户
export const delUserById = data => {
  return api.post({
    url: `/user/delete`,
    data
  });
};

// 获取登录用户信息
export const getUserInfo = () => {
  return api.post({
    url: `/user`
  });
};


