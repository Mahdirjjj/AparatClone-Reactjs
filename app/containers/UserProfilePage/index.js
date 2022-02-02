/**
 *
 * UserProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import DashboardLayout from 'layouts/DashboardLayout';
import Filters from 'components/Filters';
import { push } from 'connected-react-router';
import {
  ROUTE_MY_PROFILE,
  ROUTE_MY_PROFILE_BANNER,
  ROUTE_MY_PROFILE_CATEGORIES,
  ROUTE_MY_PROFILE_UNREGISTER,
} from 'containers/App/routes';
import UnregisterTab from './UnregisterTab';
import CategoriesTab from './CategoriesTab';
import ProfilePictureTab from './ProfilePictureTab';
import ChannelInfoTab from './ChannelInfoTab';

const PROFILE_MENUS = {
  [ROUTE_MY_PROFILE]: 'اطلاعات کانال',
  [ROUTE_MY_PROFILE_BANNER]: 'تصویر پروفایل و کاور',
  [ROUTE_MY_PROFILE_CATEGORIES]: 'تنظیمات دسته‌بندی',
  [ROUTE_MY_PROFILE_UNREGISTER]: 'لغو عضویت',
};

const ProfileContentWrapper = styled.div`
  margin-top: 4em;
`;

export function UserProfilePage({ dispatch, match }) {
  const CURRENT_MENU = match.path;

  function handleChangeRoute(routePath) {
    dispatch(push(routePath));
  }

  return (
    <DashboardLayout fullWidth>
      <Helmet>
        <title>پروفایل کاربر</title>
        <meta name="description" content="پروفایل کاربر" />
      </Helmet>
      <Filters
        values={PROFILE_MENUS}
        defaultValue={CURRENT_MENU}
        onChange={handleChangeRoute}
      />

      <ProfileContentWrapper>
        {CURRENT_MENU === ROUTE_MY_PROFILE_UNREGISTER && <UnregisterTab />}
        {CURRENT_MENU === ROUTE_MY_PROFILE_CATEGORIES && <CategoriesTab />}
        {CURRENT_MENU === ROUTE_MY_PROFILE_BANNER && <ProfilePictureTab />}
        {CURRENT_MENU === ROUTE_MY_PROFILE && <ChannelInfoTab />}
      </ProfileContentWrapper>
    </DashboardLayout>
  );
}

UserProfilePage.propTypes = {
  match: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(UserProfilePage);
