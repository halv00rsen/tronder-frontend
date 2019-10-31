import React, { useState, useEffect } from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps, useParams } from 'react-router';
import { routes } from 'routes';

import './WordView.css';
import { Dialect } from 'store/SystemStore';
import WordViewDialectMeta from './WordViewDialectMeta';
import WordViewWords from './WordViewWords';

interface WordViewProps extends InjectedStoreProps, RouteComponentProps {
}

interface WordViewRouteProps {
  dialectId: string;
}

const WordView: React.FC<WordViewProps> = (props) => {

  const [loading, setLoading] = useState(true);
  const dialectId = Number(useParams<WordViewRouteProps>().dialectId);
  const [activeDialect, setActiveDialect] = useState(props.store.wordStore.activeDialect);

  useEffect(() => {
    const dialect = props.store.system.dialects.find((dialect: Dialect) => dialect.id === dialectId);
    if (dialect) {
      props.store.wordStore.setActiveDialect(dialect);
      setLoading(false);
      setActiveDialect(dialect);
    } else {
      props.history.push(routes.dialect.path);
    }
  }, [
    dialectId,
    props.store.wordStore,
    props.store.system.dialects,
    props.history,
  ]);

  if (!activeDialect || loading) {
    return <div>Laster data</div>;
  }

  return (
    <div>
      <div className="word-view-header word-view-divider">
        <div className="word-view-header-text">
          {activeDialect.displayName}
        </div>
        <button
            onClick={() => props.store.wordStore.reloadActiveDialect()}>
          Reload
        </button>
      </div>
      <WordViewDialectMeta
        activeDialect={activeDialect}/>
      <WordViewWords
        activeDialect={activeDialect}
        words={props.store.wordStore.words}/>
    </div>
  );
};

export default inject('store')(observer(WordView));
