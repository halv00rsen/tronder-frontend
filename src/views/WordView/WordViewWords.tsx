import React, { useState } from 'react';
import PrivateLink from 'components/PrivateLink';
import WordEntry from 'components/WordEntry';
import { routes } from 'routes';
import { Word } from 'store/WordStore';
import { Dialect } from 'store/SystemStore';
import { observer } from 'mobx-react';

interface WordViewWordsProps {
  words: Word[];
  activeDialect: Dialect;
}

const WordViewWords: React.FC<WordViewWordsProps> = (props) => {
  const [routePath] = useState(routes.newEntry.relativePath(props.activeDialect.id));
  return (
    <div className="word-view-word-section">
      <div className="word-view-header">
        <h4>Ord og uttrykk</h4>
        <PrivateLink
          route={routePath}
          displayText={routes.newEntry.displayName}/>
      </div>
      <div className="word-view-words">
        {props.words.map((word) => {
          return (
            <WordEntry key={word.id} word={word}/>
          );
        })}
      </div>
      <PrivateLink
        className="bottom-add-button"
        route={routePath}
        displayText="+"/>
    </div>
  );
};

export default observer(WordViewWords);
