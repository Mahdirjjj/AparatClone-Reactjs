import React, { memo } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Grid, Tooltip } from '@material-ui/core';
import { converSecondToTime, getAge } from 'utils/helpers';
import {
  Edit as EditIcon,
  FileCopyOutlined as ShowIcon,
} from '@material-ui/icons';
import { ROUTE_VIDEO_UPDATE, ROUTE_VIDEO_VIEW } from 'containers/App/routes';
import { push } from 'connected-react-router';

const VideoDetailWrapper = styled(Grid)`
  flex-wrap: nowrap !important;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 3px 0px #c2c1c1;

  .imageGrid {
    position: relative;
    max-width: 300px;

    img {
      height: 150px;
      width: 100%;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }

    .duration {
      position: absolute;
      left: 1em;
      bottom: 1.5em;
      background: #f9b03a;
      border: 1px solid #c78d36;
      padding: 4px 2px;
      margin: 0;
      width: auto;
      line-height: 1em;
      height: 1.5em;
      min-width: 32px;
      border-radius: 2px;
      text-align: center;
      opacity: 0.8;
    }
  }

  .videoInfo {
    .title {
      padding: 0.5em;
      margin: 0.5em 0;
      font-size: 1.2em;
    }

    .views {
      padding: 0.5em;
      font-size: 0.9em;
    }

    .info {
      padding: 0.5em;
      margin: 0;
    }
  }

  .btnIcon {
    position: absolute;
    top: 0.5em;
    border: 1px solid #e8e8e8;
    border-radius: 50%;
    padding: 3px;
    width: 30px;
    height: 30px;
    background: #eee;
    cursor: pointer;

    :hover,
    :focus {
      border-color: #f5f5f5;
      background: #f5f5f5;
    }

    &.showIcon {
      left: 1em;
    }

    &.editIcon {
      left: 3em;
    }
  }

  @media (max-width: 760px) {
    .imageGrid {
      max-width: 200px;

      img {
        height: 120px;
      }
    }
  }

  @media (max-width: 480px) {
    flex-wrap: wrap !important;

    .imageGrid {
      max-width: 100%;
    }
  }
`;

function VideoDetail({ video, dispatch }) {
  function handleRedirectToUpdateVideoPage() {
    dispatch(push(ROUTE_VIDEO_UPDATE.replace(':slug', video.slug)));
  }

  return (
    <VideoDetailWrapper container spacing={2}>
      <Grid item className="imageGrid">
        <img src={video.banner_link} alt={video.title} />
        <b className="duration">{converSecondToTime(video.duration)}</b>
      </Grid>
      <Grid item className="videoInfo">
        <Tooltip title={video.title}>
          <h2 className="title">{video.title.substr(0, 50)}</h2>
        </Tooltip>
        <p className="view">
          {video.views} بازدید .<span>{getAge(video.age)}</span>
        </p>

        <Tooltip title={video.info}>
          <p className="info">{video.info.substr(0, 150)}</p>
        </Tooltip>
      </Grid>

      <EditIcon
        className="btnIcon editIcon"
        onClick={handleRedirectToUpdateVideoPage}
      />

      <ShowIcon
        className="btnIcon showIcon"
        onClick={() => {
          dispatch(push(ROUTE_VIDEO_VIEW.replace(':slug', video.slug)));
        }}
      />
    </VideoDetailWrapper>
  );
}

VideoDetail.propTypes = {
  video: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withStore = connect(
  undefined,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(VideoDetail);
