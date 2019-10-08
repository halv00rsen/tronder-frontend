import React, { useState, useEffect } from 'react';
import { Store, InjectedStoreProps } from '../store/Store';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';
import { routes } from 'routes';

interface WordViewProps extends InjectedStoreProps, RouteComponentProps {
}

const WordView: React.FC<WordViewProps> = (props) => {

  const [isWord] = useState(props.location.pathname === routes.words.path);
  const [list] = useState(isWord ? props.store.wordStore.words : props.store.wordStore.expressions);

  return (
    <div>
      {list.map((word) => {
        return (
          <div key={word.text}>
            {word.text} - {word.meaning}
          </div>
        );
      })}
    </div>
  );
};

export default inject('store')(observer(WordView));
