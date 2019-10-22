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
      props.history.push(routes.dialect.path);
    }
  }, [
    dialectId,
    props.store.wordStore,
    props.store.system.dialects,
    props.history,
  ]);

  return (
    <div>
      <div className="word-view-header">
        <div className="word-view-header-text">
          {props.store.wordStore.activeDialect && props.store.wordStore.activeDialect.displayName}
        </div>
        <div>
          <button onClick={() => props.store.wordStore.reloadActiveDialect()}>
            Reload
          </button>
          <PrivateComponent>
            <NavLink to={routes.newEntry.relativePath(dialectId)}>
              {routes.newEntry.displayName}
            </NavLink>
          </PrivateComponent>
        </div>
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
          <NavLink className="bottom-add-button" to={routes.newEntry.relativePath(dialectId)}>
            +
          </NavLink>
        </PrivateComponent>
      </>
      }
    </div>
  );
};

export default inject('store')(observer(WordView));
