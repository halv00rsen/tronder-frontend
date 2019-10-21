import React, { useState } from 'react';
import { Switch, Route } from 'react-router';
import PrivateRoute from './PrivateRoute';
import { routes } from 'routes';
import WordView from 'views/WordView';
import DialectView from 'views/DialectView';
import NewEntryView from 'views/NewEntryView';
import UserView from 'views/UserView';
import LoginView from 'views/LoginView';
import { InjectedStoreProps } from 'store/Store';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import NewDialectView from 'views/NewDialectView';
import HomeView from 'views/HomeView';

const Routes: React.FC = (props) => {
  const [store] = useState((props as InjectedStoreProps).store);

  return (
    <Switch>
      <Route
        path={routes.dialect.path}
        component={DialectView}/>
      <Route
        path={routes.login.path}
        component={LoginView}/>
      <Route
        path={routes.notFound.path}>
        Ikke funnet
      </Route>
      <Route
        path={routes.home.path}
        component={HomeView}/>

      <PrivateRoute
        path={routes.words.path}
        condition={store.wordStore.isActiveDialect}
        overrideLogin={true}
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
