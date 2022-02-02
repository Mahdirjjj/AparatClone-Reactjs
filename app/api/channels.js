import request from 'utils/request';

export function getChannelStatisticsApi(range) {
  const config = {
    method: 'get',
    url: '/channel/statistics',
    params: {
      last_n_days: range,
    },
  };

  return request(config);
}

export function getChannelInfoApi(name) {
  const config = {
    method: 'get',
    url: `/channel/${name}`,
  };

  return request(config);
}

export function updateChannelInfoApi(params) {
  const config = {
    method: 'put',
    url: `/channel`,
    data: params,
  };

  return request(config);
}

export function updateChannelSocialsApi(params) {
  const config = {
    method: 'put',
    url: '/channel/socials',
    data: params,
  };

  return request(config);
}

export function updateChannelUserInfoApi(params) {
  const config = { method: 'put' };

  if ('password' in params) {
    config.url = '/change-password';
    config.data = {
      old_password: params.oldPassword,
      new_password: params.password,
    };
  } else {
    config.url = '/channel/user-info';
    config.data = params;
  }

  return request(config);
}

export function updateChannelUserInfoConfirmApi(code) {
  const config = {
    method: 'post',
    data: { code },
    url: '/channel/user-info-confirm',
  };

  return request(config);
}

export function uploadChannelBannerApi(file) {
  const data = new FormData();
  data.append('banner', file);

  const config = {
    method: 'post',
    url: '/channel',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  };

  return request(config);
}
