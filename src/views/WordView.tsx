import React from 'react';
import { InjectedStoreProps } from 'store/Store';
import { inject, observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router';

interface WordViewProps extends InjectedStoreProps, RouteComponentProps {
}

const WordView: React.FC<WordViewProps> = (props) => {

  return (
    <div>
      {props.store.wordStore.words.map((word) => {
        return (
          <div key={word.id}>
            {word.wordText} - {word.translation}
          </div>
        );
      })}
    </div>
  );
};

export default inject('store')(observer(WordView));
