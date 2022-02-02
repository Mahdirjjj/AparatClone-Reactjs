/**
 *
 * Sidebar
 *
 */

import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Dashboard as DashboardIcon,
  ModeComment as CommentIcon,
  MovieOutlined,
  PieChart as ChartIcon,
  PowerSettingsNew as LoguotIcon,
  Settings as SettingIcon,
  Subscriptions as FollowedChannelsIcon,
  SupervisorAccountOutlined,
  Theaters as MovieIcon,
} from '@material-ui/icons';
import { push } from 'connected-react-router';
import { logoutAction } from 'containers/App/actions';
import {
  ROUTE_COMMENTS,
  ROUTE_DASHBOARD,
  ROUTE_FOLLOWED_CHANNELS,
  ROUTE_MANAGE_USERS,
  ROUTE_MANAGE_VIDEOS,
  ROUTE_MY_CHANNEL,
  ROUTE_MY_PROFILE,
  ROUTE_MY_VIDEOS,
  ROUTE_STATISTICS,
} from 'containers/App/routes';
import {
  makeSelectLocation,
  makeSelectLogout,
  makeSelectUserMe,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { isAdminUser } from 'utils/auth';

const Wrapper = styled.div`
  width: 180px;
  background: #fff;
  box-shadow: -1px 2px 2px #eee;
  min-height: calc(100vh - 50px);

  & .channelSetting {
    background: #fff;
    display: block;
    text-align: center;
    margin-bottom: 10vh;
    cursor: pointer;

    .userAvatar {
      width: 140px;
      height: 140px;
      padding: 0.5em;
      border: 3px solid #eee;
      border-radius: 100%;
    }
  }

  & .channelSetting .MuiSvgIcon-root,
  & .channelSetting .MuiListItemText-root {
    display: block;
    width: 100%;
    margin: auto;
    text-align: center;
  }

  & .channelSetting .MuiSvgIcon-root {
    font-size: 120px;
    width: 120px;
    color: #e5e5e5;
  }

  & .channelSetting svg {
    background: #fff;
    box-shadow: 0 0 2px 1px #e2dfdf;
    border-radius: 100%;
    padding: 0;
    display: block;
  }

  & .channelSetting .MuiTypography-root {
    font-weight: bold;
  }

  & .MuiSvgIcon-root,
  & .MuiListItemText-root {
    color: #6f7285;
  }

  & .MuiListItemText-root {
    font-size: 1rem;
  }

  & .MuiListItemIcon-root {
    min-width: 30px;
  }

  & .MuiListItemText-root {
    text-align: right;
  }

  & .settingIcon {
    position: absolute;
    left: 32px;
    top: 22px;
    background: #e5e5e5 !important;
    border: 1px solid #e1e1e1 !important;
    cursor: pointer;
    transition: opacity 130ms ease;
  }

  & .settingIcon,
  & .settingIcon svg {
    font-size: 20px !important;
    width: 20px !important;
    color: #6f7285 !important;
  }

  & .settingIcon:hover {
    opacity: 0.8;
  }

  & .logoutItem {
    position: absolute;
    bottom: 0;
  }

  @media (max-width: 768px) {
    & {
      display: none;
    }
  }

  @media (max-height: 560px) {
    & .channelSetting {
      margin-bottom: 0vh;
    }
  }
`;

function Sidebar({ user, logoutData, location, dispatch }) {
  const isAdmin = isAdminUser();

  return (
    <Wrapper>
      <List component="nav">
        <ListItem className="channelSetting">
          <SettingIcon
            className="settingIcon"
            onClick={() => dispatch(push(ROUTE_MY_PROFILE))}
          />
          <ListItemIcon
            onClick={() =>
              dispatch(
                push(ROUTE_MY_CHANNEL.replace(':name', user.data.channel.name)),
              )
            }
          >
            <img
              src={user.data.avatar}
              alt="تصویر کاربر"
              className="userAvatar"
            />
          </ListItemIcon>
          <ListItemText
            primary={user.data.channel.name}
            onClick={() =>
              dispatch(
                push(ROUTE_MY_CHANNEL.replace(':name', user.data.channel.name)),
              )
            }
          />
        </ListItem>

        <ListItem
          button
          selected={ROUTE_DASHBOARD === location.pathname}
          onClick={() => dispatch(push(ROUTE_DASHBOARD))}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="داشبرد" />
        </ListItem>

        {isAdmin && <Divider />}

        {isAdmin && (
          <ListItem
            button
            selected={ROUTE_MANAGE_USERS === location.pathname}
            onClick={() => dispatch(push(ROUTE_MANAGE_USERS))}
          >
            <ListItemIcon>
              <SupervisorAccountOutlined />
            </ListItemIcon>
            <ListItemText primary="مدیریت کاربران" />
          </ListItem>
        )}

        {isAdmin && (
          <ListItem
            button
            selected={ROUTE_MANAGE_VIDEOS === location.pathname}
            onClick={() => dispatch(push(ROUTE_MANAGE_VIDEOS))}
          >
            <ListItemIcon>
              <MovieOutlined />
            </ListItemIcon>
            <ListItemText primary="مدیریت ویدیو ها" />
          </ListItem>
        )}

        {isAdmin && <Divider />}

        <ListItem
          button
          selected={ROUTE_MY_VIDEOS === location.pathname}
          onClick={() => dispatch(push(ROUTE_MY_VIDEOS))}
        >
          <ListItemIcon>
            <MovieIcon />
          </ListItemIcon>
          <ListItemText primary="ویدیوهای من" />
        </ListItem>

        <ListItem
          button
          selected={ROUTE_COMMENTS === location.pathname}
          onClick={() => dispatch(push(ROUTE_COMMENTS))}
        >
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary="دیدگاه ها" />
        </ListItem>

        <ListItem
          button
          selected={ROUTE_FOLLOWED_CHANNELS === location.pathname}
          onClick={() => dispatch(push(ROUTE_FOLLOWED_CHANNELS))}
        >
          <ListItemIcon>
            <FollowedChannelsIcon />
          </ListItemIcon>
          <ListItemText primary="کانال های دنبال شده" />
        </ListItem>

        <ListItem
          button
          selected={ROUTE_STATISTICS === location.pathname}
          onClick={() => dispatch(push(ROUTE_STATISTICS))}
        >
          <ListItemIcon>
            <ChartIcon />
          </ListItemIcon>
          <ListItemText primary="آمار بازدید" />
        </ListItem>
      </List>

      <ListItem
        button
        className="logoutItem"
        disabled={logoutData.loading}
        onClick={() => dispatch(logoutAction())}
      >
        <ListItemIcon>
          <LoguotIcon />
        </ListItemIcon>
        <ListItemText primary="خروج ازحساب کاربری" />
      </ListItem>
    </Wrapper>
  );
}

Sidebar.propTypes = {
  location: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  logoutData: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  location: makeSelectLocation(),
  user: makeSelectUserMe(),
  logoutData: makeSelectLogout(),
});

const withRouter = connect(mapStateToProps);

export default withRouter(Sidebar);
