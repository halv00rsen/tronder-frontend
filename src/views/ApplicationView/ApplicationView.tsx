import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { routes } from 'routes';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import NavigationLink from 'components/NavigationLink';
import Routes from 'components/Routes';

import './ApplicationView.css';
import PrivateLink from 'components/PrivateLink';

const ApplicationView: React.FC = (props) => {

  const [loading, setLoading] = useState(true);
  const [store] = useState((props as InjectedStoreProps).store);

  useEffect(() => {
    API.get('tronder-api', '/dialect', {}).then((dialects: Dialect[]) => {
      store.system.setInitialDialects(dialects);
      setLoading(false);
    });
    API.get('tronder-api', '/hallmark', {}).then((hallmarks: string[]) => {
      store.system.setInitialHallmarks(hallmarks);
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
          <div>
            <NavigationLink route={routes.dialect}/>
            <PrivateLink
              activeClassName="router-link-active"
              className="router-link"
              displayText={routes.privateDialects.displayName}
              route={routes.privateDialects.path}/>
            <NavigationLink route={store.system.isLoggedIn ? routes.user : routes.login}/>
          </div>
        </div>
      </div>
      <div className="content">
        {loading ? 'Laster data...' :
        <Routes/>
        }
      </div>
    </Router>
  );
};

export default inject('store')(observer(ApplicationView));
