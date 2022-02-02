import request from 'utils/request';

export function followApi(name) {
  const config = {
    method: 'post',
    url: `/user/${name}/follow`,
  };

  return request(config);
}

export function unfollowApi(name) {
  const config = {
    method: 'post',
    url: `/user/${name}/unfollow`,
  };

  return request(config);
}

export function followingListApi() {
  const config = {
    method: 'get',
    url: '/user/followings',
  };

  return request(config);
}

export function followerListApi() {
  const config = {
    method: 'get',
    url: '/user/followers',
  };

  return request(config);
}

export function getUsersApi(params) {
  const config = {
    method: 'get',
    url: `/user?page=${params.page || 1}&per_page=${params.size || 10}`,
  };

  return request(config);
}

export function getUserMeApi() {
  const config = {
    method: 'get',
    url: '/user/me',
  };

  return request(config);
}

export function updateUserApi(params) {
  const { id, ...data } = params;

  const config = {
    method: 'put',
    url: `/user/${id}`,
    data,
  };

  return request(config);
}

export function resetUserPasswordApi(params) {
  const { id } = params;

  const config = {
    method: 'put',
    url: `/user/${id}/reset-password`,
  };

  return request(config);
}

export function unregisterUserApi() {
  const config = {
    method: 'delete',
    url: '/user/me',
  };

  return request(config);
}

export function deleteUserApi(params) {
  const config = {
    method: 'delete',
    url: `/user/${params.id}`,
  };

  return request(config);
}

export function logoutApi() {
  const config = {
    method: 'post',
    url: '/logout',
  };

  return request(config);
}
