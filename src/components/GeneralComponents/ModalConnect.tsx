import { useWeb3React } from '@web3-react/core';
import { Fragment, useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { injected, walletlink } from '../../wallet/connectors';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { Infura_API, Polygon_rpc, metamask_download_url, bridge_url } from "../../constants";

function ModalConnect({ show, setShow }: any, toCheck : any) {

  const {activate} = useWeb3React();
  const [checked, setChecked] = useState(false);
  const [isNetwork, SetNetwork] = useState(0);
  const [isWallet, SetWallet] = useState(0);
  const [isNetworkNo, SetNetworkNo] = useState(0);
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setDeviceType("Mobile");
    } else {
      setDeviceType("Desktop");
    }
  }, []);


  function handleChange(t: any) {
    let target = t.target;
    setChecked(target.checked);
  }

  async function connectInjected() {
    try {
      await activate(injected);
      setShow(false);
      SetWallet(1)
    } catch (exc) {
      console.log(exc);
    }
  }

  async function connectWalletConnect() {
    try {
      const walletconnect = new WalletConnectConnector({
        rpc: {  
          1: Infura_API,
          137: Polygon_rpc
         },
         supportedChainIds:[1, 137],
         bridge: bridge_url,
         qrcode: true,
      })
      await activate(walletconnect);
      SetWallet(2)
    } catch (exc) {
      console.log("walletConnect", exc);
    }
  }

  async function connectCoinbase() {
    try{
      await activate(walletlink);
      SetWallet(3);
    } catch (exc) {
      console.log("coinbase", exc);
    }
  }

  const setupNetwork = async (_chainId: any) => {
    const chainId = parseInt(_chainId, 10);
    const { ethereum } = window as any;

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
          },
        ],
      });
      SetNetwork(chainId)
      return true;
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error);
      return false;
    }
  };

  const html = (
    <Modal show={show} onHide={setShow} size="lg">
      <Modal.Header className="bg-black">
        <h4 className="modal-title" id="exampleModalLabel">
          Connect Wallet
        </h4>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true" onClick={() => {
            setShow(false)
          }}>×</span>
        </button>
      </Modal.Header>
      <Modal.Body className="bg-black connect-modal">
        <div>
          {
            checked ?
              <Fragment>

                <div className="mb-2"><div className="row mb-3">
                  <div className="col-md-12">
                    <h6>1. Accept <a href="#" className="text-info">Terms of Service</a> and <a href="#" className="text-info">Privacy Policy</a></h6>
                    <div className="pl-3 pt-2">
                      <input type="checkbox" onChange={handleChange} checked={checked} /> &nbsp;&nbsp;I read and accept
                    </div>
                  </div>
                </div>
                </div>

                <div className="mb-2">
                  <div className="row mb-3">
                    <h6>2. Connect Network</h6>
                    <div className="col text-center" onClick={() => {
                      setupNetwork(1)
                      SetWallet(0)
                      SetNetworkNo(1)

                    }}>
                      <div>
                        <img src="assets/icons/connects/ethereum.svg" alt="" className="protocol_style"/>
                        {
                          isNetworkNo === 1 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style" />
                        }
                      </div>
                      <p className="mt-1 font-wallet-sm">Ethereum</p>
                    </div>

                    <div className="col text-center" 
                    style={{filter: 'grayscale(100%)'}}
                    >
                      <div>
                        <img src="assets/icons/connects/bsc.svg" alt="" className="protocol_style"/>
                        {
                          isNetworkNo === 56 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                      <p className="mt-1 font-wallet-sm">Binance</p>
                    </div>

                    <div className="col text-center" onClick={() => {
                      setupNetwork(137)
                      SetWallet(0)
                      SetNetworkNo(137)
                    }}>
                      <div>
                        <img src="assets/icons/connects/polygon.svg" alt="" className="protocol_style"/>
                        {
                          isNetworkNo === 137 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                      <p className="mt-1 font-wallet-sm">Polygon</p>
                    </div>

                    <div className="col text-center" 
                    style={{filter: 'grayscale(100%)'}}
                    >
                      <div>
                        <img src="assets/icons/connects/optimism.svg" alt="" className="protocol_style"/>
                        {
                          isNetworkNo === 10 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                      <p className="mt-1 font-wallet-sm">Optimism</p>
                    </div>

                    <div className="col text-center" 
                    style={{filter: 'grayscale(100%)'}}
                    >
                      <div>
                        <img src="assets/icons/connects/arbitrum.svg" alt="" className="protocol_style"/>
                        {
                          isNetworkNo === 200 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                      <p className="mt-1 font-wallet-sm">Arbitrum</p>
                    </div>

                  </div>
                </div>

                <div className="row">
                  <h6>3. Connect Wallet</h6>
                  {deviceType !== "Mobile"  && (
                    <div onClick={() => {
                      const { ethereum } = window as any;
                      if (ethereum === undefined) {
                        window.open(metamask_download_url, '_blank');
                        return;
                      }
                      connectInjected();
                    }}  
                      className="col text-center"
                      >
                        <div>
                          <img src="assets/img/metamask.png" alt="" className="protocol_style"/>
                          {
                            isWallet === 1 &&
                              <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                          }
                        </div>
                      <p className="mt-1 font-wallet-sm">Metamask</p>
                    </div>
                  )}

                  <div onClick={() => {
                      connectWalletConnect();
                    }} 
                    className="col text-center"
                    >
                      <div>
                        <img src="assets/icons/connects/wallet-connect.svg" alt="" className="protocol_style"/>
                        {
                          isWallet === 2 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                    <p className="mt-1 font-wallet-sm">Wallet connect</p>
                  </div>

                  <div onClick={() => {
                      connectCoinbase();
                    }} 
                    className="col text-center"
                    >
                      <div>
                        <img src="assets/icons/connects/wallet-link.svg" alt="" className="protocol_style"/>
                        {
                          isWallet === 3 &&
                            <img src="assets/icons/connects/circle_done.svg" alt="" className="verified_style"/>
                        }
                      </div>
                    <p className="mt-1 font-wallet-sm">Coinbase</p>
                  </div>

                </div>
              </Fragment>
              :
              <div className="mb-2"><div className="row mb-3">
                <div className="col-md-12">
                  <h6>1. Accept <a className="text-info">Terms of Service</a> and <a className="text-info">Privacy Policy</a></h6>
                  <div className="pl-3 pt-2">
                    <input type="checkbox" onChange={handleChange} checked={checked} /> &nbsp;&nbsp;I read and accept
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </Modal.Body>
    </Modal>
  );
  return html;
}

export default ModalConnect;
