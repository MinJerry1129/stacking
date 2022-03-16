import React, { useState, useEffect } from 'react';
import ModalConnect from './GeneralComponents/ModalConnect';
import Sidebar from './GeneralComponents/Sidebar';
import TopNav from './GeneralComponents/TopNav';
import Load from './GeneralComponents/Load';
import { useWeb3React } from '@web3-react/core';
import FarmsTable from './FarmsComponents/FarmsTable';
import { farmsContainer } from '../constants/farms';
import { useToasts } from 'react-toast-notifications';
import { Infura_API, farm_backend_url } from '../constants';
import axios from 'axios';

function Farm(props: any) {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [farms, setFarms]: any = useState([]);
  const { active, library } = useWeb3React();
  const { addToast } = useToasts();

  async function FormatOneInchFarms(data: any, provider: any = null) {
    try {
      const response = await axios.get(farm_backend_url);
      if (response.data) {
        setFarms(response.data);
        setIsLoading(false);
        addToast("Loaded 1Inch Farms", {
          appearance: "success",
          autoDismiss: true,
        });
      }
    } catch (error) {
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  function loadData() {
    if (active && library) {
      if (farmsContainer[1]) {
        FormatOneInchFarms(farmsContainer[1]['1inch']);
      }
    } else {
      if (farmsContainer[1]) {
        FormatOneInchFarms(farmsContainer[1]['1inch'], Infura_API);
      }
    }
  }

  const html = (
    <div id="page-content-wrapper">
      <TopNav show={[show, setShow]} />
      <div className="right-side">
        <div className="container-fluid">
          <div className="row mt-4">
            <h1>Farm</h1>
            <p>Description text here</p>
          </div>
          {
            isLoading ? <Load loaded={true} />
            :
            <React.Fragment>
              <div className="row mt-4">
                <div className="col-md-12">
                  <div className="card box-2">
                    <div className="card-header">
                      <h5>Trending Farms</h5>
                    </div>
                    <div className="card-body">
                      <div className="table-responsive">
                        <FarmsTable availableSearch={false} sort={true} rows={farms.sort((a:any, b:any) => b.liquidity - a.liquidity).slice(0, 10)} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row my-4">
                <div className="col-md-12">
                  <div className="card box-2">
                    <div className="card-header">
                      <h5>All Farms</h5>
                      <FarmsTable availableSearch={true} rows={farms} />
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
              <a href="" className="text-white"><small>Terms &amp; Condition</small></a> | <a href="" className="text-white"><small>Privacy Policy</small></a>
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

export default Farm;