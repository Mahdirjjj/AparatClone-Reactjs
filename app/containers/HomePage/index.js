/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import CategorizedVideos from 'components/CategorizedVideos';
import MailLayout from 'layouts/MailLayout';
import PropTypes from 'prop-types';
import React from 'react';

export default function HomePage({ location }) {
  const search = new URLSearchParams(location.search);

  return (
    <MailLayout fullWidth>
      <CategorizedVideos search={search} />
    </MailLayout>
  );
}

HomePage.propTypes = {
  location: PropTypes.object.isRequired,
};
