import React, { useState } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import PrivateComponent from 'components/PrivateComponent';
import DialectEntry from 'components/DialectEntry';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

const DialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  return (
    <div>
      {store.system.dialects.map(dialect => {
        return <DialectEntry key={dialect.id} dialect={dialect}/>;
      })}
      <PrivateComponent>
        <NavLink to={routes.newDialect.path}>
          Ny dialekt
        </NavLink>
      </PrivateComponent>
    </div>
  );
};

export default inject('store')(observer(DialectView));
