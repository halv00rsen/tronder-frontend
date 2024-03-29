import React, { useState } from 'react';
import { Dialect } from 'store/SystemStore';
import { Redirect } from 'react-router';
import { routes } from 'routes';
import { ENTER_KEY } from 'utils/constants';

interface DialectEntryProps {
  dialect: Dialect;
}

const DialectEntry: React.FC<DialectEntryProps> = (props) => {

  const [redirect, setRedirect] = useState(false);

  const setActiveDialect = () => {
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect push to={routes.words.relativePath(props.dialect.id)}/>;
  }
  return (
    <div className="dialect-entry">
      <div onClick={setActiveDialect}
          onKeyPress={(e) => e.charCode === ENTER_KEY && setActiveDialect()}
          className="dialect-entry-name" role="button" tabIndex={0}>
        {props.dialect.displayName} ({props.dialect.numWords} ord)
        <i>{props.dialect.publicDialect ? 'Offentlig' : 'Privat'}</i>
      </div>
      <div className="dialect-entry-description">
        {props.dialect.description}
      </div>
    </div>
  );
};

export default DialectEntry;
