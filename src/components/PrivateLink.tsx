import React from 'react';
import PrivateComponent from './PrivateComponent';
import { NavLink } from 'react-router-dom';

interface PrivateLinkProps {
  displayText: string;
  route: string;
  className?: string;
  activeClassName?: string;
  clicked?: () => void;
}

const PrivateLink: React.FC<PrivateLinkProps> = (props) => {
  return (
    <PrivateComponent>
      <NavLink to={props.route}
          className={props.className}
          onClick={() => props.clicked && props.clicked()}
          activeClassName={props.activeClassName}>
        {props.displayText}
      </NavLink>
    </PrivateComponent>
  );
};

export default PrivateLink;
