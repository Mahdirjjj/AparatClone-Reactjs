/**
 *
 * StatisticsPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import DashboardLayout from 'layouts/DashboardLayout';
import ErrorMessage from 'components/ErrorMessage';
import LoadingWithText from 'components/LoadingWithText';
import { makeSelectChannelStatistics } from 'containers/App/selectors';
import {
  getChannelStatisticsAction,
  getChannelStatisticsClearAction,
} from 'containers/App/actions';
import { push } from 'connected-react-router';
import { ROUTE_VIDEO_SHOW } from 'containers/App/routes';
import StatisticsCards from './StatisticsCards';
import StatisticsChart from './StatisticsChart';
import StatisticsTopVideos from './StatisticsTopVideos';

export function StatisticsPage({
  statistics,
  getStatistics,
  clearStatistics,
  dispatch,
}) {
  const [range, setRange] = useState(7);

  useEffect(() => {
    getStatistics(range);

    return clearStatistics;
  }, [range]);

  function handleVideoClick(slug) {
    dispatch(push(ROUTE_VIDEO_SHOW.replace(':slug', slug)));
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>آمار بازدید</title>
        <meta name="description" content="آمار بازدید کانال" />
      </Helmet>

      {statistics.range && <LoadingWithText />}

      {statistics.error && (
        <ErrorMessage
          error={statistics.error}
          options={{ 404: 'ویدیو مورد نظر یافت نشد' }}
        />
      )}

      {statistics.data && (
        <>
          <StatisticsCards statistics={statistics.data} />
          <StatisticsChart
            statistics={statistics.data.views}
            range={range}
            disabled={!!statistics.range}
            handleRangeChange={setRange}
          />
          <StatisticsTopVideos
            statistics={statistics.data}
            onVideoClick={handleVideoClick}
          />
        </>
      )}
    </DashboardLayout>
  );
}

StatisticsPage.propTypes = {
  statistics: PropTypes.object.isRequired,
  getStatistics: PropTypes.func.isRequired,
  clearStatistics: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statistics: makeSelectChannelStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getStatistics: range => dispatch(getChannelStatisticsAction(range)),
    clearStatistics: () => dispatch(getChannelStatisticsClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(StatisticsPage);
