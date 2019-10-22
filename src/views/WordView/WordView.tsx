import React, { useState, useEffect } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, useParams } from 'react-router';
import PrivateComponent from 'components/PrivateComponent';
import { routes } from 'routes';
import { NavLink } from 'react-router-dom';
import WordEntry from 'components/WordEntry';

import './WordView.css';
import { Dialect } from 'store/SystemStore';

interface WordViewProps extends InjectedStoreProps, RouteComponentProps {
}

interface WordViewRouteProps {
  dialectId: string;
}

const WordView: React.FC<WordViewProps> = (props) => {

  const [loading, setLoading] = useState(true);
  const dialectId = Number(useParams<WordViewRouteProps>().dialectId);

  useEffect(() => {
    const dialect = props.store.system.dialects.find((dialect: Dialect) => dialect.id === dialectId);
    if (dialect) {
      props.store.wordStore.setActiveDialect(dialect);
      setLoading(false);
    } else {
      console.log('ERROROROROR');
    }
  }, [dialectId, props.store.wordStore, props.store.system.dialects]);

  return (
    <div>
      <div className="word-view-header">
        {props.store.wordStore.activeDialect && props.store.wordStore.activeDialect.displayName}
        <button onClick={() => props.store.wordStore.reloadActiveDialect()}>
          Reload
        </button>
      </div>
      {loading ? 'Laster ord...' :
      <>
        <div className="word-view-words">
          {props.store.wordStore.words.map((word) => {
            return (
              <WordEntry key={word.id} word={word}/>
            );
          })}
        </div>
        <PrivateComponent>
          <NavLink to={routes.newEntry.relativePath(dialectId)}>
            {routes.newEntry.displayName}
          </NavLink>
        </PrivateComponent>
      </>
      }
    </div>
  );
};

export default inject('store')(observer(WordView));
