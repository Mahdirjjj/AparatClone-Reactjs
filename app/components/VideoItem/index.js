/**
 *
 * VideoItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  DeleteOutline as DeleteIcon,
  EditOutlined as EditIcon,
  BarChartOutlined as StatisticsIcon,
} from '@material-ui/icons';

import { converSecondToTime } from 'utils/helpers';
import {
  VIDEO_STATE_BLOCKED,
  VIDEO_STATE_BLOCKED_TITLE,
  VIDEO_STATE_PENDING,
  VIDEO_STATE_PENDING_TITLE,
  VIDEO_STATE_CONVERTED,
  VIDEO_STATE_CONVERTED_TITLE,
} from 'utils/constants';
import Confirm from 'components/Confirm';
import {
  deleteVideoAction,
  deleteVideoErrorClearAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectDeleteVideo } from 'containers/App/selectors';
import { Grid } from '@material-ui/core';
import { push } from 'connected-react-router';
import { ROUTE_VIDEO_UPDATE, ROUTE_VIDEO_SHOW } from 'containers/App/routes';

const VideoItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: #fff;
  width: 180px;
  height: 220px;
  box-shadow: 0 0px 2px 0px #e8e8e8;
  position: relative;
  margin-bottom: 2em;

  .duration {
    background: #f9b03a;
    border: 1px solid #c78d36;
    padding: 4px 2px;
    margin: 0;
    width: auto;
    position: absolute;
    left: 0.6em;
    top: 35%;
    line-height: 1em;
    height: 1.5em;
    min-width: 32px;
    border-radius: 2px;
    text-align: center;
    opacity: 0.8;
  }

  .tag {
    background: #ddeefe;
    color: #4e90ba;
    position: absolute;
    right: 0.6em;
    top: 35%;
    padding: 3px 7px;
    font-size: 0.8em;
    font-weight: bold;
    border-radius: 5px;
    opacity: 0.8;
  }

  .content {
    padding: 0.5em;
    position: relative;

    .title {
      font-size: 1em;
      font-wigth: 600;
      padding: 0;
      margin: 0;
    }

    .views {
      padding: 0;
      margin: 0.2em 0;
      font-size: 0.8em;
    }
  }

  .buttons {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-around;
    padding: 0.4em;

    .button {
      padding: 0;
      margin: 0;
      min-width: auto;
      transition: 200ms ease;
      cursor: pointer;

      &:not(.disabled):hover {
        color: red;
        transform: scale(1.3);
      }

      &.disabled {
        opacity: 0.5;
        color: #888;
        cursor: not-allowed;
      }
    }
  }

  .errorBox {
    background: #ff5c5c;
    color: #fff;
    padding: 0.5em;
    font-size: 1em;
    text-align: right;
    position: absolute;
    bottom: 0;
    width: 100%;
    cursor: pointer;

    span {
      color: #edff1c;
      position: absolute;
      left: 0.5em;
      top: 0.2em;
      font-size: 1.2em;
      padding: 2px;

      :hover {
        color: #fff;
      }
    }
  }
`;

const Img = styled.img`
  height: 45%;
  width: 100%;
  border-bottom: 1px solid #eee;
  cursor: pointer;
`;

function VideoItem({
  video,
  deletingData,
  deleteVideo,
  dispatch,
  removeDeleteError,
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  function handleDeleteVideo() {
    deleteVideo(video);
    setShowDeleteModal(false);
  }

  function handleRedirectToShowVideoPage() {
    dispatch(push(ROUTE_VIDEO_SHOW.replace(':slug', video.slug)));
  }

  function handleRedirectToUpdatePage() {
    dispatch(push(ROUTE_VIDEO_UPDATE.replace(':slug', video.slug)));
  }

  return (
    <VideoItemWrapper>
      <Img
        src={video.banner_link}
        alt={video.title}
        onClick={handleRedirectToShowVideoPage}
      />

      <b className="duration">{converSecondToTime(video.duration)}</b>

      {!!video.republished && <span className="tag">بازنشر</span>}

      {video.state === VIDEO_STATE_PENDING && (
        <span className="tag">{VIDEO_STATE_PENDING_TITLE}</span>
      )}

      {video.state === VIDEO_STATE_CONVERTED && (
        <span className="tag">{VIDEO_STATE_CONVERTED_TITLE}</span>
      )}

      {video.state === VIDEO_STATE_BLOCKED && (
        <span className="tag">{VIDEO_STATE_BLOCKED_TITLE}</span>
      )}

      <div className="content">
        <h2 className="title" title={video.title}>
          {video.title.substring(0, 50)}
          {video.title.length > 50 ? '...' : ''}
        </h2>
        <p className="views">{video.views} بازدید</p>
      </div>

      <Confirm
        title="آیا مطمئن هستید؟"
        open={showDeleteModal}
        onOk={handleDeleteVideo}
        onCancel={() => setShowDeleteModal(false)}
      >
        از حذف این ویدیو مطمئن هستید؟
      </Confirm>

      <div className="buttons">
        <DeleteIcon
          className={`button ${deletingData.slug ? 'disabled' : ''}`}
          onClick={() => !deletingData.slug && setShowDeleteModal(true)}
        />

        <EditIcon className="button" onClick={handleRedirectToUpdatePage} />

        <StatisticsIcon
          className="button"
          onClick={handleRedirectToShowVideoPage}
        />
      </div>

      {deletingData.error && deletingData.error.slug === video.slug && (
        <Grid className="errorBox" onClick={removeDeleteError}>
          خطایی رخ داده است <span>x</span>
        </Grid>
      )}
    </VideoItemWrapper>
  );
}

VideoItem.propTypes = {
  video: PropTypes.object.isRequired,
  deletingData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  deleteVideo: PropTypes.func.isRequired,
  removeDeleteError: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  deletingData: makeSelectDeleteVideo(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deleteVideo: video => dispatch(deleteVideoAction(video.slug)),
    removeDeleteError: () => dispatch(deleteVideoErrorClearAction()),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(VideoItem);
