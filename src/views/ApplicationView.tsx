import React from 'react';
import { Auth } from 'aws-amplify';

const ApplicationView: React.FC = () => {

  const logout = () => {
    Auth.signOut();
  };

  return (
    <div>
      Applikasjonsvisning
      <button onClick={logout}>Logg ut</button>

    </div>
  );
};

export default ApplicationView;
