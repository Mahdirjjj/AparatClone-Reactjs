import { Button } from '@material-ui/core';
import {
  AddOutlined as FollowIcon,
  Favorite as LikeIcon,
  FavoriteBorder as LikeEmptyIcon,
  GetApp as DownloadIcon,
  QueryBuilderOutlined,
  RepeatOutlined as RepublishIcon,
  ShareOutlined as ShareIcon,
  VisibilityOutlined as ViewsIcon,
  PlaylistPlayOutlined,
} from '@material-ui/icons';
import {
  followAction,
  likeOrDislikeAction,
  likeOrDislikeClearAction,
  republishVideoAction,
  republishVideoClearAction,
  unfollowAction,
} from 'containers/App/actions';
import {
  makeSelectLikeOrDislike,
  makeSelectRepublishVideo,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getAge } from 'utils/helpers';
import { push } from 'connected-react-router';
import { ROUTE_HOME, ROUTE_MY_CHANNEL } from 'containers/App/routes';
import ShareVideoModal from './ShareVideoModal';
import {
  ButtonsWrapper,
  ChannelInfoWrapper,
  VideoInfoWrapper,
  LinkButton,
} from './styles';

function VideoInfo({ video, likeOrDislikeData, republishVideoData, dispatch }) {
  const [showShareModal, setShowShareModal] = useState(false);
  const isFollowed = video.channel.is_followed;

  useEffect(() => {
    if (likeOrDislikeData.data || likeOrDislikeData.error) {
      dispatch(likeOrDislikeClearAction());
    }
  }, [likeOrDislikeData]);

  useEffect(() => {
    if (republishVideoData.data || republishVideoData.error) {
      dispatch(republishVideoClearAction());
    }
  }, [republishVideoData]);

  function handleRepulishVideo() {
    dispatch(republishVideoAction(video.slug));
  }

  function handleLikeAndDislike() {
    dispatch(likeOrDislikeAction(video.slug, !video.liked));
  }

  function handleFollowOrUnfollow() {
    if (isFollowed) {
      dispatch(unfollowAction(video.channel.name));
    } else {
      dispatch(followAction(video.channel.name));
    }
  }

  function redirect(path) {
    dispatch(push(path));
  }

  function toggleShareModal() {
    setShowShareModal(!showShareModal);
  }

  return (
    <VideoInfoWrapper>
      <div className="Row">
        <h1 className="title">{video.title}</h1>
        <span className="views">
          <ViewsIcon className="icon" /> {video.views}
        </span>
      </div>

      <div className="Row">
        <ChannelInfoWrapper
          onClick={() =>
            redirect(ROUTE_MY_CHANNEL.replace(':name', video.channel.name))
          }
        >
          <img src={video.channel.banner} alt={video.title} />

          <div>
            <h3>{video.channel.name}</h3>
            <span>{video.channel.followers_count} دنبال کننده</span>
          </div>
        </ChannelInfoWrapper>

        <ButtonsWrapper>
          <Button onClick={handleLikeAndDislike}>
            {video.liked ? (
              <LikeIcon style={{ color: '#df0f50' }} />
            ) : (
              <LikeEmptyIcon />
            )}

            {video.likeCount}
          </Button>

          <a
            className="MuiButtonBase-root"
            href={video.link}
            download
            target="_blank"
          >
            <DownloadIcon />
          </a>

          <Button onClick={toggleShareModal}>
            <ShareIcon />
          </Button>
          {showShareModal && (
            <ShareVideoModal
              url={window.location.href}
              onClose={toggleShareModal}
            />
          )}

          <Button onClick={handleRepulishVideo}>
            <RepublishIcon />
          </Button>

          <Button
            className={`btn btn-follow ${
              isFollowed ? 'followed' : 'unfollowed'
            }`}
            onClick={handleFollowOrUnfollow}
          >
            <FollowIcon />
            {isFollowed ? 'دنبال شده' : 'دنبال کردن'}
          </Button>
        </ButtonsWrapper>
      </div>

      <div className="extraInfo">
        <div className="videoDescribtion">{video.info}</div>

        <div className="videoTimeAndTags">
          <LinkButton>
            <QueryBuilderOutlined style={{ fontSize: '1em' }} />
            {getAge(video.age)}
          </LinkButton>

          <LinkButton
            onClick={() =>
              redirect(`${ROUTE_HOME}?playlist=${video.playlist.id}`)
            }
          >
            <PlaylistPlayOutlined />
            {video.playlist.title}
          </LinkButton>

          {video.tags.map(tag => (
            <LinkButton
              key={tag.id}
              className="tag"
              onClick={() => redirect(`${ROUTE_HOME}?tag=${tag.id}`)}
            >
              <i style={{ fontSize: '1.2em' }}>#</i>
              {tag.title}
            </LinkButton>
          ))}
        </div>
      </div>
    </VideoInfoWrapper>
  );
}

VideoInfo.propTypes = {
  video: PropTypes.object.isRequired,
  likeOrDislikeData: PropTypes.object.isRequired,
  republishVideoData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  likeOrDislikeData: makeSelectLikeOrDislike(),
  republishVideoData: makeSelectRepublishVideo(),
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
)(VideoInfo);
