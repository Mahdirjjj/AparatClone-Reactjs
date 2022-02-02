/**
 *
 * CommentsPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import DashboardLayout from 'layouts/DashboardLayout';
import Filters from 'components/Filters';
import CommentList from 'components/CommentList';
import { getCommentListAction } from 'containers/App/actions';
import { createStructuredSelector } from 'reselect';
import { makeSelectCommentList } from 'containers/App/selectors';
import { COMMENT_STATE_PENDING } from 'utils/constants';

const FILTER_VALUES = {
  all: 'همه دیدگاه ها',
  unAccepted: 'دیدگاه های تایید نشده',
};

export function CommentsPage({ commentData, handleGetCommentList }) {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    handleGetCommentList();
  }, []);

  function handleFilterChange(value) {
    setFilter(value);
  }

  function getCommentList() {
    if (filter === 'all') {
      return commentData.data;
    }

    return commentData.data.reduce((carry, item) => {
      const copiedItem = { ...item };

      if (copiedItem.children && copiedItem.children.length) {
        copiedItem.children = copiedItem.children.filter(
          subItem => subItem.state === COMMENT_STATE_PENDING,
        );
      }

      if (
        copiedItem.state === COMMENT_STATE_PENDING ||
        (copiedItem.children && copiedItem.children.length)
      ) {
        return [...carry, copiedItem];
      }

      return carry;
    }, []);
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>نظرات</title>
        <meta name="description" content="نظرات" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={handleFilterChange}
      />

      <CommentList comments={getCommentList()} />
    </DashboardLayout>
  );
}

CommentsPage.propTypes = {
  commentData: PropTypes.object.isRequired,
  handleGetCommentList: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  commentData: makeSelectCommentList(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleGetCommentList: () => dispatch(getCommentListAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(CommentsPage);
