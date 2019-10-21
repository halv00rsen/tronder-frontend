import React from 'react';
import { DisplayRoute } from 'routes';
import { NavLink } from 'react-router-dom';

interface NavigationLinkProps {
  route: DisplayRoute;
}

const NavigationLink: React.FC<NavigationLinkProps> = (props) => {
  return (
    <NavLink className="router-link" activeClassName="router-link-active" to={props.route.path}>
      {props.route.displayName}
    </NavLink>
  );
};

export default NavigationLink;
