/**
 *
 * VideoShowPage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment';

import ErrorMessage from 'components/ErrorMessage';
import DashboardLayout from 'layouts/DashboardLayout';
import {
  makeSelectGetVideo,
  makeSelectGetVideoStatistics,
} from 'containers/App/selectors';
import {
  getVideoClearAction,
  getVideoAction,
  getVideoStatisticsAction,
} from 'containers/App/actions';
import LoadingWithText from 'components/LoadingWithText';
import VideoDetail from './VideoDetail';
import VideoStatisticsCards from './VideoStatisticsCards';
import VideoStatisticsChart from './VideoStatisticsChart';

export function VideoShowPage({
  video,
  statistics,
  match,
  getVideoInfo,
  getVideoStatistics,
  clearGetVideoInfo,
}) {
  const [range, setRange] = useState(7);

  useEffect(() => {
    getVideoInfo(match.params.slug);

    return clearGetVideoInfo;
  }, []);

  useEffect(() => {
    getVideoStatistics(match.params.slug, range);
  }, [range]);

  function todayViews() {
    let result = 0;

    if (statistics.data && statistics.data.views) {
      Object.entries(statistics.data.views).forEach(([dt, value]) => {
        if (
          !moment()
            .startOf('day')
            .diff(dt, 'days')
        ) {
          result += value;
        }
      });
    }

    return result;
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>نمایش ویدیو</title>
        <meta name="description" content="نمایش ویدیو" />
      </Helmet>

      {video.slug && <LoadingWithText />}

      {video.data && <VideoDetail video={video.data} />}

      {video.data && (
        <VideoStatisticsCards video={video.data} todayViews={todayViews()} />
      )}

      {statistics.data && (
        <VideoStatisticsChart
          statistics={statistics.data.views}
          range={range}
          disabled={!!statistics.slug}
          handleRangeChange={setRange}
        />
      )}

      {video.error && (
        <ErrorMessage
          error={video.error}
          options={{ 404: 'ویدیو مورد نظر یافت نشد' }}
        />
      )}

      {statistics.error && (
        <ErrorMessage
          error={statistics.error}
          forceMessage="در دریافت آمار بازدید مشکلی به وجود آمده است"
        />
      )}
    </DashboardLayout>
  );
}

VideoShowPage.propTypes = {
  match: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  statistics: PropTypes.object.isRequired,
  getVideoInfo: PropTypes.func.isRequired,
  getVideoStatistics: PropTypes.func.isRequired,
  clearGetVideoInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  video: makeSelectGetVideo(true),
  statistics: makeSelectGetVideoStatistics(),
});

function mapDispatchToProps(dispatch) {
  return {
    getVideoInfo: slug => dispatch(getVideoAction(slug)),
    getVideoStatistics: (slug, range) =>
      dispatch(getVideoStatisticsAction(slug, range)),
    clearGetVideoInfo: () => dispatch(getVideoClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoShowPage);
