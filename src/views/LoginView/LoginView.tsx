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
    return <Redirect to={routes.dialect.path}/>;
  }
  return (
    <div className="App">
      <Authenticator/>
    </div>
  );
};

export default inject('store')(observer(LoginView));
