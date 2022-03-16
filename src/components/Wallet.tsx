import React, { useEffect, useState, useMemo } from 'react';
import Sidebar from './GeneralComponents/Sidebar';
import ModalConnect from './GeneralComponents/ModalConnect';
import TopNav from './GeneralComponents/TopNav';
import Load from './GeneralComponents/Load';
import WalletTable from './WalletComponents/WalletTable';
import WalletLPTable from './WalletComponents/WalletLPTable';
import { useWeb3React } from '@web3-react/core';
import { debank} from "../constants";

function Wallet(props: any) {

  const [show, setShow] = useState(false);
  const [isBalLoading, setIsBalLoading] = useState(true);
  const [isLpLoading, setIsLpLoading] = useState(true);
  const [balance, setBalance] : any = useState([]);
  const [lpBalance, setLpBalance] : any = useState([]);
  const [farms, setFarms] :any= useState([])
  const { account} = useWeb3React();

  useEffect(() => {
    async function getBallance() {
      try {
        if(account){
        let resp: any = await fetch(debank + '/token_list?id=' + account + '&is_all=true');
        let balance: any = await resp.json();
        setBalance(balance);
        setIsBalLoading(false);
      } else {
        setIsBalLoading(true);
      }
      } catch (err) {
        return 0
      }
    }
    getBallance();
  }, [account]);


  useEffect(() => {
    async function getLpBallance() {
      try {
        if(account){
        let respo: any = await fetch(debank + '/complex_protocol_list?id=' + account);
        let lpbalance: any = await respo.json();
        setLpBalance(lpbalance);
        setIsLpLoading(false);
        }else{
          setIsLpLoading(true);
        }
      } catch (err) {
        return 0
      }
    }
    getLpBallance();
  }, [account]);
  
  
  const rows = useMemo(() => {
    const rows: any = [];
    balance.forEach((element: any, index: any) => {
      const symbole = element.symbol;

      if (element.chain === 'eth' || element.chain === 'matic') {
        const protocol = element.chain === "eth" ? "Ether" : "Polygon";
        if (!symbole.includes("LP") && !symbole.includes("-")) {
          const row: any = {};
          row.token_address = element.token_address;
          row.protocol = protocol;
          row.assets = element.symbol;
          row.amount = element.amount;
          row.value = parseInt(element.price * element.amount * 100)/100;
          row.link = element.symbol.toLowerCase();
          rows.push(row);
        }
      }
    });
    return rows;
  }, [balance]);

  const lps = useMemo(()=>{
    const lps : any = [];
    const farm : any = [];
    lpBalance.forEach((elements: any, index: any)=>{
      const protocol = elements.chain === "eth" ? "Ether" : "Polygon";
      const portfolios = elements.portfolio_item_list;
      portfolios.forEach((portfolio : any, indexx : any)=>{
        const lp :any = {}; 
        lp.assets = elements.name;
        lp.protocol = protocol;
        lp.amount = parseInt(portfolio.stats.asset_usd_value*100)/100;
        lp.link = false;  
        const item2 = portfolio.detail.supply_token_list.length === 2 ?' / '+ portfolio.detail.supply_token_list[1].symbol:"";
        lp.status = portfolio.name;
        lp.pair  = portfolio.detail.supply_token_list[0].symbol+item2;
        
        if( portfolio.name === "Liquidity Pool"){
          lps.push(lp);
        } else if (portfolio.name === "Farming"){
          const temp2 = portfolio.detail.reward_token_list.length === 2 ? portfolio.detail.reward_token_list[1].amount * portfolio.detail.reward_token_list[1].price :0;
          lp.earned = Number.parseFloat(portfolio.detail.reward_token_list[0].amount * portfolio.detail.reward_token_list[0].price + temp2).toFixed(3);
          farm.push(lp)
          }
      })
      setFarms(farm);
    });
    
    return lps;

  },[lpBalance]);

  const html = (
    <div id="page-content-wrapper">
      <TopNav show={[show, setShow]} />
      <div className="right-side">
        <div className="container-fluid">
          <div className="row mt-4">
            <h1>Wallet</h1>
            {account ?
            <p>All your assets in an onverview  </p> :
            <p>Please connect your wallet.  </p>}
          </div>
          {
            isBalLoading && isLpLoading ? <Load loaded={true} />
              :
              <React.Fragment>
                <div className="row mt-4">
                  <div className="col-md-12">
                    <div className="card box-2">
                      <div className="card-header">
                      </div>
                      <div className="card-body">
                        <div className="table-responsive box-mt-8">
                          <WalletTable availableSearch={true} chooseFilter={true} rows={rows} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row my-4">
                  <div className="col-md-12">
                    <div className="card box-2">
                      <div className="card-header">
                        <WalletLPTable availableSearch={true} chooseFilter={false} rows={lps} farms = {farms}/>
                      </div>
                      <div className="card-body">
                        <div className="table-responsive">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
          }

        </div>
        <div className="mt-5">
          <footer>
            <p className="text-center text-white">
              <a href="#" className="text-white"><small>Terms &amp; Condition</small></a> | <a href="#" className="text-white"><small>Privacy Policy</small></a>
              <br />
              <small>© 2021 ABC Token</small>
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
  return <div className="d-flex" id="wrapper">
    <Sidebar current={props.current} />
    {html}
    <ModalConnect show={show} setShow={setShow} />
  </div>;
}

export default Wallet;