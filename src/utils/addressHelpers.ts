import addresses from '../constants/contracts'

export const getAddress = (address: any): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID || 56
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getMasterChefAddress = () => {
  return getAddress(addresses.masterChef)
}
export const getMulticallAddress = () => {
  return getAddress(addresses.mulltiCall)
}

