/**
 *
 * CommentItem
 *
 */

import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from '@material-ui/core';

import { getAge } from 'utils/helpers';
import { COMMENT_STATE_PENDING } from 'utils/constants';
import CountingTextArea from 'components/CountingTextArea';
import {
  postCommentAction,
  removeCommentAction,
  acceptCommentAction,
} from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectRemoveComment,
  makeSelectAcceptComment,
} from 'containers/App/selectors';
import { isAdminUser } from 'utils/auth';

const CommentItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background: #fff;
  width: 100%;
  box-shadow: 0 0px 2px 0px #e8e8e8;
  position: relative;
  margin-bottom: 2em;
  padding: 0.8em;

  &.isSubItem {
    background: #f5f5f9;
  }

  > .userAvatarWapper {
    padding-left: 0.8em;

    > .userIcon {
      width: 30px;
      height: 30px;
      border: 1px solid #ccc;
      background: #eee;
      border-radius: 50%;
      margin: 0.1em;
    }
  }

  > .commentWrapper {
    width: 100%;

    > .header {
      > .userInfo {
        > .userName {
          color: #333;
          display: inline-block;
        }

        > .old {
          margin-right: 0.8em;
          display: inline-block;
          font-size: 0.9em;
        }
      }
    }

    > .body {
      margin-left: 0.8em;

      > .subComments {
      }
    }

    > .footer {
    }
  }

  > .bannerWrapper {
    width: 150px;

    > img {
      width: 150px;
      height: 100px;
    }
  }
`;

function CommentItem({
  comment,
  isSubItem,
  removeCommentData,
  acceptCommentData,
  handlePostComment,
  handleRemoveComment,
  handleAcceptComment,
  showVideoImage,
}) {
  const [showAnswerBox, setShowAnswerBox] = useState(false);
  console.log(comment);
  function handleAnswerChange(value) {
    if (value) {
      handlePostComment({
        video_id: comment.video_id,
        parent_id: comment.id,
        body: value,
      });
    }

    setShowAnswerBox(false);
  }

  return (
    <CommentItemWrapper className={isSubItem ? 'isSubItem' : ''}>
      <div className="userAvatarWapper">
        <img
          className="userIcon"
          src={comment.user.avatar}
          alt="تصویر کاربری"
        />
      </div>

      <div className="commentWrapper">
        <div className="header">
          <div className="userInfo">
            <b className="userName">{comment.user.name}</b>
            <span className="old">{getAge(comment.age)}</span>
          </div>
        </div>

        <div className="body">
          <p>{comment.body}</p>

          {!!(comment.children && comment.children.length) && (
            <div className="subComments">
              {comment.children.map(subComment => (
                <CommentItem
                  key={subComment.id}
                  removeCommentData={removeCommentData}
                  acceptCommentData={acceptCommentData}
                  handlePostComment={handlePostComment}
                  handleRemoveComment={handleRemoveComment}
                  handleAcceptComment={handleAcceptComment}
                  comment={subComment}
                  isSubItem
                />
              ))}
            </div>
          )}

          {showAnswerBox && (
            <div className="answerBox">
              <CountingTextArea
                maxLength={200}
                placeholder="نظر خود را وارد نمایید"
                onChange={handleAnswerChange}
              />
            </div>
          )}
        </div>

        <div className="footer">
          {!isSubItem && (
            <Button
              className="btn"
              disabled={showAnswerBox}
              onClick={() => setShowAnswerBox(true)}
            >
              پاسخ دادن
            </Button>
          )}

          {isAdminUser() && (
            <>
              {comment.state === COMMENT_STATE_PENDING && (
                <Button
                  className="btn btn-accept"
                  disabled={!!acceptCommentData.id}
                  onClick={() => handleAcceptComment(comment.id)}
                >
                  {acceptCommentData.id ? 'لطفا صبر کنید' : 'تایید'}
                </Button>
              )}
              <Button
                className="btn"
                variant="outlined"
                disabled={!!removeCommentData.id}
                onClick={() => handleRemoveComment(comment.id)}
              >
                {removeCommentData.id ? 'لطفا صبر کنید' : 'حذف'}
              </Button>
            </>
          )}
        </div>
      </div>

      {showVideoImage && !isSubItem && (
        <div className="bannerWrapper">
          <img
            className="img"
            src={
              comment.video_banner
                ? comment.banner_path + comment.video_banner
                : `${comment.banner_path}../../img/no-video.jpg`
            }
            alt="تصویر ویدیو"
          />
        </div>
      )}
    </CommentItemWrapper>
  );
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  isSubItem: PropTypes.bool,
  showVideoImage: PropTypes.bool,
  removeCommentData: PropTypes.object.isRequired,
  acceptCommentData: PropTypes.object.isRequired,
  handlePostComment: PropTypes.func.isRequired,
  handleRemoveComment: PropTypes.func.isRequired,
  handleAcceptComment: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  isSubItem: false,
  showVideoImage: true,
};

const mapStateToProps = createStructuredSelector({
  removeCommentData: makeSelectRemoveComment(),
  acceptCommentData: makeSelectAcceptComment(),
});

function mapDispatchToProps(dispatch) {
  return {
    handlePostComment: params => dispatch(postCommentAction(params)),
    handleRemoveComment: id => dispatch(removeCommentAction(id)),
    handleAcceptComment: id => dispatch(acceptCommentAction(id)),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withStore,
)(CommentItem);
