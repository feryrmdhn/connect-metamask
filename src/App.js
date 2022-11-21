import { useEffect, useMemo, useState } from "react";
import { providers } from "ethers";
import './App.css';
import Web3 from "web3";

function App() {
  const [isWalletInstalled, setIsWalletInstalled] = useState(false);

  // state for tracking account.
  const [account, setAccount] = useState(null);

  // state for tracking network.
  const [defaultNetwork, setDefaultNetwork] = useState('')
  const [network, setNetwork] = useState('')

  //list id network
  const memoize = useMemo(() => {
    return {
      1: "Eth Mainnet",
      4: "Eth Rinkeby",
      5: "Eth Goerli",
      97: "Binance (BNB) Testnet"
    }
  }, [])

  useEffect(() => {
    if (window.ethereum) {
      setIsWalletInstalled(true);
      setDefaultNetwork(memoize[window.ethereum.networkVersion])
    }
  }, [memoize]);

  useEffect(() => {
    window.addEventListener("load", function () {
      if (window.ethereum) {
        App.web3 = new Web3(window.ethereum);
        window.ethereum.enable(); // get permission to access accounts

        // detect Network account change
        window.ethereum.on('networkChanged', function (networkId) {
          setNetwork(memoize[networkId])
        });
      }
    });
  }, [memoize])


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

  // condition if wallet (Metamask extension) havn't installed
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
      <p>Default Network : {defaultNetwork}</p>
      <p>Change Network to : {network}</p>
    </div>
  );
}

export default App;
