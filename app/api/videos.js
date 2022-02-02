import request from 'utils/request';

export function uploadVideoApi(file, onUploadProgress) {
  const data = new FormData();
  data.append('video', file);

  const config = {
    method: 'post',
    url: '/video/upload',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
    onUploadProgress,
  };

  return request(config);
}

export function uploadBannerApi(file) {
  const data = new FormData();
  data.append('banner', file);

  const config = {
    method: 'post',
    url: '/video/upload-banner',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  };

  return request(config);
}

export function createVideoApi(data) {
  const config = {
    method: 'post',
    url: '/video',
    data,
  };

  return request(config);
}

export function updateVideoApi(slug, data) {
  const config = {
    method: 'put',
    url: `/video/${slug}`,
    data,
  };

  return request(config);
}

export function getMyVideosApi(data) {
  const config = {
    method: 'get',
    url: '/video',
    data,
  };

  return request(config);
}

export function getVideoApi(slug) {
  const config = {
    method: 'get',
    url: `/video/${slug}`,
  };

  return request(config);
}

export function getVideosApi(params) {
  const config = {
    method: 'get',
    url: `/video?page=${params.page || 1}&per_page=${params.size || 10}`,
  };

  return request(config);
}

export function changeVideoStateApi(params) {
  const { slug, ...data } = params;
  const config = {
    method: 'put',
    url: `/video/${slug}/state`,
    data,
  };

  return request(config);
}

export function deleteVideoApi(slug) {
  const config = {
    method: 'delete',
    url: `/video/${slug}`,
  };

  return request(config);
}

export function getVideoStatisticsApi(slug, range) {
  const config = {
    method: 'get',
    url: `/video/${slug}/statistics`,
    params: {
      last_n_days: range,
    },
  };

  return request(config);
}

export function getCategorizedVideosApi(data) {
  const urlParams = Object.keys(data)
    .filter(k => data[k] !== null)
    .map(k => `${k}=${data[k]}`);

  const config = {
    method: 'get',
    url: `/categorized-videos?${urlParams.join('&')}`,
  };

  return request(config);
}

export function likeOrDislikeVideoApi(slug, like) {
  const config = {
    method: 'post',
    url: `/video/${slug}/${like ? 'like' : 'unlike'}`,
  };

  return request(config);
}

export function republishVideoApi(slug) {
  const config = {
    method: 'post',
    url: `/video/${slug}/republish`,
  };

  return request(config);
}
