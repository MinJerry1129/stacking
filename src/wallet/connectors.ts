import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { Infura_API, Polygon_rpc, bridge_url } from "../constants";

export const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42,97,137,66,1337, 250, 43114, 56, 122, 1285] })

export const walletconnect = new WalletConnectConnector({
    rpc: { 
      1: Infura_API,
      137: Polygon_rpc
    },
    supportedChainIds:[1, 137],
    bridge: bridge_url,
    qrcode: true
  })

export const walletlink = new WalletLinkConnector({
  url: Infura_API,
  appName: "Defi"
})

