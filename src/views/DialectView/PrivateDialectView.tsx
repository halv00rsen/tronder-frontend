import React, { useEffect, useState } from 'react';
import { InjectedStoreProps } from 'store/Store';
import PrivateComponent from 'components/PrivateComponent';
import DialectEntry from 'components/DialectEntry';
import { routes } from 'routes';
import { NavLink } from 'react-router-dom';
import { inject } from 'mobx-react';

const PrivateDialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  useEffect(() => {
    store.wordStore.setActiveDialect();
  }, [store.wordStore]);

  return (
    <PrivateComponent>
      <div className="dialect-header">
        <h2>Dine Dialekter</h2>
        <NavLink to={routes.newDialect.path}>
          Ny dialekt
        </NavLink>
      </div>
      {store.system.userDialects.length !== 0 ?
        store.system.userDialects.map(dialect => {
          return <DialectEntry key={'private-' + dialect.id} dialect={dialect}/>;
        })
        :
        <i>Her var det tomt</i>
      }
    </PrivateComponent>
  );
};

export default inject('store')(PrivateDialectView);
