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
  const [activeDialect, setActiveDialect] = useState(store.wordStore.activeDialect !== undefined);

  useEffect(() => {
    setActiveDialect(store.wordStore.activeDialect !== undefined);
  }, [store.wordStore.activeDialect]);

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
        Trøndr {store.wordStore.activeDialect && ` - ${store.wordStore.activeDialect.displayName}`}
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
          <PrivateRoute path={routes.words.path}
            condition={activeDialect}
            component={WordView}/>
          <Route path={routes.dialect.path}
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
      {activeDialect &&
        <div className="navigation">
          <NavLink className="router-link" activeClassName="router-link-active" to={routes.words.path}>
            {routes.words.displayName}
          </NavLink>
          <NavLink className="router-link" activeClassName="router-link-active" to={routes.newEntry.path}>
            {routes.newEntry.displayName}
          </NavLink>
          <NavLink className="router-link" activeClassName="router-link-active" to={routes.dialect.path}>
            {routes.dialect.displayName}
          </NavLink>
        </div>
      }
    </Router>
  );
};

export default inject('store')(observer(ApplicationView));
