import { useState, MouseEvent} from 'react';
import { IconButton  } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { useToasts } from 'react-toast-notifications';
import {approve_ico, execute_ico, receive_ico, send_ico, trade_ico, avatar_ico} from '../../constants'
import "./style.css";

function TransactionTableFeed(props : any) {
  const { row , index , totallist } = props;
  const [isExtra, setIsExtra] = useState(false);
  const { addToast } = useToasts();

  const onChangeTimeStampToTime = (timeStamp:String) =>{
    const d = new Date(Number(timeStamp)*1000);
    var hours = "0" + d.getHours();
    var minutes = "0" + d.getMinutes();
    return hours.substr(-2)+":"+minutes.substr(-2);
  }
  const onChangeTimeStampToDateCompare = (timeStamp:String) =>{
    const d = new Date(Number(timeStamp)*1000);
    var year = d.getFullYear();
    var months = d.getMonth();
    var days = d.getDay();
    return year+" "+months+" "+days;
  }
  const onChangeTimeStampToDate = (timeStamp:String) =>{
    const d = new Date(Number(timeStamp)*1000);    
    return d.toDateString();
  }

  const onClickExtra=(event : MouseEvent)=>{
    const status = !isExtra;
    setIsExtra(status);
  }
  const onCopyHash=()=>{
    const elem = document.createElement('textarea');
    elem.value = row["hash"];
    document.body.appendChild(elem);
    elem.select();
    document.execCommand('copy');
    document.body.removeChild(elem);
    addToast('Hash address copied', {
      appearance: 'success',
      autoDismiss: true,
    })
  }

  const html = (
    <>
    {index === 0 || onChangeTimeStampToDateCompare(totallist[index-1]["timeStamp"]) !== onChangeTimeStampToDateCompare(row["timeStamp"])  ?
      <div className='date_row'>{onChangeTimeStampToDate(row["timeStamp"])}</div>:
      <></>
    }
    <div className={isExtra?`table_body_extra`:``}>
      <div className='table_row' onClick={onClickExtra}>
        <div className='first_col'>
          {row["type"] === "authorize" && <img className = "img_icon" src={approve_ico} alt=""/>}
          {row["type"] === "execution" && <img className = "img_icon" src={execute_ico} alt=""/>}
          {row["type"] === "receive" && <img className = "img_icon" src={receive_ico} alt=""/>}
          {row["type"] === "send" && <img className = "img_icon" src={send_ico} alt=""/>}
          {row["type"] === "trade" && <img className = "img_icon" src={trade_ico} alt=""/>}
          {row["type"] === "deployment" && <img className = "img_icon" src={execute_ico} alt=""/>}
          {row["type"] === "unstake" && <img className = "img_icon" src={receive_ico} alt=""/>}
          {row["type"] === "stake" && <img className = "img_icon" src={send_ico} alt=""/>}

          <div className='first_col_detail'>
            {row["type"] === "authorize" && <div className='first_col_type'>Approval</div>}
            {row["type"] === "execution" && <div className='first_col_type'>Contract Execution</div>}
            {row["type"] === "receive" && <div className='first_col_type'>Receive</div>}
            {row["type"] === "send" && <div className='first_col_type'>Send</div>}
            {row["type"] === "trade" && <div className='first_col_type'>Trade</div>}
            {row["type"] === "deployment" && <div className='first_col_type'>Contract Deployment</div>}
            {row["type"] === "unstake" && <div className='first_col_type'>Unstake</div>}
            {row["type"] === "stake" && <div className='first_col_type'>Stake</div>}
            <div className='first_col_date'>{onChangeTimeStampToTime(row["timeStamp"])}</div>            
          </div>
          {row["status"] === "failed" &&
            <div className='fail_row'>
              failed
            </div>
          }
        </div>
        <div className='content_second_col'>
          {row["type"] === "authorize" &&
            <div className='second_col'>
              {row["meta"]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["meta"]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }
              <div className='second_col_detail'>
                <div className='second_col_value'>{row["meta"]["asset"]["name"]}</div>
              </div>
            </div>
          }
          {row["type"] === "receive" &&
            <div className='second_col'>
              {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
              <div className='second_col_detail'>
                <div className='second_col_value receive_color'>+{parseFloat((parseFloat(row["changes"][0]["value"])/ Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][0]["asset"]["symbol"]}</div>
                <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
              </div>
            </div>
          }
          {row["type"] === "send" &&
            <div className='second_col'>
                {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
              <div className='second_col_detail'>
                <div className='second_col_value'>-{parseFloat((parseFloat(row["changes"][0]["value"])/ Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][0]["asset"]["symbol"]}</div>
                <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
              </div>
            </div>
          }
          {row["type"] === "deployment" && row["changes"].length>0 &&
            <div className='second_col'>
                {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
              <div className='second_col_detail'>
                <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][0]["value"])/ Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][0]["asset"]["symbol"]}</div>
                <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
              </div>
            </div>
          }
          {row["type"] === "trade" &&
            <div className="trad_second_col">
              <div className='trade_one'>
                {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }     
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][0]["value"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][0]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              <img className = "img_trade" src='./assets/img/trade.png' alt=""/> 
              <div className='trade_one'>
                {row["changes"][1]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][1]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][1]["value"])/Math.pow(10, Number(row["changes"][1]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][1]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][1]["value"])*parseFloat(row["changes"][1]["price"])/Math.pow(10, Number(row["changes"][1]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              {row["changes"][2] &&
              <div className='trade_one'>
                {row["changes"][2]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][2]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][2]["value"])/Math.pow(10, Number(row["changes"][2]["asset"]["decimals"]))).toFixed(3))}  {row["changes"][2]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][2]["value"])*parseFloat(row["changes"][2]["price"])/Math.pow(10, Number(row["changes"][2]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              }
            </div>            
          }

          {row["type"] == "unstake" && row["changes"][0] &&
            <div className="trad_second_col">
              <div className='trade_one'>
                {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][0]["value"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(8))}  {row["changes"][0]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              {row["changes"][1] &&
              <div className='trade_one'>
                {row["changes"][1]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][1]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }      
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][1]["value"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(8))}  {row["changes"][1]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][1]["value"])*parseFloat(row["changes"][1]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              }              
            </div>            
          }
          {row["type"] == "stake" && row["changes"][0] &&
            <div className="trad_second_col">
              <div className='trade_one'>
                {row["changes"][0]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][0]["asset"]["icon_url"]} />
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }
                     
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][0]["value"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(8))}  {row["changes"][0]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][0]["value"])*parseFloat(row["changes"][0]["price"])/Math.pow(10, Number(row["changes"][0]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              {row["changes"][1] &&
                <img className = "img_trade" src='./assets/img/trade.png' alt=""/> }
              {row["changes"][1] &&
              <div className='trade_one'>
                {row["changes"][1]["asset"]["icon_url"] ?
                  <img className = "img_network" src={row["changes"][1]["asset"]["icon_url"]} alt=""/>
                  :
                  <img className = "img_network" src='./assets/img/uncoin.png' alt=""/>
                }
                <div className='second_col_detail'>
                  <div className='second_col_value'>{parseFloat((parseFloat(row["changes"][1]["value"])/Math.pow(10, Number(row["changes"][1]["asset"]["decimals"]))).toFixed(8))}  {row["changes"][1]["asset"]["symbol"]}</div>
                  <div className='second_col_price'>${parseFloat((parseFloat(row["changes"][1]["value"])*parseFloat(row["changes"][1]["price"])/Math.pow(10, Number(row["changes"][1]["asset"]["decimals"]))).toFixed(2))}</div>
                </div>
              </div>
              }              
            </div>            
          }

        <div className='third_col'>
          {row["type"] === "authorize" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>Application</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["meta"]["spender"].split("",6).join("")}...{row["meta"]["spender"].split("").reverse().join("").split("",4).reverse().join("")}
              </div>
            </div>
          }
          {row["type"] === "execution" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>Application</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["to"].split("",6).join("")}...{row["to"].split("").reverse().join("").split("",4).reverse().join("")}
                </div>
            </div>
          }
          {row["type"] === "receive" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>From</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["changes"][0]["address_from"].split("",6).join("")}...{row["changes"][0]["address_from"].split("").reverse().join("").split("",4).reverse().join("")}</div>
            </div>
          }
          {row["type"] === "send" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>To</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["changes"][0]["address_to"].split("",6).join("")}...{row["changes"][0]["address_to"].split("").reverse().join("").split("",4).reverse().join("")}
              </div>
            </div>
          }
          {row["type"] === "trade" &&
            <div className='third_col_detail'>
            </div>
          }

          {row["type"] === "unstake" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>To</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["meta"] && row["meta"]["application"] ?
                  row["meta"]["application"] :
                  `${row["to"].split("",6).join("")} ... ${row["to"].split("").reverse().join("").split("",4).reverse().join("")}`
                }
              </div>
            </div>
          }

          {row["type"] === "stake" &&
            <div className='third_col_detail'>
              <div className='third_col_status'>To</div>
              <div className='third_col_address'>
                <img className='address_icon' src={avatar_ico} alt=""/>
                {row["meta"] && row["meta"]["application"] ?
                  row["meta"]["application"] :
                  `${row["to"].split("",6).join("")} ... ${row["to"].split("").reverse().join("").split("",4).reverse().join("")}`
                }
              </div>
            </div>
          }
          
 	        </div>
        </div>
        
      </div>
      {isExtra &&
        <div className='table_extra'>
          <div className='fee_row' onClick={onClickExtra}>
            <div className='fee_title'>
              Fee
            </div>
            <div className='fee_value'>
              {row["fee"] !== null ?
                <>
                  {parseFloat((row["fee"]["value"]/1000000000000000000).toFixed(4))} ETH (${parseFloat((parseFloat(row["fee"]["value"])*parseFloat(row["fee"]["price"])/1000000000000000000).toFixed(2))}) 
                </>:
                <>
                  N/A
                </>
              }
            </div>
          </div>
          {row["type"] === "trade" &&
            <div className='rate_row' onClick={onClickExtra}>
              <div className='rate_title'>
                Rate
              </div>
              <div className='rate_value'>
                1 {row["changes"][0]["asset"]["symbol"]} = {parseFloat((row["changes"][0]["price"]/row["changes"][1]["price"]).toFixed(3))} {row["changes"][1]["asset"]["symbol"]}
              </div>
            </div>
          }
          <div className='trans_row'>
            <div className='trans_title' onClick={onClickExtra}> 
              Transaction hash
            </div>
            <div className='trans_value'>
            {row["hash"].split("",6).join("")}...{row["hash"].split("").reverse().join("").split("",4).reverse().join("")}
            <IconButton onClick={onCopyHash} size="small" value = {row["hash"]} className="copy_board" ><ContentCopyOutlinedIcon fontSize="small"/></IconButton>
            <a href={`https://etherscan.io/tx/${row["hash"]}`} target='blank'><IconButton  size="small" ><LaunchRoundedIcon fontSize="small"/></IconButton></a>
            </div>
          </div>
          <div className='empty_row' onClick={onClickExtra}>
          </div>
        </div>
      }
    </div>
    </>
    )

  return html;
}

export default TransactionTableFeed;