import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Route, Redirect } from 'react-router';
import { InjectedStoreProps } from 'store/Store';
import { routes } from 'routes';

interface PrivateRouteProps {
  component: React.FC<any>;
  path: string;
}

interface CombinedProps extends PrivateRouteProps, InjectedStoreProps {

}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  const [store] = useState((props as CombinedProps).store);
  if (store.system.isLoggedIn) {
    return (
      <Route path={props.path} component={props.component}/>
    );
  } else {
    return <Redirect to={routes.login.path}/>;
  }
};

export default inject('store')(observer(PrivateRoute));
