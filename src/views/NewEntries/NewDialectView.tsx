import React, { useState } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { API } from 'aws-amplify';
import { Dialect } from 'store/SystemStore';
import { Redirect } from 'react-router';
import { routes } from 'routes';
import { inject } from 'mobx-react';

const NewDialectView: React.FC = (props) => {

  const [store] = useState((props as InjectedStoreProps).store);
  const [description, setDescription] = useState('');
  const [publicDialect, setPublicDialect] = useState(false);
  const [name, setName] = useState('');
  const [cancle, setCancle] = useState(false);
  const [hallmarks, setHallmarks] = useState<string[]>([]);
  const [hallmark, setHallmark] = useState('');

  const saveDialect = () => {
    API.post('tronder-api', '/dialect', {
      body: {
        description,
        displayName: name,
        publicDialect,
        hallmarks,
      }
    }).then((dialect: Dialect) => {
      store.system.addDialect(dialect);
      setName('');
      setDescription('');
      setCancle(true);
    });
  };

  const addHallmark = () => {
    if (!hallmark || hallmarks.indexOf(hallmark) !== -1) {
      return;
    }
    setHallmarks([
      ...hallmarks,
      hallmark,
    ]);
    setHallmark('');
  };

  const removeHallmark = (hallmark: string) => {
    hallmarks.splice(hallmarks.indexOf(hallmark), 1);
    setHallmarks([
      ...hallmarks
    ]);
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
      <label>Offentlig: </label>
      <input type="checkbox" checked={publicDialect}
        onChange={(e) => setPublicDialect(e.target.checked)}/>
      <br/>
      <b>Kjennetegn</b>
      <ul>
        {hallmarks.map((elem) => {
          return (
            <li key={`hallmark-${elem}`}>
              {elem}
              <button onClick={() => removeHallmark(elem)}>
                Fjern
              </button>
            </li>
          );
        })}
      </ul>
      <input type="text" value={hallmark}
        onChange={(e) => setHallmark(e.target.value)}/>
      <button onClick={addHallmark}>
        Legg til kjennetegn
      </button>
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

export default inject('store')(NewDialectView);
