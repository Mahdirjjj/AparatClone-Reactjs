/**
 *
 * CommentList
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';

import CommentItem from 'components/CommentItem';
import NoItemInList from 'components/NoItemInList';
import { makeSelectPostComment } from 'containers/App/selectors';
import Loading from 'components/Loading';

const CommentListWrapper = styled(Grid)`
  display: flex;
  align-content: space-around;
  justify-content: space-around;
  flex-wrap: wrap;
  position: relative;

  > .loadingLoader {
    position: absolute;
  }

  &.loading {
    opacity: 0.5;
    max-height: 450px;
    overflow: hidden;
  }
`;

function CommentList({
  comments,
  commentData,
  customNotFoundTitle,
  showVideoImage,
}) {
  return (
    <CommentListWrapper className={commentData.params ? 'loading' : ''}>
      {!!comments &&
        !!comments.length &&
        comments.map(comment => (
          <CommentItem
            key={comment.id}
            comment={comment}
            showVideoImage={showVideoImage}
          />
        ))}

      {!(comments && comments.length) && (
        <NoItemInList title={customNotFoundTitle} />
      )}

      {commentData.params && <Loading className="loadingLoader" />}
    </CommentListWrapper>
  );
}

CommentList.propTypes = {
  comments: PropTypes.array,
  showVideoImage: PropTypes.bool,
  customNotFoundTitle: PropTypes.string,
  commentData: PropTypes.object.isRequired,
};

CommentList.defaultProps = {
  showVideoImage: true,
  customNotFoundTitle: 'هیچ موردی یافت نشد',
};

const mapStateToProps = createStructuredSelector({
  commentData: makeSelectPostComment(),
});

const withStore = connect(mapStateToProps);

export default compose(
  memo,
  withStore,
)(CommentList);
