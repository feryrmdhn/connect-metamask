import { useEffect, useState } from "react";
import { providers } from "ethers";
import './App.css';

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  // state for tracking account.
  const [account, setAccount] = useState(null);

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
    }
  }, []);

  // initialize provider
  const provider = new providers.Web3Provider(window.ethereum);

  const connectWallet = async () => {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((accounts) => {
        const signer = provider.getSigner()
        setAccount(accounts[0]);
        alert(`Success connected to: ${signer.provider.connection.url}`);
      })
      .catch((error) => {
        alert(error.message);
      });
  }

  // kondisi jika wallet (Metamask extension) belum terinstall
  if (account === null) {
    return <div className="App">
      {isWalletInstalled ? <button onClick={connectWallet}>Connect Wallet</button>
        :
        <p>Install Metamask wallet</p>
      }
    </div>
  };

  return (
    <div className="App">
      <p>Connected at address: {account}</p>
    </div>
  );
}

export default App;
