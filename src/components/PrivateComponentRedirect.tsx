import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { InjectedStoreProps } from 'store/Store';
import { Redirect } from 'react-router';
import { routes } from 'routes';

const PrivateComponentRedirect: React.FC = (props) => {
  const [store] = useState((props as InjectedStoreProps).store);
  return (
    <>
      {store.system.isLoggedIn ?
        props.children : <Redirect to={routes.login.path}/>
      }
    </>
  );
};
export default inject('store')(observer(PrivateComponentRedirect));
