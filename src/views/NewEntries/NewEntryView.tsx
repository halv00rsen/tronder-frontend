import React, { useState } from 'react';
import { inject } from 'mobx-react';
import { InjectedStoreProps } from 'store/Store';
import { RouteComponentProps, Redirect, useParams } from 'react-router';
import { routes } from 'routes';

interface NewEntryViewProps extends RouteComponentProps, InjectedStoreProps {

}

interface NewEntryViewRouterParams {
  dialectId: string;
}

const NewEntryView: React.FC<NewEntryViewProps> = (props) => {

  const [word, setWord] = useState('');
  const [meaning, setMeaning] = useState('');
  const [description, setDescription] = useState('');
  const [cancle, setCancle] = useState(false);

  const dialectId = Number(useParams<NewEntryViewRouterParams>().dialectId);

  const submitWord = () => {
    props.store.wordStore.addWord({
      wordText: word.trim(),
      description: description.trim(),
      translation: meaning.trim(),
      id: -1,
    });
    props.history.push(routes.words.relativePath(dialectId));
  };

  return (
    <div className="new-entry-view">
      {cancle && <Redirect to={routes.words.relativePath(dialectId)}/>}
      <h2>
        Nytt ord
      </h2>
      <input type="text" className="input-field" value={word} name="word" required={true} placeholder="Ord/uttrykk"
        onChange={(e) => setWord(e.target.value)}/>
      <input type="text" className="input-field" value={meaning} name="meaning" required={true} placeholder="Betydning"
        onChange={(e) => setMeaning(e.target.value)}/>
      <input type="text" className="input-field" value={description} placeholder="Beskrivelse"
        onChange={(e) => setDescription(e.target.value)}/>
      <div>
        <button type="button" className="button save-button" onClick={submitWord}>
          Lagre
        </button>
        <button type="button" className="button cancle-button" onClick={() => setCancle(true)}>
          Avbryt
        </button>
      </div>
    </div>
  );
};

export default inject('store')(NewEntryView);
