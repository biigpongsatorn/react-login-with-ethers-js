import logo from "./logo.svg";
import { ethers } from "ethers";
import "./App.css";
import { useState } from "react";

function App() {
  const [address, setAddress] = useState("");
  const [signer, setSigner] = useState(null);
  const [sig, setSig] = useState('')
  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const connectWallet = async () => {
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    setSigner(signer);
    const address = await signer.getAddress();
    setAddress(address);
  };

  const signMessage = async () => {
    const data = await signer.signMessage("Innovat3:newuser");
    console.log({ sig: data })
    setSig(data)
  };

  const recover = async () => {
    const address = await ethers.utils.verifyMessage('Innovat3:xxx', sig)
    console.log({ address })
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={connectWallet}>Connect</button>
        {address}
        <button onClick={signMessage}>Sign</button>
        <button onClick={recover}>Recover</button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
