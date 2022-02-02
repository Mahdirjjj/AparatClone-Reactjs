import CommentList from 'components/CommentList';
import CountingTextArea from 'components/CountingTextArea';
import { postCommentAction } from 'containers/App/actions';
import { makeSelectPostComment } from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { VideoCommentsWrapper } from './styles';

function VideoComments({ video, postCommentData, dispatch }) {
  const [commentDefaultValue, setCommentDefaultValue] = useState('');

  useEffect(() => {
    if (postCommentData.data && postCommentData.data.parent_id === null) {
      setCommentDefaultValue('');
    }
  }, [postCommentData]);

  function handleNewComment(value) {
    setCommentDefaultValue(value);

    dispatch(
      postCommentAction({
        video_id: video.id,
        parent_id: null,
        body: value,
      }),
    );
  }

  return (
    <VideoCommentsWrapper>
      <CountingTextArea
        defaultValue={commentDefaultValue}
        maxLength={200}
        placeholder="نظر خود را وارد نمایید"
        cancelable={false}
        onChange={handleNewComment}
      />

      <CommentList
        comments={video.comments}
        showVideoImage={false}
        customNotFoundTitle="هیچ نظری برای این ویدیو ثبت نشده است"
      />
    </VideoCommentsWrapper>
  );
}

VideoComments.propTypes = {
  video: PropTypes.object.isRequired,
  postCommentData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  postCommentData: makeSelectPostComment(),
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
)(VideoComments);
