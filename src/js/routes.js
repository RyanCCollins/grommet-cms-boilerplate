import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {
  App,
  HomePage,
  PressReleasePage,
  DashboardContainer,
  LoginPage,
  DashboardHomePage,
  DashboardUserForm,
  DashboardUsersPage,
  DashboardPressReleasesPage,
  DashboardPressReleasePage,
  DashboardPostsPage,
  DashboardPostPage,
  DashboardContentBlocks,
  AssetsPage,
  AssetPage
} from 'grommet-cms/containers';

export const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.login.loggedIn) {
      // Not authenticated, redirect to login page.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/dashboard'
      });
    }
  };

  return (
    <Router history={browserHistory}>
      <Route path='/dashboard' component={DashboardContainer}>
        <IndexRoute component={LoginPage} />
        <Route path="assets" component={AssetsPage} onEnter={authRequired} />
        <Route path="asset/:id" component={AssetPage} onEnter={authRequired} />
        <Route path="homepage" component={DashboardHomePage} onEnter={authRequired} />
        <Route path="users" component={DashboardUsersPage} onEnter={authRequired} />
        <Route path='user/create' component={DashboardUserForm} onEnter={authRequired} />
        <Route path='press-releases' component={DashboardPressReleasesPage} onEnter={authRequired} />
        <Route path='press-release/:id' component={DashboardPressReleasePage} onEnter={authRequired} />
        <Route path='posts' component={DashboardPostsPage} onEnter={authRequired} />
        <Route path='post/:id' component={DashboardPostPage} onEnter={authRequired} />
      </Route>

      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="posts/:slug" component={PressReleasePage} />
        <Route path="blocks" component={DashboardContentBlocks} />
        <Route path="*" component={HomePage} />
      </Route>
    </Router>
  );
};
