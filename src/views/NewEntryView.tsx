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
  const [description, setDescription] = useState('');


  const submitWord = (event: FormEvent) => {
    event.preventDefault();
    props.store.wordStore.addWord({
      wordText: word.trim(),
      description: description.trim(),
      translation: meaning.trim(),
      id: -1,
    });
    props.history.push(routes.words.path);
  };

  return (
    <div>
      <form onSubmit={(e) => submitWord(e)}>
        <input type="text" value={word} name="word" required={true} placeholder="Ord/uttrykk"
          onChange={(e) => setWord(e.target.value)}/>
        <br/>
        <input type="text" value={meaning} name="meaning" required={true} placeholder="Betydning"
          onChange={(e) => setMeaning(e.target.value)}/>
        <input type="submit" value="Lagre"/>
        <br/>
        <input type="text" value={description} placeholder="Beskrivelse"
          onChange={(e) => setDescription(e.target.value)}/>
      </form>
    </div>
  );
};

export default inject('store')(NewEntryView);
