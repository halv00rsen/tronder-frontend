import React, { useEffect, useState } from 'react';
import { Auth, API } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { routes } from 'routes';
import NewEntryView from './NewEntryView';
import WordView from './WordView';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import DialectView from './DialectView';
import LoginView from './LoginView';
import PrivateRoute from 'components/PrivateRoute';

const ApplicationView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  useEffect(() => {
    API.get('tronder-api', '/dialect', {}).then((dialects: Dialect[]) => {
      store.system.setInitialDialects(dialects);
    });
  }, [store.system]);

  const logout = () => {
    Auth.signOut();
  };

  return (
    <Router>
      <div className="header">
        Trøndr
        {store.system.isLoggedIn ?
          <div>
            <button onClick={logout}>Logg ut</button>
          </div>
          :
          <div>
            <NavLink className="router-link" activeClassName="router-link-active" to={routes.login.path}>
              {routes.login.displayName}
            </NavLink>
          </div>
        }
      </div>
      <div className="content">
        <Switch>
          <Route path={routes.words.path}
            component={WordView}/>
          <Route path={routes.expressions.path}
            component={DialectView}/>
          <PrivateRoute path={routes.newEntry.path}
            component={NewEntryView}/>
          <Route path={routes.login.path}
            component={LoginView}/>
          <Route path={routes.notFound.path}>
            Ikke funnet
          </Route>
        </Switch>
      </div>
      <div className="navigation">
        <NavLink className="router-link" activeClassName="router-link-active" to={routes.words.path}>
          {routes.words.displayName}
        </NavLink>
        <NavLink className="router-link" activeClassName="router-link-active" to={routes.expressions.path}>
          {routes.expressions.displayName}
        </NavLink>
        <NavLink className="router-link" activeClassName="router-link-active" to={routes.newEntry.path}>
          {routes.newEntry.displayName}
        </NavLink>
      </div>
    </Router>
  );
};

export default inject('store')(observer(ApplicationView));
