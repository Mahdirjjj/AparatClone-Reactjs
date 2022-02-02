/**
 *
 * DashboardLayout
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import { Grid } from '@material-ui/core';

import {
  getTagsAction,
  getCategoriesAction,
  getPlayListsAction,
} from 'containers/App/actions';
import NotificationBox from 'components/NotificationBox';

import NavBar from './NavBar';
import SidebarDrawer from './SidebarDrawer';
import Sidebar from './Sidebar';

const StyledDashboardWrapper = styled.div`
  background: #fefefe;
  color: #6f7285;

  & .sidebarWrapper {
    z-index: 0;
    padding-bottom: 0px !important;
    position: relative;
  }

  & .contentWrapper {
    flex: 1;
    max-width: ${props => (props.fullWidth ? '100%' : '900px')};
    padding: 2em 15px;
    margin: 0 auto;
    height: calc(100vh - 50px);
    overflow-y: auto;
    position: relative;
  }
`;

function DashboardLayout({
  children,
  showSidebar,
  fullWidth,
  getTagsFromServer,
  getCategoriesFromServer,
  getPlaylistssFromServer,
}) {
  useEffect(() => {
    getTagsFromServer();
    getCategoriesFromServer();
    getPlaylistssFromServer();
  }, []);

  return (
    <StyledDashboardWrapper fullWidth={fullWidth}>
      <NavBar />
      <SidebarDrawer />

      <Grid container wrap="nowrap">
        {showSidebar && (
          <Grid item className="sidebarWrapper">
            <Sidebar />
          </Grid>
        )}
        <Grid item className="contentWrapper">
          {children}
        </Grid>
      </Grid>

      <NotificationBox />
    </StyledDashboardWrapper>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  showSidebar: PropTypes.bool,
  fullWidth: PropTypes.bool,
  getTagsFromServer: PropTypes.func.isRequired,
  getCategoriesFromServer: PropTypes.func.isRequired,
  getPlaylistssFromServer: PropTypes.func.isRequired,
};

DashboardLayout.defaultProps = {
  showSidebar: true,
};

function mapDispatchToProps(dispatch) {
  return {
    getTagsFromServer: () => dispatch(getTagsAction()),
    getCategoriesFromServer: () => dispatch(getCategoriesAction()),
    getPlaylistssFromServer: () => dispatch(getPlayListsAction()),
  };
}
const withStore = connect(
  undefined,
  mapDispatchToProps,
);
export default compose(
  memo,
  withStore,
)(DashboardLayout);
