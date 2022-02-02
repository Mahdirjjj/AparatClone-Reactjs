/**
 *
 * DashboardPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import DashboardLayout from 'layouts/DashboardLayout';

import { makeSelectChannelStatistics } from 'containers/App/selectors';
import StatisticsCards from 'containers/StatisticsPage/StatisticsCards';
import LoadingWithText from 'components/LoadingWithText';
import ErrorMessage from 'components/ErrorMessage';
import {
  getChannelStatisticsAction,
  getChannelStatisticsClearAction,
} from 'containers/App/actions';

export function DashboardPage({ statistics, getStatistics, clearStatistics }) {
  useEffect(() => {
    getStatistics(90);

    return clearStatistics;
  }, []);

  return (
    <div>
      <Helmet>
        <title>داشبورد</title>
        <meta name="description" content="صفحه داشبورد" />
      </Helmet>

      <DashboardLayout fullWidth>
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
          </>
        )}
      </DashboardLayout>
    </div>
  );
}

DashboardPage.propTypes = {
  statistics: PropTypes.object.isRequired,
  getStatistics: PropTypes.func.isRequired,
  clearStatistics: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  statistics: makeSelectChannelStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    getStatistics: range => dispatch(getChannelStatisticsAction(range)),
    clearStatistics: () => dispatch(getChannelStatisticsClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(DashboardPage);
