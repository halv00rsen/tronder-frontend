import React, { useState, useEffect } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import DialectEntry from 'components/DialectEntry';

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
      </div>
      {store.system.publicDialects.map(dialect => {
        return <DialectEntry key={dialect.id} dialect={dialect}/>;
      })}
    </div>
  );
};

export default inject('store')(observer(DialectView));
