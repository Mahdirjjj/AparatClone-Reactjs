import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';

import DashboardLayout from 'layouts/DashboardLayout';
import { makeSelectMyVideos } from 'containers/App/selectors';
import { getMyVideosAction } from 'containers/App/actions';
import VideoList from 'components/VideoList';
import Filters from 'components/Filters';

import { VIDEO_STATE_BLOCKED } from 'utils/constants';

const FILTER_VALUES = {
  all: 'همه',
  unpublished: 'منتشر نشده',
  playlist: 'لیست پخش',
  republish: 'بازنشر شده',
};

function MyVideosPage({ videos, getVideos }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    getVideos();
  }, []);

  function filteredVideos() {
    switch (filter) {
      case 'unpublished':
        return videos.data.filter(video => video.state === VIDEO_STATE_BLOCKED);
      case 'playlist':
        return videos.data.filter(
          video => video.playlist && video.playlist.length,
        );
      case 'republish':
        return videos.data.filter(video => video.republished);
      default:
        return videos.data;
    }
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>ویدیو های من</title>
        <meta name="description" content="ویدیو های من" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={setFilter}
      />

      <VideoList videos={filteredVideos()} />
    </DashboardLayout>
  );
}

MyVideosPage.propTypes = {
  videos: PropTypes.object.isRequired,
  getVideos: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videos: makeSelectMyVideos(),
});

function mapDispatchToProps(dispatch) {
  return {
    getVideos: params => dispatch(getMyVideosAction(params)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default withStore(MyVideosPage);
