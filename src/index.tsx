import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Web3ReactProvider} from "@web3-react/core";
import { ToastProvider} from 'react-toast-notifications';
import Web3 from 'web3';
import MetamaskProvider from './providers/MetaMaskContext';

function getLibrary(provider:any){
return new Web3(provider);
  
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetamaskProvider>
      <ToastProvider>
      <App />
      </ToastProvider>
      </MetamaskProvider>
    </Web3ReactProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
