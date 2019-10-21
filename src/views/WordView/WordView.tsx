import React from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import PrivateComponent from 'components/PrivateComponent';
import { routes } from 'routes';
import { NavLink } from 'react-router-dom';
import WordEntry from 'components/WordEntry';

import './WordView.css';

interface WordViewProps extends InjectedStoreProps, RouteComponentProps {
}

const WordView: React.FC<WordViewProps> = (props) => {

  return (
    <div>
      <div className="word-view-header">
        {props.store.wordStore.activeDialect && props.store.wordStore.activeDialect.displayName}
      </div>
      <div className="word-view-words">
        {props.store.wordStore.words.map((word) => {
          return (
            <WordEntry key={word.id} word={word}/>
          );
        })}
      </div>
      <PrivateComponent>
        <NavLink to={routes.newEntry.path}>
          {routes.newEntry.displayName}
        </NavLink>
      </PrivateComponent>
    </div>
  );
};

export default inject('store')(observer(WordView));
