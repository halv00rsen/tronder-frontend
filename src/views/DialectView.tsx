import React, { useState } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import { API } from 'aws-amplify';
import { Dialect } from 'store/SystemStore';
import PrivateComponent from 'components/PrivateComponent';

const DialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');

  const saveDialect = () => {
    API.post('tronder-api', '/dialect', {
      body: {
        description,
        displayName: name,
      }
    }).then((dialect: Dialect) => {
      store.system.addDialect(dialect);
      setName('');
      setDescription('');
    });
  };

  return (
    <div>
      {store.system.dialects.map(dialect => {
        return <div key={dialect.id}>{dialect.displayName}</div>;
      })}
      <PrivateComponent>
        <input type="text" value={name} required={true}
          onChange={(e) => setName(e.target.value)}/>
        <br/>
        <input type="text" value={description} required={true}
          onChange={(e) => setDescription(e.target.value)}/>
        <br/>
        <button onClick={saveDialect}>
          Lagre dialekt
        </button>
      </PrivateComponent>
    </div>
  );
};

export default inject('store')(observer(DialectView));
