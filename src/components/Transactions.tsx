import React, { useEffect, useState } from 'react';
import Sidebar from './GeneralComponents/Sidebar';
import ModalConnect from './GeneralComponents/ModalConnect';
import TopNav from './GeneralComponents/TopNav';
import Load from './GeneralComponents/Load';
import TransactionHistory from './TransactionComponents/TransactionHistory';
import { useWeb3React } from '@web3-react/core';

function Transactions(props: any) {
    const [show, setShow] = useState(false);
    const [isBalLoading, setIsBalLoading] = useState(true);
    const { account} = useWeb3React();

    useEffect(() => {
        async function getBallance() {
          try {
            if(account){
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



    const html = (
        <div id="page-content-wrapper">
            <TopNav show={[show, setShow]} />
            <div className="right-side">
            <div className="container-fluid">
                <div className="row mt-4">
                    <h1>Transaction History</h1>
                    {account ?
                    <p>All your assets in an onverview  </p> :
                    <p>Please connect your wallet.  </p>}
                </div>
                {
                    isBalLoading ? <Load loaded={true} />
                    :
                    <React.Fragment>
                        <div className="row mt-4">
                            <div className="col-md-12">
                                <div className="card box-2">
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <TransactionHistory/>
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

export default Transactions;