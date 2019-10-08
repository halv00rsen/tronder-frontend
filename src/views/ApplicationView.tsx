import React from 'react';
import { Auth } from 'aws-amplify';
import { BrowserRouter as Router, Switch, Route, NavLink } from 'react-router-dom';
import { routes } from 'routes';
import NewEntryView from './NewEntryView';
import WordView from './WordView';

const ApplicationView: React.FC = () => {

  const logout = () => {
    Auth.signOut();
  };

  return (
    <Router>
      <div className="header">
        Trøndr
      </div>
      <div className="content">
          <Switch>
            <Route path={routes.words.path}
              component={WordView}/>
            <Route path={routes.expressions.path}
              component={WordView}/>
            <Route path={routes.newEntry.path}
              component={NewEntryView}/>
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
      <button onClick={logout}>Logg ut</button>
    </Router>
  );
};

export default ApplicationView;
