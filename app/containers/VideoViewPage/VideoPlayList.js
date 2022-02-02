import LoadingWithText from 'components/LoadingWithText';
import NoItemInList from 'components/NoItemInList';
import { getPlayListAction } from 'containers/App/actions';
import { makeSelectPlaylist } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { RefreshOutlined, PlayArrow as PlayIcon } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { ROUTE_VIDEO_VIEW } from 'containers/App/routes';
import { push } from 'connected-react-router';
import { getAge, converSecondToTime } from 'utils/helpers';
import { VideoPlayListWrapper, VideoItemWrapper } from './styles';

function VideoPlayList({ playlistId, currentVideoId, playlistData, dispatch }) {
  useEffect(() => {
    handleFetchPlaylistFromServer();
  }, [playlistId]);

  function handleFetchPlaylistFromServer() {
    dispatch(getPlayListAction(playlistId));
  }

  return (
    <VideoPlayListWrapper>
      {playlistData.id && <LoadingWithText text="در حال بارگذاری لیست پخش" />}

      {playlistData.error && (
        <NoItemInList
          title={
            <Button
              className="reloadPlaylist"
              onClick={handleFetchPlaylistFromServer}
            >
              اطلاعات لیست پخش دریافت نشد دوباره تلاش کنید <RefreshOutlined />
            </Button>
          }
        />
      )}

      {playlistData.data && (
        <div className="playlistBox">
          <div className="header">
            {playlistData.data.title}{' '}
            <i>تعداد ویدیو {playlistData.data.videos.length}</i>
          </div>

          <div className="list">
            {playlistData.data.videos.map(video => (
              <VideoItemWrapper
                className={`VideoItem ${
                  currentVideoId === video.id ? 'selected' : ''
                }`}
                key={video.id}
                onClick={() =>
                  dispatch(
                    push(
                      `${ROUTE_VIDEO_VIEW.replace(
                        ':slug',
                        video.slug,
                      )}?playlist=${playlistId}`,
                    ),
                  )
                }
              >
                {currentVideoId === video.id && (
                  <PlayIcon className="playIcon" />
                )}

                <img src={video.banner_link} alt={video.title} />
                <span className="duration">
                  {converSecondToTime(video.duration)}
                </span>

                <div className="videoDetail">
                  <h3 className="title">{video.title}</h3>

                  <div className="viewsAndAge">
                    <span>{video.views} بازدید</span>
                    <span>{getAge(video.age)}</span>
                  </div>
                </div>
              </VideoItemWrapper>
            ))}
          </div>
        </div>
      )}
    </VideoPlayListWrapper>
  );
}

VideoPlayList.propTypes = {
  playlistId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  playlistData: PropTypes.object.isRequired,
  currentVideoId: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    .isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  playlistData: makeSelectPlaylist(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(VideoPlayList);
