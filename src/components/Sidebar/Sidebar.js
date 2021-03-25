import React from 'react';
import { Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import './Sidebar.css';

const Sidebar = ({ match }) => {
  const value = 53;
  return (
    <div className="sideBarContainer">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        aria-label="Vertical tabs example"
      />
      <Link to={`${match.url}/uniswap`}>
        <Tab label="What is a Liqudity Pool?" />
      </Link>
      <Tab label="What is in your Liquidity Pool?" />
      <Tab label="What does Uniswap do for you?" />
      <Tab label="Resources" />
    </div>
  );
};

export default Sidebar;
