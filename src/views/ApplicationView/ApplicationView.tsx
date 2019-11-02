import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { routes } from 'routes';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import Routes from 'components/Routes';

import './ApplicationView.css';
import HeaderLinks from './HeaderLinks';

const ApplicationView: React.FC = (props) => {

  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
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

  useEffect(() => {
    const widthListener = () => {
      store.system.setScreenWidth(window.screen.width);
    };
    widthListener();
    window.addEventListener('resize', widthListener);
    return () => {
      window.removeEventListener('resize', widthListener);
    };
  });

  const closeMenu = () => {
    setShowMenu(false);
  };

  return (
    <Router>
      <div className="header">
        <div className="header-content">
          <NavLink to={routes.home.path} className="header-text">
            <h2>
              Trøndr
            </h2>
          </NavLink>
          {store.system.isMobileView ?
          <button onClick={() => setShowMenu(!showMenu)}>Meny</button>
          :
          <HeaderLinks isLoggedIn={store.system.isLoggedIn}/>}
        </div>
      </div>
      <div className="content">
        {loading ? 'Laster data...' :
          <Routes/>
        }
        {store.system.isMobileView &&
        <HeaderLinks
          isLoggedIn={store.system.isLoggedIn}
          showMenu={showMenu}
          closeMenu={closeMenu}
        />}
      </div>
    </Router>
  );
};

export default inject('store')(observer(ApplicationView));
