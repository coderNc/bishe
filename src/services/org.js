import api from "./api";

// 组织注册
export const orgRegister = data => {
  return api.post({
    url: `/org/register`,
    data
  });
};

// 分页获取组织信息
export const getOrgList = data => {
  return api.post({
    url: `/orgs`,
    data
  });
};
// 根据id获取组织信息
export const getOrgById = data => {
  return api.post({
    url: `/org`,
    data
  });
};

// 获取登录组织信息
export const getOrgInfo = () => {
  return api.post({
    url: `/org/login-org`
  });
};

// 根据id删除组织
export const delOrgById = data => {
  return api.post({
    url: `/org/delete`,
    data
  });
};

