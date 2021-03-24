import { ethers } from 'ethers';

async function connectMetamask() {
  await ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(ethereum);
  return provider.getSigner();
}

export { connectMetamask };
