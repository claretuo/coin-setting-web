import React from 'react';
import { IndexRoute, Route } from 'react-router';
import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
    App,
    Home,
    NotFound,
    Signin,
  } from 'containers';

export default (store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth: { user }} = store.getState();
      if (!user) {
       // oops, not logged in, so can't be here!
        replace('/signin');
      }
      cb();
    }

    if (!isAuthLoaded(store.getState())) {
      store.dispatch(loadAuth()).then(checkAuth);
    } else {
      checkAuth();
    }
  };
  console.log(requireLogin);
  return (
    <Route path="/" name="App" breadcrumbName="权限系统" component={App}>
      { /* Home (main) route */ }
      { /*
        <Route path="">
        <IndexRoute component={NonPropertyView} />
        onEnter={requireLogin}
        */
      }
      <Route
      >
        <IndexRoute name="Home" component={Home}/>
      </Route>
      <Route name="signin" path="signin" breadcrumbName="登录" component={Signin} />
      { /* </Route> */ }
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
