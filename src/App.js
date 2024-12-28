import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { connectWallet } from './wallet';

// Components
import Navigation from './components/Navigation';
import Search from './components/Search';
import Home from './components/Home';

// ABIs
import RealEstate from './abis/RealEstate.json';
import Escrow from './abis/Escrow.json';

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null);
  const [escrow, setEscrow] = useState(null);
  const [account, setAccount] = useState(null);
  const [homes, setHomes] = useState([]);
  const [home, setHome] = useState({});
  const [toggle, setToggle] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Function to load blockchain data
  const loadBlockchainData = async () => {
    if (!window.ethereum) {
      alert('MetaMask is not installed. Please install it to use this DApp.');
      return;
    }

    // Connect to the provider (MetaMask)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network.chainId)
    const expectedChainId = 17000; // Holesky's chain ID

    // // Check if the user is on the Holesky network
    // if (network.chainId !== expectedChainId) {
    //   try {
    //     // Request to switch network
    //     await window.ethereum.request({
    //       method: 'wallet_addEthereumChain',
    //       params: [
    //         {
    //           chainId: '0x4268', // 17000 in hexadecimal
    //           chainName: 'Holesky Testnet',
    //           rpcUrls: ['65f8c62f564843a6990ae99b2575ce8a'], // Example RPC URL for Holesky
    //           nativeCurrency: {
    //             name: 'Ether',
    //             symbol: 'ETH',
    //             decimals: 18,
    //           },
    //           blockExplorerUrls: ['<Block_Explorer_URL_if_available>'], // Optional: Add a block explorer URL
    //         },
    //       ],
    //     });
    //   } catch (error) {
    //     alert('Please switch to the Holesky testnet in MetaMask.');
    //     return;
    //   }
    // }

    // Load RealEstate contract


    // console.log(config[31337].realEstate.address);
    const realEstate = new ethers.Contract(
      config[17000].realEstate.address,
      RealEstate,
      provider
    );
    const totalSupply = await realEstate.totalSupply();
    const homes = [];

    for (let i = 1; i <= totalSupply; i++) {
      try {
        const uri = await realEstate.tokenURI(i);
        const response = await fetch(uri);
        const metadata = await response.json();
        homes.push(metadata);
      } catch (error) {
        console.error('Error fetching metadata:', error);
      }
    }

    setHomes(homes);

    // Load Escrow contract
    const escrow = new ethers.Contract(
      config[network.chainId].escrow.address,
      Escrow,
      provider
    );
    setEscrow(escrow);

    // Handle account changes
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
  };

  // Toggle popup for home details
  const togglePop = (home) => {
    setHome(home);
    setToggle(!toggle);
  };

  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div className={darkMode ? 'dark-mode' : ''}>
      <Navigation account={account} setAccount={setAccount} handleDarkModeToggle={handleDarkModeToggle} />
      <Search />
      <div className='cards__section'>
        <h3>ETH K Realty on Holesky</h3>
        <hr />
        <div className='cards'>
          {homes.map((home, index) => (
            <div className='card' key={index} onClick={() => togglePop(home)}>
              <div className='card__image'>
                <img src={home.image} alt="Home" />
              </div>
              <div className='card__info'>
                <h4>{home.attributes[0].value} ETH</h4>
                <p>
                  <strong>{home.attributes[2].value}</strong> bds |
                  <strong>{home.attributes[3].value}</strong> ba |
                  <strong>{home.attributes[4].value}</strong> sqft
                </p>
                <p>{home.address}</p>
                <a className = {` hiddenMessage ${ darkMode ? "dark": ""}`}> made with love by {`Dhruv Kankotiya (darkKnight07🦇)`} for ccbc project in SaskPolytech ❤️</a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {toggle && <Home home={home} provider={provider} account={account} escrow={escrow} togglePop={togglePop} />}
    </div>
  );
}

export default App;
