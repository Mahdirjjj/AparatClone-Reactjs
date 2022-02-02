/**
 *
 * VideoUpdatePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import DashboardLayout from 'layouts/DashboardLayout';
import { getVideoAction, updateVideoClearAction } from 'containers/App/actions';
import { makeSelectGetVideo } from 'containers/App/selectors';
import LoadingWithText from 'components/LoadingWithText';
import ErrorMessage from 'components/ErrorMessage';

import UpdateVideoForm from './UpdateVideoForm';

export function VideoUpdatePage({
  match,
  video,
  getVideoInfo,
  clearVideoUpdate,
}) {
  useEffect(() => {
    getVideoInfo(match.params.slug);

    return clearVideoUpdate;
  }, []);

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>VideoUpdatePage</title>
        <meta name="description" content="Description of VideoUpdatePage" />
      </Helmet>

      {video.slug && <LoadingWithText />}
      {video.data && <UpdateVideoForm video={video.data} />}
      {video.error && (
        <ErrorMessage
          error={video.error}
          options={{ 404: 'ویدیو مورد نظر یافت نشد' }}
        />
      )}
    </DashboardLayout>
  );
}

VideoUpdatePage.propTypes = {
  match: PropTypes.object.isRequired,
  video: PropTypes.object.isRequired,
  getVideoInfo: PropTypes.func.isRequired,
  clearVideoUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  video: makeSelectGetVideo(true),
});

function mapDispatchToProps(dispatch) {
  return {
    getVideoInfo: slug => dispatch(getVideoAction(slug)),
    clearVideoUpdate: () => dispatch(updateVideoClearAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(VideoUpdatePage);
