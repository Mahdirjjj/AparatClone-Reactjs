/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import RenderError from 'components/RenderError';
import CommentsPage from 'containers/CommentsPage/Loadable';
import DashboardPage from 'containers/DashboardPage/Loadable';
import FollowingChannelsPage from 'containers/FollowingChannelsPage/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import ManageUsersPage from 'containers/ManageUsersPage/Loadable';
import ManageVideosPage from 'containers/ManageVideosPage/Loadable';
import MyChannelPage from 'containers/MyChannelPage/Loadable';
import MyVideosPage from 'containers/MyVideosPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import StatisticsPage from 'containers/StatisticsPage/Loadable';
import UploadPage from 'containers/UploadPage/Loadable';
import UserProfilePage from 'containers/UserProfilePage/Loadable';
import VideoShowPage from 'containers/VideoShowPage/Loadable';
import VideoUpdatePage from 'containers/VideoUpdatePage/Loadable';
import VideoViewPage from 'containers/VideoViewPage/Loadable';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import GlobalStyle from '../../global-styles';
import reducer from './reducer';
import * as routes from './routes';
import saga from './saga';

function App() {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  return (
    <div>
      <RenderError />
      <Switch>
        <Route exact path={routes.ROUTE_HOME} component={HomePage} />
        <Route exact path={routes.ROUTE_LOGIN} component={LoginPage} />
        <Route exact path={routes.ROUTE_DASHBOARD} component={DashboardPage} />
        <Route exact path={routes.ROUTE_UPLOAD} component={UploadPage} />
        <Route exact path={routes.ROUTE_MY_VIDEOS} component={MyVideosPage} />
        <Route exact path={routes.ROUTE_VIDEO_SHOW} component={VideoShowPage} />
        <Route exact path={routes.ROUTE_VIDEO_VIEW} component={VideoViewPage} />
        <Route exact path={routes.ROUTE_MY_CHANNEL} component={MyChannelPage} />
        <Route
          exact
          path={routes.ROUTE_MY_PROFILE}
          component={UserProfilePage}
        />
        <Route
          exact
          path={routes.ROUTE_MY_PROFILE_BANNER}
          component={UserProfilePage}
        />
        <Route
          exact
          path={routes.ROUTE_MY_PROFILE_CATEGORIES}
          component={UserProfilePage}
        />
        <Route
          exact
          path={routes.ROUTE_MY_PROFILE_UNREGISTER}
          component={UserProfilePage}
        />
        <Route
          exact
          path={routes.ROUTE_STATISTICS}
          component={StatisticsPage}
        />
        <Route exact path={routes.ROUTE_COMMENTS} component={CommentsPage} />
        <Route
          exact
          path={routes.ROUTE_FOLLOWED_CHANNELS}
          component={FollowingChannelsPage}
        />
        <Route
          exact
          path={routes.ROUTE_VIDEO_UPDATE}
          component={VideoUpdatePage}
        />

        <Route
          exact
          path={routes.ROUTE_MANAGE_USERS}
          component={ManageUsersPage}
        />

        <Route
          exact
          path={routes.ROUTE_MANAGE_VIDEOS}
          component={ManageVideosPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}

export default App;
