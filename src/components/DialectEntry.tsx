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

  if (redirect) {
    return <Redirect to={routes.words.relativePath(props.dialect.id)}/>;
  }
  return (
    <div className="dialect-entry">
      <div onClick={setActiveDialect} className="dialect-entry-name">
        {props.dialect.displayName}
        <i>{props.dialect.publicDialect ? 'Offentlig' : 'Privat'}</i>
      </div>
      <div className="dialect-entry-description">
        {props.dialect.description}
      </div>
    </div>
  );
};

export default DialectEntry;
