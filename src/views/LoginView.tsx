import React from 'react';
import { Authenticator } from 'aws-amplify-react';


const LoginView: React.FC = () => {
  return (
    <div className="App">
      <div className="header">
        <div className="header-content">
          <h2>Meet With Me</h2>
        </div>
      </div>
      <div className="content">
        <Authenticator/>
      </div>
    </div>
  );
};

export default LoginView;
