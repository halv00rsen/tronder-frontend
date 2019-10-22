import React, { useState, useEffect } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import PrivateComponent from 'components/PrivateComponent';
import DialectEntry from 'components/DialectEntry';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

import './DialectView.css';

const DialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  useEffect(() => {
    store.wordStore.setActiveDialect();
  }, [store.wordStore]);

  return (
    <div>
      <div className="dialect-header">
        <h2>Dialekter</h2>
        <PrivateComponent>
          <NavLink to={routes.newDialect.path}>
            Ny dialekt
          </NavLink>
        </PrivateComponent>
      </div>
      {store.system.dialects.map(dialect => {
        return <DialectEntry key={dialect.id} dialect={dialect}/>;
      })}
    </div>
  );
};

export default inject('store')(observer(DialectView));
