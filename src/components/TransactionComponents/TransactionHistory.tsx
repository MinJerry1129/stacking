import React, { useEffect, useState } from 'react';
import TransactionTable from './TransactionTable';
import Load from '../GeneralComponents/Load';
import { useWeb3React } from '@web3-react/core';
import { CsvDataService } from './csv-data';

import "./style.css";

let io = require('socket.io-client')
const BASE_URL = 'wss://api-v4.zerion.io/';

function TransactionHistory() {
  const [searchvalue, setSearchValue] = useState("");
  const [transactionsoffset, setTransactionOffSet] = useState(0)
  const [transactionlist, setTransactionList] : any = useState([]);
  const [transactionfilterlist, setTransactionFilterList] : any = useState([]);
  const [isBalLoading, setIsBalLoading] = useState(true);
  const [isMoreLoading, setIsMoreLoading] = useState(false);
  const [isFLoading, setIsFLoading] = useState(false);
  const [isMore, setIsMore] = useState(true);
  const { account} = useWeb3React();

  useEffect(() => {
    async function getTransaction() {
      try {
        if(account){
          setIsBalLoading(true);
          setTransactionOffSet(0);
          setTransactionList([]);
          setTransactionFilterList([]);
          const change_status = !isFLoading
          setIsFLoading(change_status);
        }
      } catch (err) {
        return 0
      }
    }
    getTransaction();
  }, [account]);

  useEffect(() => {
    async function getTransaction() {
      try {
        if(account){          
          getTransactionlist(0)
        }
      } catch (err) {
        return 0
      }
    }
    getTransaction();
  }, [isFLoading]);


  function verify(request : any, response : any) {
    // each value in request payload must be found in response meta
    return Object.keys(request.payload).every(key => { 
      const requestValue = request.payload[key];
      const responseMetaValue = response.meta[key];
      if (typeof requestValue === 'object') {
        return JSON.stringify(requestValue) === JSON.stringify(responseMetaValue);
      }
      return responseMetaValue === requestValue;
    });
  }
  
  const addressSocket = {
    namespace: 'address',
    socket: io(`${BASE_URL}address`, {
      transports: ['websocket'],
      timeout: 60000,
      query: {
        api_token:
          'Demo.ukEVQp6L5vfgxcz4sBke7XvS873GMYHy',
      },
    }),
  };
  
  function get(socketNamespace : any, requestBody : any) {
    return new Promise(resolve => {
      const { socket, namespace } = socketNamespace;
      function handleReceive(data: any) {
        console.log(data);
        setIsBalLoading(false);
        onSetTransactionlist(data["payload"]["transactions"])
        
        if (verify(requestBody, data)) {
          unsubscribe();
          resolve(data);
        }
      }
      const model = requestBody.scope[0];
      function unsubscribe() {
        socket.off(`received ${namespace} ${model}`, handleReceive);
        socket.emit('unsubscribe', requestBody);
      }
      socket.emit('get', requestBody);
      socket.on(`received ${namespace} ${model}`, handleReceive);
    });
  }


  const getTransactionlist = (offset:Number) =>{
    get(addressSocket, {
      scope: ['transactions'],
      payload: {
          address: '0x277B024b8EB3503b7BAaeEb775873BAE764095d0',
          // address: account,
          currency: 'usd',
          portfolio_fields: 'all',
          transactions_limit:50,
          transactions_offset : offset
      },
    }).then((response:any) => {
      console.log(response.payload.transactions);
    });
  }

  const showmore = () =>{
    const offset = transactionsoffset + 50;
    setTransactionOffSet(offset)
    getTransactionlist(offset)
    setIsMoreLoading(true)
  }

  const onSetTransactionlist = (data:any) =>{
    const tran_list = [
      data.map((res : any) => ({        
        from : res["address_from"],
        to : res["address_to"],
        blockNumber : res["blockNumber"],
        changes : res["changes"],
        meta : res["meta"],
        fee: res["fee"],
        hash: res["hash"],
        timeStamp : res["mined_at"],
        status : res["status"],
        type: res["type"],
    }))
  ];

  const all_list: any[] = transactionlist;
  tran_list[0].map((res : any) =>{
    all_list.push(res);
  });
  console.log(all_list);
  setTransactionList(all_list);
  onChangeSearchValue(searchvalue, all_list);
  // setTransactionFilterList(all_list);
  if(data.length == 0 || data.length < 10){
    setIsMore(false)
  }
  setIsMoreLoading(false);
  }

  const onChangeSearchValue = (newValue : any , list:any) =>{
    setSearchValue(newValue);
    let searchStr = newValue;
    const filter_list: any[] = [];
    list.sort((a: { [x: string]: number; },b: { [x: string]: number; }) => b["timeStamp"] - a["timeStamp"])
    list.map((res : any) =>{
      if(res["from"].toLowerCase().includes(searchStr.toLowerCase())){
        filter_list.push(res);
      }else if(res["to"].toLowerCase().includes(searchStr.toLowerCase())){
        filter_list.push(res);
      }else if(res["meta"]["spender"] && res["meta"]["spender"].toLowerCase().includes(searchStr.toLowerCase())){
        filter_list.push(res);
      }else if(res["changes"][0] && res["changes"][0]["asset"]["symbol"].toLowerCase().includes(searchStr.toLowerCase())){
        filter_list.push(res);
      }else if(res["meta"]["asset"] && res["meta"]["asset"]["name"].toLowerCase().includes(searchStr.toLowerCase())){
        filter_list.push(res);
      }else{
        let type = "Approval";
        if(res["type"] == "authorize"){
          type = "Approval";
        }else if(res["type"] == "execution"){
          type = "Contract Execution";
        }else if(res["type"] == "receive"){
          type = "Receive";
        }else if(res["type"] == "send"){
          type = "Send";
        }else if(res["type"] == "trade"){
          type = "Trade";
        }
        if(type.toLowerCase().includes(searchStr.toLowerCase())){
          filter_list.push(res);
        }

      }
    });
    setTransactionFilterList(filter_list);
  };
  const onCloseSearch = () =>{
    setSearchValue("");
    setTransactionFilterList(transactionlist);
  };

  const onDownloadCSV = () => {
    makeDownloadData();
  };
  const makeDownloadData=()=>{
    const filter_list :any = []
    transactionfilterlist.map((row : any) => {
      let tranDate = onChangeTimeStampToDateCompare(row["timeStamp"]);
      let tranTime = onChangeTimeStampToTime(row["timeStamp"]);
      let TranType = onGetTranType(row["type"])
      let TranStatus = onGetTranStatus(row["status"]);
      let TranAtype = onGetTranAType(row["type"]);
      let TranAmount = onGetTranAmount(row);
      let TranCurrency = onGetTranCurrency(row);
      let TranCAddress = onGetTranCAddress(row);
      let TranFiatAmount = onGetTranFiatAmount(row);
      let TranFiatCurrency = onGetTranFiatCurrency(row);
      let TranSellAmount = onGetSellAmount(row);
      let TranSellCurrency = onGetSellCurrency(row);
      let TranSellAddress = onGetSellAddress(row);
      let TranSellFiatAmount = onGetSellFiatAmount(row);
      let TranSellFiatCurrency = onGetSellFiatCurrency(row);
      let TranFeeAmount = onGetFeeAmount(row);
      let TranFeeCurrency = onGetFeeCurrency(row);
      let TranFeeFiatAmount = onGetFeeFiatAmount(row);
      let TranFeeFiatCurrency = onGetFeeFiatCurrency(row);
      let TranFrom = row["from"];
      let TranTo = row["to"];
      let TranHash = row["hash"];
      let TranHashLink = `https://etherscan.io/tx/${row["hash"]}`;
      let row_data = {
        Date : tranDate,
        Time : tranTime,
        'Transaction Type' : TranType,
        Status : TranStatus,
        Application : '',
        'Accounting Type' : TranAtype,
        'Buy Amount' : TranAmount,
        'Buy Currency' : TranCurrency,
        'Buy Currency Address' : TranCAddress,
        'Buy Fiat Amount' : TranFiatAmount,
        'Buy Fiat Currency' : TranFiatCurrency,
        'Sell Amount' : TranSellAmount,
        'Sell Currency' : TranSellCurrency,
        'Sell Currency Address' : TranSellAddress,
        'Sell Fiat Amount' : TranSellFiatAmount,
        'Sell Fiat Currency' : TranSellFiatCurrency,
        'Fee Amount' : TranFeeAmount,
        'Fee Currency' : TranFeeCurrency,
        'Fee Fiat Amount' : TranFeeFiatAmount,
        'Fee Fiat Currency' : TranFeeFiatCurrency,
        Sender : TranFrom,
        Receiver : TranTo,
        'Tx Hash' : TranHash,
        Link : TranHashLink
      };
      filter_list.push(row_data);
    });
    CsvDataService.exportToCsv('Transaction.csv', filter_list);
  }
  const onGetFeeFiatCurrency = (row:any) =>{
    if(row["fee"] != null){
      return "USD";       
    }else{
      return "";
    }
  }
  const onGetFeeFiatAmount = (row:any) =>{
    if(row["fee"] != null){
      return parseFloat((parseFloat(row["fee"]["value"])*parseFloat(row["fee"]["price"])/1000000000000000000).toFixed(2));       
    }else{
      return "";
    }
  }
  const onGetFeeCurrency = (row:any) =>{
    if(row["fee"] != null){
      return "ETH";       
    }else{
      return "";
    }
  }
  const onGetFeeAmount = (row:any) =>{
    if(row["fee"] != null){
      return parseFloat((row["fee"]["value"]/1000000000000000000).toFixed(4));       
    }else{
      return "";
    }
  }
  const onGetSellFiatCurrency = (row:any) =>{
    if(row["type"] == "send"){
      return "USD";       
    }else{
      return "";
    }
  }
  const onGetSellFiatAmount = (row:any) =>{
    if(row["type"] == "send"){
      return parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/1000000000000000000).toFixed(2));       
    }else{
      return "";
    }
  }
  const onGetSellAddress = (row:any) =>{
    if(row["type"] == "send"){
      if(row["changes"][0]["asset"]["symbol"] == "ETH"){
        return row["to"];
      }else{
        return "";
      }      
    }else{
      return "";
    }
  }
  const onGetSellCurrency = (row:any) =>{
    if(row["type"] == "send"){
      return row["changes"][0]["asset"]["symbol"];
    }else{
      return "";
    }
  }
  const onGetSellAmount = (row:any) =>{
    if(row["type"] == "send"){
      return parseFloat((parseFloat(row["changes"][0]["value"])/1000000000000000000).toFixed(3));
    }else{
      return "";
    }
  }
  const onGetTranFiatCurrency = (row:any) =>{
    if(row["type"] == "receive"){
      return "USD";       
    }else{
      return "";
    }
  }
  const onGetTranFiatAmount = (row:any) =>{
    if(row["type"] == "receive"){
      return parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/1000000000000000000).toFixed(2));       
    }else{
      return "";
    }
  }
  const onGetTranCAddress = (row:any) =>{
    if(row["type"] == "receive"){
      if(row["changes"][0]["asset"]["symbol"] == "ETH"){
        return row["to"];
      }else{
        return "";
      }      
    }else{
      return "";
    }
  }
  const onGetTranCurrency = (row:any) =>{
    if(row["type"] == "receive"){
      return row["changes"][0]["asset"]["symbol"];
    }else{
      return "";
    }
  }
  const onGetTranAmount = (row:any) =>{
    if(row["type"] == "receive"){
      return parseFloat((parseFloat(row["changes"][0]["value"])/1000000000000000000).toFixed(3));
    }else{
      return "";
    }
  }
  const onGetTranAType = (tranAtype:String) =>{
    if(tranAtype == "receive"){
      return "Income";
    }else{
      return "Spend";
    }
  }
  const onGetTranStatus = (transtatus:String) =>{
    if(transtatus == "failed"){
      return "Failed";
    }else{
      return "Confirmed";
    }
  }
  const onGetTranType = (type:String) =>{
    if(type == "authorize"){
      return "Approval";
    }else if(type == "execution"){
      return "Contract Execution";
    }else if(type == "receive"){
      return "Receive";
    }else if(type == "send"){
      return "Send";
    }else if(type == "trade"){
      return "Trade";
    }else{
      return "Approval";
    }
  }

  const onChangeTimeStampToTime = (timeStamp:String) =>{
    const d = new Date(Number(timeStamp)*1000);
    var hours = "0" + d.getHours();
    var minutes = "0" + d.getMinutes();
    return hours.substr(-2)+":"+minutes.substr(-2);
  }
  const onChangeTimeStampToDateCompare = (timeStamp:String) =>{
    const d = new Date(Number(timeStamp)*1000);
    let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit'}).format(d)
    return date;
  }


  const html = (
    <>
    {
      isBalLoading ? <Load loaded={true} />
      :
      <>
        <div className='page-content'>
          <div className='page-head-content'>
            <div className='page-search'>
              <div className='page-search-component'>
                <span className="fa fa-search icon" />
                <input className="field-input" value={searchvalue} type="text" onChange={(newValue) => onChangeSearchValue(newValue.target.value, transactionlist) } placeholder="Filter by Address, Protocol, Asset, Type"/>
                {searchvalue != "" &&
                  <span onClick={onCloseSearch} className="fa fa-close icon" />
                }
              </div>
            </div>
            <a><div onClick={onDownloadCSV} className='page-download'>
              Download CSV
            </div></a>
          </div>
          <div className='page-table-content'>
            <TransactionTable transactionlist = {transactionfilterlist} accountaddress = {account} />
          </div>
        </div>
        
        {isMore &&
        <div className='show_more'>
          {isMoreLoading?
            <div className="more_loading-page">
              <div className="more_lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>              
            </div>
            :
            <div onClick={showmore} className='page-download'>
              Show More
            </div>
          }          
        </div>
        }
        
      </>
    }      
    </>)

  return html;
}

export default TransactionHistory;