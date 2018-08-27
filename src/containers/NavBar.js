import React from 'react';
import { Link } from 'react-router-dom';

import FONTS from '../utils/Fonts';
import NavBarWrapper from '../components/NavBarWrapper';
import NavBarList from '../components/NavBarList';

const NavBar = () => (
  <div>
    <NavBarWrapper>
      <NavBarList>
        <li>
          <Link to="/">
            <FONTS.LOGO>Meetsta</FONTS.LOGO>
          </Link>
        </li>
        <li>
          <Link to="/event">About Us</Link>
        </li>
        <li>
          <Link to="/event">FAQ</Link>
        </li>
        <li>
          <Link to="/event">Contact</Link>
        </li>
      </NavBarList>
    </NavBarWrapper>
  </div>
);

export default NavBar;
