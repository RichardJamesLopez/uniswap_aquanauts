import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ethers } from 'ethers';

const uri =
  'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2';

export const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
});

export const getLibrary = provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
};
