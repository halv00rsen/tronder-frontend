import React from 'react';
import { Dialect } from 'store/SystemStore';

interface WordViewDialectMetaProps {
  activeDialect: Dialect;
}

const WordViewDialectMeta: React.FC<WordViewDialectMetaProps> = (props) => {
  return (
    <div className="word-view-divider">
      {props.activeDialect.userInfo &&
        <div>Opprettet av: {props.activeDialect.userInfo.name}</div>
      }
      <b>Kjennetegn</b>
      <ul>
        {props.activeDialect.hallmarks.map((hallmark) => {
          return <li key={`hallmark-${hallmark}`}>{hallmark}</li>;
        })}
      </ul>
    </div>
  );
};

export default WordViewDialectMeta;
