/**
 *
 * NotificationMenu
 *
 */

import React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';

function NotificationMenu() {
  return (
    <IconButton
      aria-label="Show 17 new notifications"
      color="inherit"
      size="small"
    >
      <Badge badgeContent={17} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

export default NotificationMenu;
