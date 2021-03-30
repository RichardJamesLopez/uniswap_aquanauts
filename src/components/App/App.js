/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { fetchData } from '../../actions';
import Header from '../Header';
import Home from '../Home';
import Page from '../Page';

class App extends Component {
  async componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const { api } = this.props;
    return (
      <>
        <Route
          path="/"
          render={routerProps => (
            <Header data={api} {...routerProps} />
          )}
        />
        <Route
          path="/"
          render={routerProps => <Home data={api} {...routerProps} />}
        />
      </>
    );
  }
}

const mapStateToProps = ({ api }) => {
  return { api };
};

export default connect(mapStateToProps, {
  fetchData,
})(App);


/*
        <Route
          path="/liquidity"
          render={routerProps => <Page data={api} {...routerProps} />}
        />

        <Route
          path="/uniswap"
          render={routerProps => <Page data={api} {...routerProps} />}
        />
*/
