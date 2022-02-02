/**
 *
 * ManageVideosPage
 *
 */

import ErrorMessage from 'components/ErrorMessage';
import LoadingWithText from 'components/LoadingWithText';
import ReloaderMessage from 'components/ReloaderMessage';
import { getVideosAction } from 'containers/App/actions';
import {
  makeSelectVideos,
  makeSelectChangeVideoState,
} from 'containers/App/selectors';
import DashboardLayout from 'layouts/DashboardLayout';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import VideoModal from './VideoModal';
import VideosTable from './VideosTable';

export function ManageVideosPage({ videos, changeVideoState, dispatch }) {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const emptyList =
    !videos.params &&
    (videos.data && videos.data.data && !videos.data.data.length);

  useEffect(getVideosFromServer, [page, pageSize]);
  useEffect(() => {
    if (changeVideoState.data && videos.data && videos.data.data) {
      const selectedVideoItems = videos.data.data.filter(
        v => v.id === changeVideoState.data.id,
      );
      setSelectedVideo(
        selectedVideoItems.length ? selectedVideoItems[0] : null,
      );
    }
  }, [changeVideoState.data]);

  function getVideosFromServer() {
    dispatch(getVideosAction({ page, size: pageSize }));
  }

  function handlePageChange(p, s) {
    setPage(p);
    setPageSize(s);
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>مدیریت ویدیوها</title>
        <meta name="description" content="مدیریت ویدیوها" />
      </Helmet>

      {!!(videos.data && videos.data.data && videos.data.data.length) && (
        <VideosTable
          videos={videos.data.data}
          page={page}
          size={pageSize}
          total={videos.data.total}
          onChangePage={handlePageChange}
          onRowClick={setSelectedVideo}
        />
      )}

      {emptyList && (
        <ReloaderMessage
          message="هیچ ویدیو ای یافت نشد"
          reloadMessage="بارگذاری مجدد"
          onReload={getVideosFromServer}
        />
      )}

      {selectedVideo && (
        <VideoModal
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}

      {videos.params && <LoadingWithText text="در حال دریافت لیست ویدیو ها" />}

      {videos.error && (
        <ErrorMessage
          error={videos.error}
          closeable={false}
          forceMessage={
            <ReloaderMessage
              message="در دریافت اطلاعات ویدیو ها خطایی به وجود آمده است"
              reloadMessage="بارگذاری مجدد"
              onReload={getVideosFromServer}
            />
          }
        />
      )}
    </DashboardLayout>
  );
}

ManageVideosPage.propTypes = {
  videos: PropTypes.object,
  changeVideoState: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videos: makeSelectVideos(),
  changeVideoState: makeSelectChangeVideoState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ManageVideosPage);
