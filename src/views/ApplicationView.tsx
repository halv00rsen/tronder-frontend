import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { routes } from 'routes';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import NavigationLink from 'components/NavigationLink';
import Routes from 'components/Routes';

const ApplicationView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  useEffect(() => {
    API.get('tronder-api', '/dialect', {}).then((dialects: Dialect[]) => {
      store.system.setInitialDialects(dialects);
    });
  }, [store.system]);

  return (
    <Router>
      <div className="header">
        <div className="header-content">
          <NavLink to={routes.home.path} className="header-text">
            <h2>
              Trøndr
            </h2>
          </NavLink>
          {store.wordStore.activeDialect ? store.wordStore.activeDialect.displayName : ''}
          <div>
            <NavigationLink route={routes.dialect}/>
            <NavigationLink route={store.system.isLoggedIn ? routes.user : routes.login}/>
          </div>
        </div>
      </div>
      <div className="content">
        <Routes/>
      </div>
    </Router>
  );
};

export default inject('store')(observer(ApplicationView));
