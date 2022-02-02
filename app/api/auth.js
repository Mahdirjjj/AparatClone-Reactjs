import request from 'utils/request';

export function loginApi({ username, password }) {
  const config = {
    method: 'post',
    url: '/login',
    data: {
      username,
      password,
      grant_type: 'password',
      client_id: 2,
      client_secret: '5Ek0PkvZb52jkQRZfmZZCA7lqQVS0JMhV0lgBsNJ',
    },
  };

  return request(config);
}

export function registerUserApi(params) {
  const config = {
    method: 'post',
    url: '/register',
    data: params,
  };

  return request(config);
}

export function registerUserVerifyApi(params) {
  const config = {
    method: 'post',
    url: '/register-verify',
    data: params,
  };

  return request(config);
}
