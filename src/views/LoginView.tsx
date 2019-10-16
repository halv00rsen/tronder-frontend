import React, { useState } from 'react';
import { Authenticator } from 'aws-amplify-react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { InjectedStoreProps } from 'store/Store';
import { Redirect } from 'react-router';
import { routes } from 'routes';


const LoginView: React.FC = (props) => {
  const [store] = useState((props as InjectedStoreProps).store);
  if (store.system.isLoggedIn) {
    return <Redirect to={routes.expressions.path}/>
  }
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

export default inject('store')(observer(LoginView));
