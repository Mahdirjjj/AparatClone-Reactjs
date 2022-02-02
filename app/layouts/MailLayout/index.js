/**
 *
 * MainLayout
 *
 */

import { Grid } from '@material-ui/core';
import NotificationBox from 'components/NotificationBox';
import {
  getCategoriesAction,
  getPlayListsAction,
  getTagsAction,
} from 'containers/App/actions';
import PropTypes from 'prop-types';
import React, { memo, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import NavBar from 'layouts/DashboardLayout/NavBar';
import SidebarDrawer from 'layouts/DashboardLayout/SidebarDrawer';
import { makeSelectDrawerIsOpen } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';

const StyledDashboardWrapper = styled.div`
  background: #fefefe;
  color: #6f7285;

  .contentWrapper {
    flex: 1;
    max-width: ${props => (props.fullWidth ? '100%' : '900px')};
    padding: 2em 15px;
    margin: 0 auto;
    height: calc(100vh - 50px);
    overflow-y: auto;
    position: relative;

    &.withDrawer {
      margin-right: 195px;
    }
  }

  .sidebarDrawer > .MuiPaper-root {
    padding: 0 15px;
    min-width: 195px;
    margin-top: 50px;
    height: calc(100vh - 50px);
  }
`;

function MainLayout({
  children,
  fullWidth,
  drawrIsOpen,
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
      <SidebarDrawer variant="persistent" />

      <Grid container wrap="nowrap">
        <Grid
          item
          className={`contentWrapper ${drawrIsOpen ? 'withDrawer' : ''}`}
        >
          {children}
        </Grid>
      </Grid>

      <NotificationBox />
    </StyledDashboardWrapper>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  fullWidth: PropTypes.bool,
  drawrIsOpen: PropTypes.bool,
  getTagsFromServer: PropTypes.func.isRequired,
  getCategoriesFromServer: PropTypes.func.isRequired,
  getPlaylistssFromServer: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  drawrIsOpen: makeSelectDrawerIsOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTagsFromServer: () => dispatch(getTagsAction()),
    getCategoriesFromServer: () => dispatch(getCategoriesAction()),
    getPlaylistssFromServer: () => dispatch(getPlayListsAction()),
  };
}

const withStore = connect(
  mapStateToProps,
  mapDispatchToProps,
);
export default compose(
  memo,
  withStore,
)(MainLayout);
