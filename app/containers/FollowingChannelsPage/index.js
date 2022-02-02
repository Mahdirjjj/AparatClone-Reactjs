/**
 *
 * FollowingChannelsPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import DashboardLayout from 'layouts/DashboardLayout';
import FollowList from 'components/FollowList';
import Filters from 'components/Filters';
import { getFollowingListAction } from 'containers/App/actions';
import { makeSelectFollowingList } from 'containers/App/selectors';
import { FOLLOW_TYPE_FOLLOWINGS, FOLLOW_TYPE_FOLLOWERS } from 'utils/constants';

const FILTER_VALUES = {
  [FOLLOW_TYPE_FOLLOWINGS]: 'کانال های دنبال شده',
  [FOLLOW_TYPE_FOLLOWERS]: 'دنبال کنندگان شما',
};

export function FollowingChannelsPage({
  followingList,
  handleGetFollowingList,
}) {
  const [filter, setFilter] = useState(FOLLOW_TYPE_FOLLOWINGS);

  useEffect(() => {
    handleGetFollowingList();
  }, []);

  function getChannelList() {
    if (followingList.data) {
      const data = followingList.data.filter(
        item =>
          item.type === filter ||
          (filter === FOLLOW_TYPE_FOLLOWINGS &&
            (item.type === FOLLOW_TYPE_FOLLOWERS && item.followed)),
      );

      // eslint-disable-next-line no-undef
      return _.uniqBy(data, x => x.id);
    }

    return null;
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>کانالهای دنبال شده</title>
        <meta name="description" content="کانالهای دنبال شده" />
      </Helmet>

      <Filters
        values={FILTER_VALUES}
        defaultValue={filter}
        onChange={setFilter}
      />

      <FollowList channels={getChannelList()} />
    </DashboardLayout>
  );
}

FollowingChannelsPage.propTypes = {
  followingList: PropTypes.object.isRequired,
  handleGetFollowingList: PropTypes.func.isRequired,
  // eslint-disable-next-line react/no-unused-prop-types
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  followingList: makeSelectFollowingList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    handleGetFollowingList: () => dispatch(getFollowingListAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(FollowingChannelsPage);
