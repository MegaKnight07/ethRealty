import { ethers } from 'ethers';
import { HOLESKY_NETWORK } from './config';

export async function connectWallet() {
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Check if the network is Holesky
      const { chainId } = await provider.getNetwork();
      if (chainId !== parseInt(HOLESKY_NETWORK.chainId, 16)) {
        await switchToHolesky();
      }

      return provider;
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  } else {
    alert('MetaMask is not installed!');
  }
}

async function switchToHolesky() {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [HOLESKY_NETWORK]
    });
  } catch (error) {
    console.error('Error switching network:', error);
  }
}
