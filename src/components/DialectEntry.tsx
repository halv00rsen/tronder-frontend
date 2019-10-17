import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps, Store } from 'store/Store';

interface DialectEntryProps {
  dialect: Dialect;
  store?: Store;
}


const DialectEntry: React.FC<DialectEntryProps> = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);

  const setActiveDialect = () => {
    store.wordStore.setActiveDialect(props.dialect);
  };

  return (
    <div onClick={setActiveDialect}>
      {props.dialect.displayName}
    </div>
  );
};

export default inject('store')(observer(DialectEntry));
