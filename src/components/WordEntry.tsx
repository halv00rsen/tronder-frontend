import React, { useState } from 'react';
import { Word } from 'store/WordStore';

interface WordEntryProps {
  word: Word;
}

const WordEntry: React.FC<WordEntryProps> = (props) => {
  const [clicked, setClicked] = useState(false);

  const clickEntry = () => {
    setClicked(!clicked);
  };

  const keyPress = (event: React.KeyboardEvent) => {
    if (event.charCode === 13) {
      clickEntry();
    }
  };

  return (
    <div className="word-entry-wrapper">
      <div className="word-entry">
        <div className={`word-entry-text ${clicked ? 'word-entry-text-clicked' : ''}`}
            onClick={clickEntry}
            onKeyPress={keyPress}
            tabIndex={0}
            role="button">
          <div>
            {props.word.wordText}
          </div>
          <div>
            {props.word.translation}
          </div>
        </div>
      </div>
      {clicked &&
        <div className="word-entry-description">
          {props.word.description ?
            props.word.description :
            <i>Ingen beskrivelse</i>}
        </div>
      }
    </div>
  );
};

export default WordEntry;