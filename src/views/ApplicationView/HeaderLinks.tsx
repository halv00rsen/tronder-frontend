import React from 'react';
import NavigationLink from 'components/NavigationLink';
import { routes } from 'routes';
import PrivateLink from 'components/PrivateLink';
import { observer } from 'mobx-react';

interface HeaderLinksProps  {
  isLoggedIn: boolean;
  showMenu?: boolean;
  closeMenu?: () => void;
}

const HeaderLinks: React.FC<HeaderLinksProps> = (props) => {
  return (
    <div className={`header-links ${props.showMenu ? 'header-links-active' : ''}`}>
      <NavigationLink
        clicked={props.closeMenu} route={routes.dialect}/>
      <PrivateLink
        activeClassName="router-link-active"
        className="router-link"
        displayText={routes.privateDialects.displayName}
        clicked={props.closeMenu}
        route={routes.privateDialects.path}/>
      <NavigationLink
        clicked={props.closeMenu}
        route={props.isLoggedIn ? routes.user : routes.login}/>
    </div>
  );
};

export default observer(HeaderLinks);
