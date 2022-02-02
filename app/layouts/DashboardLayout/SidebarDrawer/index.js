/**
 *
 * SidebarDrawer
 *
 */

import React, { memo } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  Home as HomeIcon,
  DashboardOutlined,
  VideoLibraryOutlined,
  PlaylistPlayOutlined,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { makeSelectDrawerIsOpen } from 'containers/App/selectors';
import { drawerToggleAction } from 'containers/App/actions';
import Logo from 'components/Logo';
import DrawerButton from 'layouts/DashboardLayout/DrawerButton';
import { push } from 'connected-react-router';
import {
  ROUTE_HOME,
  ROUTE_DASHBOARD,
  ROUTE_MY_VIDEOS,
} from 'containers/App/routes';
import { getAuth } from 'utils/auth';

const StyledDrawer = styled(Drawer)`
  & .MuiPaper-root {
    padding: 0 15px;
    min-width: 195px;
  }

  & .marginFromSide {
    margin-right: 15px;
  }

  & .MuiList-root {
    border-bottom: 1px solid #e5e5e5;
    min-width: 150px;
  }

  & .topLogoItem {
    margin-bottom: 15px;
    padding: 4px 0;
  }

  & .MuiListItemIcon-root {
    min-width: 25px;
    color: #6f7285;
  }

  & .MuiListItemText-root {
    text-align: right;
    color: #6f7285;
  }

  & .MuiListItem-button {
    padding: 2px;
    transition: background-color 350ms ease;
  }

  & .MuiListItem-button:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
`;

function SidebarDrawer({ variant, drawrIsOpen, toggleSidebar, dispatch }) {
  const isLogedIn = getAuth();

  function redirect(path) {
    toggleSidebar(false);
    dispatch(push(path));
  }

  return (
    <StyledDrawer
      className="sidebarDrawer"
      anchor="left"
      variant={variant}
      open={drawrIsOpen}
      onClose={() => toggleSidebar(false)}
    >
      <List>
        {variant === 'temporary' && (
          <ListItem className="topLogoItem">
            <DrawerButton />
            <Logo size="small" className="marginFromSide" />
          </ListItem>
        )}

        <ListItem button onClick={() => redirect(ROUTE_HOME)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="خانه" />
        </ListItem>

        {isLogedIn && (
          <>
            <ListItem button onClick={() => redirect(ROUTE_DASHBOARD)}>
              <ListItemIcon>
                <DashboardOutlined />
              </ListItemIcon>
              <ListItemText primary="داشبرد" />
            </ListItem>

            <ListItem button onClick={() => redirect(ROUTE_MY_VIDEOS)}>
              <ListItemIcon>
                <VideoLibraryOutlined />
              </ListItemIcon>
              <ListItemText primary="ویدیو های من" />
            </ListItem>
          </>
        )}

        <Divider />
        <br />

        <ListItem button onClick={() => redirect(`${ROUTE_HOME}?category=7`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="طنز" />
        </ListItem>

        <ListItem button onClick={() => redirect(`${ROUTE_HOME}?category=5`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="بانوان" />
        </ListItem>

        <ListItem button onClick={() => redirect(`${ROUTE_HOME}?category=3`)}>
          <ListItemIcon>
            <PlaylistPlayOutlined />
          </ListItemIcon>
          <ListItemText primary="علم و تلکنولوژی" />
        </ListItem>
      </List>
    </StyledDrawer>
  );
}

SidebarDrawer.propTypes = {
  variant: PropTypes.oneOf(['persistent', 'temporary']),
  drawrIsOpen: PropTypes.bool,
  dispatch: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

SidebarDrawer.defaultProps = {
  variant: 'temporary',
};

const mapStateToProps = createStructuredSelector({
  drawrIsOpen: makeSelectDrawerIsOpen(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    toggleSidebar: show => dispatch(drawerToggleAction(show)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  memo,
  withConnect,
)(SidebarDrawer);
