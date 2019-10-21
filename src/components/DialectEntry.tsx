import React, { useState } from 'react';
import { inject, observer } from 'mobx-react';
import { Dialect } from 'store/SystemStore';
import { InjectedStoreProps, Store } from 'store/Store';
import { Redirect } from 'react-router';
import { routes } from 'routes';

interface DialectEntryProps {
  dialect: Dialect;
  store?: Store;
}


const DialectEntry: React.FC<DialectEntryProps> = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);
  const [redirect, setRedirect] = useState(false);

  const setActiveDialect = () => {
    store.wordStore.setActiveDialect(props.dialect);
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to={routes.words.path}/>;
  }
  return (
    <div className="dialect-entry">
      <div onClick={setActiveDialect} className="dialect-entry-name">
        {props.dialect.displayName}
      </div>
      <div className="dialect-entry-description">
        {props.dialect.description}
      </div>
    </div>
  );
};

export default inject('store')(observer(DialectEntry));
