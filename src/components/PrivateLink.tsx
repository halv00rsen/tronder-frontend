import React from 'react';
import PrivateComponent from './PrivateComponent';
import { NavLink } from 'react-router-dom';

interface PrivateLinkProps {
  displayText: string;
  route: string;
  className?: string;
  activeClassName?: string;
}

const PrivateLink: React.FC<PrivateLinkProps> = (props) => {
  return (
    <PrivateComponent>
      <NavLink to={props.route}
          className={props.className}
          activeClassName={props.activeClassName}>
        {props.displayText}
      </NavLink>
    </PrivateComponent>
  );
};

export default PrivateLink;
