import React from 'react';
import { DisplayRoute } from 'routes';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  route: DisplayRoute;
  clicked?: () => void;
}

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  return (
    <NavLink
        className="router-link"
        activeClassName="router-link-active"
        onClick={() => props.clicked && props.clicked()}
        to={props.route.path}>
      {props.route.displayName}
    </NavLink>
  );
};

export default NavigationLink;
