/**
 *
 * VideoViewPage
 *
 */

import { Button } from '@material-ui/core';
import ErrorMessage from 'components/ErrorMessage';
import LoadingWithText from 'components/LoadingWithText';
import VideoPlayer from 'components/VideoPlayer';
import { getVideoAction } from 'containers/App/actions';
import { makeSelectGetVideo } from 'containers/App/selectors';
import MailLayout from 'layouts/MailLayout';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import RelatedVideos from './RelatedVideos';
import { VideoViewContentWrapper } from './styles';
import VideoComments from './VideoComments';
import VideoInfo from './VideoInfo';
import VideoPlayList from './VideoPlayList';

export function VideoViewPage({ match, location, videoData, handleGetVideo }) {
  const loading = !!videoData.slug;
  const currentPlaylist = new URLSearchParams(location.search).get('playlist');

  useEffect(() => {
    handleGetVideoFromServer();
  }, [match.params.slug]);

  function handleGetVideoFromServer() {
    handleGetVideo(match.params.slug);
  }

  return (
    <MailLayout fullWidth>
      <Helmet>
        <title>VideoViewPage</title>
        <meta name="description" content="Description of VideoViewPage" />
      </Helmet>

      {loading && <LoadingWithText text="در حال دریافت اطلاعات ویدیو" />}

      {videoData.error && (
        <ErrorMessage
          error={videoData.error}
          options={{
            404: 'ویدیو مورد نظر یافت نشد',
            default: (
              <div>
                در دریافت اطلاعات ویدیو مشکلی به وجود آمده است
                <Button onClick={handleGetVideoFromServer}>
                  بارگذاری مجدد
                </Button>
              </div>
            ),
          }}
        />
      )}

      {videoData.data && (
        <VideoViewContentWrapper>
          {!!(
            videoData.data.related_videos &&
            videoData.data.related_videos.length
          ) && (
            <div className="sidebar" width="100%" height="300">
              {currentPlaylist && (
                <VideoPlayList
                  playlistId={currentPlaylist}
                  currentVideoId={videoData.data.id}
                />
              )}
              <RelatedVideos videos={videoData.data.related_videos} />
            </div>
          )}

          <div className="content">
            <VideoPlayer video={videoData.data} />

            <VideoInfo video={videoData.data} />

            <VideoComments video={videoData.data} />
          </div>
        </VideoViewContentWrapper>
      )}
    </MailLayout>
  );
}

VideoViewPage.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  videoData: PropTypes.object.isRequired,
  handleGetVideo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  videoData: makeSelectGetVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetVideo: videoId => dispatch(getVideoAction(videoId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoViewPage);
