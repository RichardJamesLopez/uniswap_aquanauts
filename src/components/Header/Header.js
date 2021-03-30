import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Toolbar } from '@material-ui/core';
import WalletConnection from '../WalletConnection';
import './Header.css';

const Header = () => {
  return (
    <div className="headerWrapper">
      <div className="header-title">
        <AppBar position="relative">
          <Toolbar>
            <Typography variant="h5">
              <Link to="/">Uniswap Aquanauts</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <WalletConnection />
    </div>
  );
};

export default Header;
