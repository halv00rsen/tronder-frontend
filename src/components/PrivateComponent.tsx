import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { InjectedStoreProps } from 'store/Store';

const PrivateComponent: React.FC = (props) => {
  const [store] = useState((props as InjectedStoreProps).store);
  return (
    <>
      {store.system.isLoggedIn && props.children}
    </>
  );
};

export default inject('store')(observer(PrivateComponent));
