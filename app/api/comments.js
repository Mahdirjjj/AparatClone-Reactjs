import request from 'utils/request';

export function getCommetnListApi() {
  const config = {
    method: 'get',
    url: '/comment',
  };

  return request(config);
}

export function postCommentApi(data) {
  const config = {
    method: 'post',
    url: '/comment',
    data,
  };

  return request(config);
}

export function removeCommentApi(id) {
  const config = {
    method: 'delete',
    url: `/comment/${id}`,
  };

  return request(config);
}

export function changeCommentStateApi(id, state) {
  const config = {
    method: 'post',
    url: `/comment/${id}/state`,
    data: {
      state,
    },
  };

  return request(config);
}
