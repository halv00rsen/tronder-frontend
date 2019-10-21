import React, { useState } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { API } from 'aws-amplify';
import { Dialect } from 'store/SystemStore';
import { Redirect } from 'react-router';
import { routes } from 'routes';

const NewDialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [cancle, setCancle] = useState(false);

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
      {cancle && <Redirect to={routes.dialect.path}/>}
      <h2>Opprett ny dialekt</h2>
      <input type="text" value={name} required={true} placeholder="Dialekt"
        onChange={(e) => setName(e.target.value)}/>
      <br/>
      <input type="text" value={description} required={true} placeholder="Beskrivelse"
        onChange={(e) => setDescription(e.target.value)}/>
      <br/>
      <button onClick={saveDialect}>
        Lagre dialekt
      </button>
      <button onClick={() => setCancle(true)}>
        Avbryt
      </button>
    </div>
  );
};

export default NewDialectView;
