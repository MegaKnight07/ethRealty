import logo from "../ethRealty Logo3.png";

const Navigation = ({ account, setAccount, handleDarkModeToggle, darkMode }) => {
  const connectHandler = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    setAccount(accounts[0]);
  };

  return (
    <nav>
      <ul className='nav__links'>
        <li><a href='#'>Buy</a></li>
        <li><a href='#'>Rent</a></li>
        <li><a href='#'>Sell</a></li>
      </ul>

      <div className='nav__brand'>
        <img src={logo} alt="Logo" />
        <h1>ETH Realty</h1>
      </div>

      {account ? (
        <button type='button' className='nav__connect'>
          {account.slice(0, 6) + '...' + account.slice(38, 42)}
        </button>
      ) : (
        <button type='button' className='nav__connect' onClick={connectHandler}>
          Connect
        </button>
      )}

      {/* Dark Mode Toggle with Sun and Moon Icons */}
      <div className="">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={handleDarkModeToggle} />
          <span className="slider round">
            <span className="sun-icon"></span>
            <span className="moon-icon"></span>
          </span>
        </label>
      </div>
    </nav>
  );
};

export default Navigation;
