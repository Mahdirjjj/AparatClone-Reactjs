import React, { memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';

import { converSecondToTime, getAge } from 'utils/helpers';
import { ROUTE_VIDEO_VIEW, ROUTE_MY_CHANNEL } from 'containers/App/routes';

import { VideoItemWrapper, UserLink } from './styles';

function VideoItem({ video, dispatch }) {
  function handleClick() {
    dispatch(push(ROUTE_VIDEO_VIEW.replace(':slug', video.slug)));
  }

  function handleRedirectToUserPage(e) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(push(ROUTE_MY_CHANNEL.replace(':name', video.user.channel.name)));
  }

  return (
    <VideoItemWrapper onClick={handleClick}>
      <img src={video.banner_link} alt={video.title} />
      <span className="duration">{converSecondToTime(video.duration)}</span>
      <h3 className="title" title={video.title}>
        {video.title.substring(0, 50)}
        {video.title.length > 50 ? '...' : ''}
      </h3>

      <UserLink className="user" onClick={handleRedirectToUserPage}>
        {video.user.name}
      </UserLink>

      <b className="views">
        <span>{video.views} بازدید</span>
        {' - '}
        <span>{getAge(video.age)}</span>
      </b>
    </VideoItemWrapper>
  );
}

VideoItem.propTypes = {
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
)(VideoItem);
