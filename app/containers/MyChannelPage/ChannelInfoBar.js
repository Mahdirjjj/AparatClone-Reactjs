import React, { memo } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid, Button } from '@material-ui/core';
import {
  Settings as SettingIcon,
  AddOutlined as FollowIcon,
} from '@material-ui/icons';
import { ROUTE_MY_PROFILE } from 'containers/App/routes';
import { push } from 'connected-react-router';
import { compose } from 'redux';
import {
  makeSelectUserMe,
  makeSelectLocation,
  makeSelectFollow,
  makeSelectUnfollow,
} from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { followAction, unfollowAction } from 'containers/App/actions';

const HEIGTH = 60;
const ChannelInfoBarWrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 10px 15px 0px rgba(217, 217, 217, 0.3);
  top: 150px;
  position: absolute;
  height: ${HEIGTH}px;
  width: 100%;
  left: 0;
  right: 0;

  .containerWrapper {
    justify-content: space-around;

    .userInfo {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: ${HEIGTH}px;

      .userAvatar {
        background-color: #fff;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 2px solid #eee;
        padding: 0.5em;
        margin-top: -50px;
        margin-right: 50px;
      }

      .channelName {
        color: #000;
        margin: 1em 0;
        padding: 0 1em;
        font-size: 1.2em;
      }

      .settingBtn {
        border-radius: 15px;
        padding: 0.5em;
        margin: 0 0.2em;

        &:not(:disabled) {
          background: #05a3e8;
          color: #fff;
        }

        :hover {
          opacity: 0.8;
        }

        .settingIcon {
          font-size: 1.3em !important;
          margin-left: 0.2em;
        }

        &.followed {
          background: #dedede;
          &,
          .MuiSvgIcon-root {
            color: #444;
          }
        }
      }
    }

    .statistics {
      display: flex;
      height: 60px;
      align-items: center;

      .statisticLabel {
        font-size: 1em;
        color: #555;
        padding: 0 0.5em;
        text-align: center;

        b {
          color: #000;
          display: block;
          font-weigth: bold;
          font-size: 1.3em;
          margin-bottom: 0.2em;
        }
      }
    }
  }
`;

function ChannelInfoBar({
  data,
  userData,
  followData,
  unfollowData,
  location,
  dispatch,
  handleFollow,
  handleUnfollow,
}) {
  const channelName = location.pathname.replace('/channel/', '');
  const isLogin = !!userData.data;
  const isMe = isLogin ? userData.data.channel.name === channelName : false;
  const isFollowed = data.channel.is_followed;

  function handleFollowUser() {
    if (isFollowed) {
      handleUnfollow(channelName);
    } else {
      handleFollow(channelName);
    }
  }

  return (
    <ChannelInfoBarWrapper>
      <Grid container className="containerWrapper">
        <Grid item className="userInfo">
          <img
            className="userAvatar"
            src={data.user.avatar}
            alt="تصویر پروفایل"
          />
          <h2 className="channelName">{data.channel.name}</h2>

          {isLogin && isMe && (
            <Button
              className="settingBtn"
              onClick={() => dispatch(push(ROUTE_MY_PROFILE))}
            >
              <SettingIcon className="settingIcon" />
              تنظیمات
            </Button>
          )}

          {isLogin && !isMe && (
            <Button
              className={`settingBtn ${isFollowed ? 'followed' : 'unfollowed'}`}
              disabled={!!followData.name || !!unfollowData.name}
              onClick={handleFollowUser}
            >
              <FollowIcon className="followIcon" />
              {isFollowed ? 'دنبال شده' : 'دنبال کردن'}
            </Button>
          )}
        </Grid>

        <Grid item className="statistics">
          <div className="statisticLabel">
            <b>{data.channel.videos_count}</b>تعداد ویدیو ها
          </div>
          <div className="statisticLabel">
            <b>{data.channel.views_count}</b>تعداد بازدید ها
          </div>
        </Grid>
      </Grid>
    </ChannelInfoBarWrapper>
  );
}

ChannelInfoBar.propTypes = {
  data: PropTypes.object.isRequired,
  followData: PropTypes.object.isRequired,
  unfollowData: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleFollow: PropTypes.func.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  userData: makeSelectUserMe(),
  followData: makeSelectFollow(),
  unfollowData: makeSelectUnfollow(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleFollow: name => dispatch(followAction(name)),
    handleUnfollow: name => dispatch(unfollowAction(name)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(ChannelInfoBar);
