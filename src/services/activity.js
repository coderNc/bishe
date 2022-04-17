import api from "./api";

// 机构发布活动
export const createActivity = data => {
  return api.post({
    url: `/activity`,
    data
  });
};

// 根据机构id获取已发布全部活动
export const getActivityById = data => {
  return api.post({
    url: `/org/activity`,
    data
  });
};


// 用户报名参加活动
export const userJoinActivity = data => {
  return api.post({
    url: `/user/activity`,
    data
  });
};

// 用户取消活动报名
export const userUnJoinActivity = data => {
  return api.post({
    url: `/user/un-activity`,
    data
  });
};

// 分页获取用户可报名活动
export const getActivities = data => {
  return api.post({
    url: `/activities`,
    data
  });
};

// 获取活动详细信息及用户报名信息
export const getActivityAndUser = data => {
  return api.post({
    url: `/activity/user`,
    data
  });
};
