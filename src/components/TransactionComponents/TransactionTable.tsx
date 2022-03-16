import Feed from './TransactionTableFeed';
import {Paper, TableContainer, Table , TableBody} from '@mui/material';

import "./style.css";

function TransactionTable(props: any) {
  const transaction_list = props.transactionlist
  const accountaddress = props.accountaddress

  const html = (
    <div>
      <div className='page_content'>
        <TableContainer component={Paper}>
          <Table className="table-striped table-dark collapse-table" aria-label="collapsible table" size="small">
            <TableBody className='th_height_font'>
              {transaction_list
                .map((row: any, i: any) => (
                  <Feed key={i} row={row} address={accountaddress} index={i} totallist= {transaction_list}/>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </div>)

  return html;
}

export default TransactionTable;