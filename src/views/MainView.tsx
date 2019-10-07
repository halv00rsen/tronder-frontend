import React, { useState } from 'react';
import { Store } from '../store/Store';
import { inject, observer } from 'mobx-react';

interface MainViewProps {
}

interface InjectedProps {
  store: Store;
}

const MainView: React.FC<MainViewProps> = (props) => {

  const [word, setWord] = useState('');
  const [store] = useState((props as InjectedProps).store);

  const addWord = () => {
    store.wordStore.addWord({
      text: word,
    });
    setWord('');
  }

  return (
    <div>
      {store.wordStore.words.map((word) => {
        return <div key={word.text}>{word.text}</div>
      })}
      <input type="text" value={word} onChange={(e) => setWord(e.target.value)} />
      <button onClick={addWord}>Lagre</button>
    </div>
  );
}

export default inject('store')(observer(MainView));