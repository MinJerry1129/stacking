import { useEffect } from "react";
import { useWeb3React } from '@web3-react/core';
import { ETHER, Token } from "@uniswap/sdk";
import Web3 from "web3";
import { getCoinBalance } from "../../hooks/loadBalance";
import { BigNumber } from "@0x/utils";
import  InputDecimal from "../GeneralComponents/inputDecimal";
import { toNumber } from "lodash";

function SwapCard(props: any) {

  function openModal() {
    props.setSide(props.side);
    props.setShow(!props.show)
  }
  
  const { account, active, library, chainId } = useWeb3React();

  useEffect(() => {
    (async () => {
      let currency;
      if (props.selected && props.selected.symbol) {
        currency = new Token(props.selected.chainId, props.selected.address, props.selected.decimals, props.selected.symbol, props.selected.name);
      }
      let selectedCurrencyBalance = await getCoinBalance(
        account ?? undefined,
        active,
        library,
        props.selected && props.selected.symbol === "ETH" && props.selected.symbol ? ETHER : currency
      );
      props.onChangeBalance(selectedCurrencyBalance, props.side);
    })()

  }, [props.address, chainId, account]);

  const html = <div className={props.side === "from" ? "card card-from" : "card card-to mt-2"}  >
    <div className="card-body">
      <p className="card-title">
        <small> {props.side === "from" ? "From" : "To (estimated)"}</small>
        {active ? <small className="float-right">Balance: {(() => {
          let balance = props.balance;
          let newBalance = Web3.utils.fromWei(new BigNumber(balance).toString(), 'ether');
          return toNumber(newBalance).toFixed(5);
        })()}</small> : ""}
      </p>
      <p className="card-title mt-3 select-input-container">
        {props.selected && props.selected.symbol ? <span className="selector" onClick={openModal}>
          <img src={props.selected.logoURI} alt="" className="mb-4" /> <span className="h1"> {props.selected.symbol}</span> <i className="fa fa-chevron-down icon-left" />
        </span> : <span className="selector" onClick={openModal}>
          <span className="h1"> Select Coin</span> <i className="fa fa-chevron-down icon-left" />
        </span>}

        <InputDecimal 
          className="float-right Curr-input" 
          fontStyle={(props.rate && Number(props.val)) ? (props.rate.rate * props.val).toFixed(5).length > 8 : false}
          disabled={props.side === 'from' ? false : true} 
          val={props.side === 'from' ? props.val : (props.rate && Number(props.val)) ? (props.rate.rate * props.val).toFixed(5) : "0"} 
          updateVal={(v: any) => props.handleValue(v, props.side)} />
      </p>
      <p className="card-title">
        {props.selected ? <small>{props.selected.name}</small> : ""}
        {props.from && props.rate && props.to && props.side !== "from" ? <small className="float-right">1 {props.from.symbol} ~= {props.rate.rate} {props.to.symbol}</small> : ""}
      </p>
    </div>
    {props.side === "from" ? <div onClick={props.switchHandler} className="text-center">
      <img src="/assets/img/swap.png" alt="" className="img-fluid swap-button" />
    </div> : ""}
  </div>

  return html;
}

export default SwapCard;