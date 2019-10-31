import React, { useState } from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { routes } from 'routes';
import WordView from 'views/WordView/WordView';
import DialectView from 'views/DialectView/DialectView';
import NewEntryView from 'views/NewEntries/NewEntryView';
import UserView from 'views/UserView/UserView';
import LoginView from 'views/LoginView/LoginView';
import { InjectedStoreProps } from 'store/Store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import NewDialectView from 'views/NewEntries/NewDialectView';
import HomeView from 'views/HomeView/HomeView';
import PrivateDialectView from 'views/DialectView/PrivateDialectView';

const Routes: React.FC = (props) => {
  const [store] = useState((props as InjectedStoreProps).store);

  return (
    <Switch>
      <Route
        exact={true}
        path={routes.dialect.path}
        component={DialectView}/>
      <Route
        exact={true}
        path={routes.privateDialects.path}
        component={PrivateDialectView}/>
      <Route
        path={routes.login.path}
        component={LoginView}/>
      <Route
        path={routes.notFound.path}>
        Ikke funnet
      </Route>
      <Route
        exact={true}
        path={routes.home.path}
        component={HomeView}/>
      <Route
        path={routes.words.path}
        component={WordView}/>

      <PrivateRoute
        path={routes.newDialect.path}
        component={NewDialectView}/>
      <PrivateRoute
        path={routes.newEntry.path}
        condition={store.wordStore.isActiveDialect}
        component={NewEntryView}/>

      <PrivateRoute
        path={routes.user.path}
        component={UserView}/>
    </Switch>
  );
};

export default inject('store')(observer(Routes));
