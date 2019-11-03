import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from 'routes';

import './HomeView.css';

const HomeView: React.FC = () => {
  return (
    <div className="home-view">
      <h2>Velkommen til Trøndr!</h2>
      <p>Trøndr er en nettside for alle ord og uttrykk for alle Norges dialekter</p>
      <NavLink to={routes.dialect.path}>
        For å sette i gang, trykk her
      </NavLink>
    </div>
  );
};

export default HomeView;
