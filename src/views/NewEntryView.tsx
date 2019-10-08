import React, { useState, FormEvent } from 'react';
import { inject } from 'mobx-react';
import { InjectedStoreProps } from 'store/Store';
import { RouteComponentProps } from 'react-router';
import { routes } from 'routes';

interface NewEntryViewProps extends RouteComponentProps, InjectedStoreProps {

}

const NewEntryView: React.FC<NewEntryViewProps> = (props) => {

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');

  const submitWord = (event: FormEvent) => {
    event.preventDefault();
    props.store.wordStore.addWord({
      meaning: meaning.trim(),
      text: word.trim(),
    });
    props.history.push(routes.words.path);
  };

  return (
    <div>
      <form onSubmit={(e) => submitWord(e)}>
        <input type="text" value={word} name="word" required={true}
          onChange={(e) => setWord(e.target.value)}/>
        <br/>
        <input type="text" value={meaning} name="meaning" required={true}
          onChange={(e) => setMeaning(e.target.value)}/>
        <input type="submit" value="Lagre"/>
      </form>
    </div>
  );
};

export default inject('store')(NewEntryView);
