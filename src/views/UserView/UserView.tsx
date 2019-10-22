import React from 'react';
import { inject } from 'mobx-react';
import { Auth } from 'aws-amplify';

import './UserView.css';

const UserView: React.FC = () => {

  const logout = () => {
    Auth.signOut();
  };

  return (
    <div className="user-view">
      <button className="logout-button" onClick={logout}>Logg ut</button>
    </div>
  );
};

export default inject('store')(UserView);
