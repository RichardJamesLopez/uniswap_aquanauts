import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { fetchData } from '../../actions';
import { connectMetamask } from './ConnectMeta.js';
import './WalletConnection.css';

class WalletConnection extends Component {
  componentDidMount() {
    fetchData();
  }

  render() {
    return (
      <div className="wallet">
        <Button onClick={connectMetamask}>
        Connect Your Wallet Here
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ api }) => ({
  api,
});

export default connect(mapStateToProps, { fetchData })(WalletConnection);
