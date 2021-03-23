/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, gql } from '@apollo/client';
import { Web3ReactProvider } from '@web3-react/core';
import { client, getLibrary } from './config';
import App from './components/App/App';
import store from './store';
import './styles/index.css';

ReactDOM.render(
  <Router>
    <Web3ReactProvider getLibrary={getLibrary}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <App />
        </Provider>
      </ApolloProvider>
    </Web3ReactProvider>
  </Router>,
  document.getElementById('root'),
);
