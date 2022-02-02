/**
 *
 * MyChannelPage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import DashboardLayout from 'layouts/DashboardLayout';
import { makeSelectChannelInfo } from 'containers/App/selectors';
import LoadingWithText from 'components/LoadingWithText';
import {
  getChannelInfoAction,
  getChannelInfoClearAction,
} from 'containers/App/actions';
import ErrorMessage from 'components/ErrorMessage';

import ChannelBanner from './ChannelBanner';
import ChannelInfoBar from './ChannelInfoBar';
import ChannelData from './ChannelData';

export function MyChannelPage({
  match,
  channelInfo,
  getChannelInfo,
  clearChannelInfo,
}) {
  useEffect(() => {
    getChannelInfo(match.params.name);

    return clearChannelInfo;
  }, []);

  return (
    <DashboardLayout showSidebar={false} fullWidth>
      <Helmet>
        <title>کانال من</title>
        <meta name="description" content="کانال من" />
      </Helmet>
      {channelInfo.name && <LoadingWithText />}

      {channelInfo.data && (
        <>
          <ChannelBanner src={channelInfo.data.channel.banner} />
          <ChannelInfoBar data={channelInfo.data} />
          <ChannelData data={channelInfo.data} />
        </>
      )}

      {channelInfo.error && (
        <ErrorMessage
          error={channelInfo.error}
          options={{ 404: 'اطلاعات کانال یافت نشد' }}
        />
      )}
    </DashboardLayout>
  );
}

MyChannelPage.propTypes = {
  match: PropTypes.object.isRequired,
  channelInfo: PropTypes.object.isRequired,
  getChannelInfo: PropTypes.func.isRequired,
  clearChannelInfo: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  channelInfo: makeSelectChannelInfo(),
});

function mapDispatchToProps(dispatch) {
  return {
    getChannelInfo: name => dispatch(getChannelInfoAction(name)),
    clearChannelInfo: () => dispatch(getChannelInfoClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MyChannelPage);
