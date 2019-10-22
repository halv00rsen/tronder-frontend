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
        <h2>Åpne Dialekter</h2>
      </div>
      {store.system.publicDialects.map(dialect => {
        return <DialectEntry key={dialect.id} dialect={dialect}/>;
      })}
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
    </div>
  );
};

export default inject('store')(observer(DialectView));
