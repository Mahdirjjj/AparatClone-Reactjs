/**
 *
 * FollowItem
 *
 */

import React, { memo } from 'react';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from '@material-ui/core';
import { Check as CheckIcon, Add as AddIcon } from '@material-ui/icons';
import { unfollowAction, followAction } from 'containers/App/actions';
import { makeSelectUnfollow } from 'containers/App/selectors';
import { FOLLOW_TYPE_FOLLOWERS } from 'utils/constants';

const FollowItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 190px;
  height: 205px;
  position: relative;
  margin-bottom: 2em;
  padding: 0.5em;

  > .card {
    background: #fff;
    box-shadow: 0 0px 2px 0px #e8e8e8;
    background: #fff;
    box-shadow: 0 0px 2px 0px #e8e8e8;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 0.5em;

    > img {
      display: block;
      width: 80px;
      height: 80px;
      border-radius: 100%;
    }

    > b {
      display: block;
      width: 100%;
      margin: 0.5em;
      text-align: center;
    }

    > .channelDetail > span {
      display: inline-block;
      margin: 0.5em;
      text-align: center;
    }

    > .followBtn {
      border-radius: 2em;
      margin-top: 0.5em;

      .icon {
        font-size: 1.2em;
      }
    }
  }
`;

function FollowItem({ item, unfollowData, handleUnfollow, handleFollow }) {
  const IS_FOLLOWER = item.type === FOLLOW_TYPE_FOLLOWERS;
  const IS_FOLLOWING = !IS_FOLLOWER;

  const CAN_FOLLOW =
    (IS_FOLLOWER && !item.followed) || (IS_FOLLOWING && item.unfollowed);
  const CAN_UNFOLLOW =
    (IS_FOLLOWING && !item.unfollowed) || (IS_FOLLOWER && item.followed);

  function handleFollowing() {
    if (CAN_FOLLOW) {
      handleFollow(item.name);
    } else {
      handleUnfollow(item.name);
    }
  }

  return (
    <FollowItemWrapper>
      <div className="card">
        <img src={item.avatar} alt="تصویر کانال" />
        <b>{item.name}</b>
        <div className="channelDetail">
          <span>{item.followers_count} دنبال کننده</span> .{' '}
          <span>{item.videos_count} ویدیو</span>
        </div>

        {CAN_FOLLOW && (
          <Button
            color="secondary"
            className="followBtn"
            variant="contained"
            disabled={!!unfollowData.name}
            onClick={handleFollowing}
          >
            <AddIcon className="icon" />
            دنبال کردن
          </Button>
        )}

        {CAN_UNFOLLOW && (
          <Button
            color="default"
            className="followBtn"
            variant="outlined"
            disabled={!!unfollowData.name}
            onClick={handleFollowing}
          >
            <CheckIcon className="icon" />
            دنبال شده
          </Button>
        )}
      </div>
    </FollowItemWrapper>
  );
}

FollowItem.propTypes = {
  item: PropTypes.object.isRequired,
  unfollowData: PropTypes.object.isRequired,
  handleUnfollow: PropTypes.func.isRequired,
  handleFollow: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  unfollowData: makeSelectUnfollow(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleUnfollow: name => dispatch(unfollowAction(name)),
    handleFollow: name => dispatch(followAction(name)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(FollowItem);
