import React from 'react';
import { inject } from 'mobx-react';
import { Auth } from 'aws-amplify';

const UserView: React.FC = () => {

  const logout = () => {
    Auth.signOut();
  };

  return (
    <div>
      <button onClick={logout}>Logg ut</button>
    </div>
  );
};

export default inject('store')(UserView);
