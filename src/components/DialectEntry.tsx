import React, { useState } from 'react';
import { Dialect } from 'store/SystemStore';
import { Redirect } from 'react-router';
import { routes } from 'routes';

interface DialectEntryProps {
  dialect: Dialect;
}

const DialectEntry: React.FC<DialectEntryProps> = (props) => {

  const [redirect, setRedirect] = useState(false);

  const setActiveDialect = () => {
    setRedirect(true);
  };

  const keyPress = (e: React.KeyboardEvent) => {
    if (e.charCode === 13) {
      setActiveDialect();
    }
  };

  if (redirect) {
    return <Redirect to={routes.words.relativePath(props.dialect.id)}/>;
  }
  return (
    <div className="dialect-entry">
      <div onClick={setActiveDialect}
          onKeyPress={keyPress}
          className="dialect-entry-name" role="button" tabIndex={0}>
        {props.dialect.displayName}
        <i>{props.dialect.publicDialect ? 'Offentlig' : 'Privat'}</i>
      </div>
      <div className="dialect-entry-description">
        {props.dialect.description}
        <p>
          Antall ord og uttrykk: {props.dialect.numWords}
        </p>
      </div>
    </div>
  );
};

export default DialectEntry;
