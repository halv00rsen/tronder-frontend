import React from 'react';
import { inject, observer } from 'mobx-react';
import { Auth } from 'aws-amplify';

import './UserView.css';
import { InjectedStoreProps } from 'store/Store';
import { Redirect } from 'react-router';
import { routes } from 'routes';

const UserView: React.FC<InjectedStoreProps> = (props) => {

  const logout = () => {
    Auth.signOut();
  };

  if (!props.store.system.user) {
    return <Redirect to={routes.home.path}/>;
  }
  return (
    <div className="user-view">
      <div className="user-view-name">
        {props.store.system.user.name}
      </div>
      <div className="user-view-email">
        {props.store.system.user.email}
      </div>
      <button className="logout-button" onClick={logout}>Logg ut</button>
    </div>
  );
};

export default inject('store')(observer(UserView));
