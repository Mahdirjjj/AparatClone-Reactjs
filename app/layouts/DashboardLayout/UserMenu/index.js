/**
 *
 * UserMenu
 *
 */

import React, { useState, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import styled from 'styled-components';
import {
  AccountCircle,
  Settings as SettingsIcon,
  Dashboard as DashboardIcon,
  Theaters as MovieIcon,
  ModeComment as CommentIcon,
  Subscriptions as FollowedChannelsIcon,
  PieChart as ChartIcon,
  PowerSettingsNew as LoguotIcon,
  VpnKey as LoginIcon,
} from '@material-ui/icons';

import {
  ROUTE_MY_VIDEOS,
  ROUTE_DASHBOARD,
  ROUTE_FOLLOWED_CHANNELS,
  ROUTE_COMMENTS,
  ROUTE_STATISTICS,
  ROUTE_LOGIN,
} from 'containers/App/routes';
import { push } from 'connected-react-router';
import { createStructuredSelector } from 'reselect';
import { makeSelectUserMe, makeSelectLogout } from 'containers/App/selectors';
import { logoutAction } from 'containers/App/actions';

const StyledMenu = styled(Menu)`
  margin-top: 30px;

  & .MuiSvgIcon-root {
    color: #6f7285;
  }

  & ul {
    padding-top: 0;
  }

  & li {
    padding: 0 16px;
    margin: 0;
    min-height: 30px;
    min-width: 200px;
  }

  & .channelMenu {
    min-height: 50px;
    background: #f4f4f4;
    display: block;
    text-align: right;
    padding-top: 5px;
    font-size: 0.8rem;
    padding-right: 40px;
  }

  & .loginMenu {
    margin-bottom: -8px;
  }

  & .channelMenu:hover {
    background: #f4f4f4;
  }

  & .channelMenu .channelUserIcon {
    float: right;
    margin-right: -35px;
    margin-top: 5px;
  }

  & .channelMenu .channelTitle {
    display: block;
  }

  & .channelMenu .channelSetting {
    display: block;
    font-size: 0.6rem;
  }

  & .channelMenu .channelSetting .MuiSvgIcon-root {
    font-size: 0.8rem;
    margin-top: 1px;
    float: right;
    margin-left: 3px;
  }
`;

function UserMenu({ user, logoutData, dispatch }) {
  const [anchorEl, setAnchorEl] = useState(null);

  function closeMenu(path) {
    if (path) {
      dispatch(push(path));
    } else {
      // logout
      dispatch(logoutAction());
    }

    setAnchorEl(null);
  }

  return (
    <>
      <IconButton
        aria-label="Account of current user"
        aria-controls="primary-account-menu"
        aria-haspopup="true"
        onClick={e => setAnchorEl(e.target)}
        color="inherit"
        size="small"
        style={{ marginRight: 15 }}
      >
        <AccountCircle fontSize="large" />
      </IconButton>

      <StyledMenu
        anchorEl={anchorEl}
        id="primary-account-menu"
        keepMounted
        open={!!anchorEl}
        onClose={closeMenu}
      >
        {!user.data && (
          <MenuItem
            onClick={() => closeMenu(ROUTE_LOGIN)}
            className="loginMenu"
          >
            <LoginIcon />
            ورود
          </MenuItem>
        )}

        {user.data && (
          <>
            <MenuItem onClick={closeMenu} className="channelMenu">
              <AccountCircle fontSize="large" className="channelUserIcon" />
              <b className="channelTitle">{user.data.channel.name}</b>
              <div className="channelSetting">
                <SettingsIcon />
                تنظیمات کانال
              </div>
            </MenuItem>

            <MenuItem onClick={() => closeMenu(ROUTE_DASHBOARD)}>
              <DashboardIcon />
              داشبرد
            </MenuItem>
            <MenuItem onClick={() => closeMenu(ROUTE_MY_VIDEOS)}>
              <MovieIcon />
              ویدیوهای من
            </MenuItem>
            <MenuItem onClick={() => closeMenu(ROUTE_COMMENTS)}>
              <CommentIcon />
              دیدگاه ها
            </MenuItem>
            <MenuItem onClick={() => closeMenu(ROUTE_FOLLOWED_CHANNELS)}>
              <FollowedChannelsIcon />
              کانال های دنبال شده
            </MenuItem>
            <MenuItem onClick={() => closeMenu(ROUTE_STATISTICS)}>
              <ChartIcon />
              آمار بازدید
            </MenuItem>
            <MenuItem disabled={logoutData.loading} onClick={() => closeMenu()}>
              <LoguotIcon />
              خروج ازحساب کاربری
            </MenuItem>
          </>
        )}
      </StyledMenu>
    </>
  );
}

UserMenu.propTypes = {
  user: PropTypes.object.isRequired,
  logoutData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUserMe(),
  logoutData: makeSelectLogout(),
});

const withRouter = connect(mapStateToProps);

export default compose(
  memo,
  withRouter,
)(UserMenu);
