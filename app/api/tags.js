import request from 'utils/request';

export function getTagsApi() {
  const config = {
    method: 'get',
    url: '/tag',
  };

  return request(config);
}

export function addTagApi(tag) {
  const config = {
    method: 'post',
    url: '/tag',
    data: { title: tag },
  };

  return request(config);
}
