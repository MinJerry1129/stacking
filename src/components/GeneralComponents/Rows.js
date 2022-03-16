import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { coingetco_url} from "../../constants";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: "black",
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function Rows(props) {
  const { row } = props;
 
  return (
    <React.Fragment>
      <StyledTableRow key={row.id} sx={{ '& > *': { borderBottom: 'unset' } }}>

      { row.link?
      <>
        <TableCell component="th" scope="row">
        {row.protocol === "Ether"?<img src="/assets/icons/eth.png" width="22px" alt="" />:<img src="/assets/icons/connects/polygon.svg" alt="" width="22px" />} &nbsp; <span>{row.protocol}</span>    </TableCell>        
        <TableCell >{row.assets}</TableCell>
        <TableCell >{row.amount}</TableCell>
        <TableCell >{row.value}</TableCell>
          <TableCell><a href={coingetco_url + row.link} target="_blank"><img src="/assets/icons/coingeco.png" width="18px" alt="" /></a></TableCell>
        </>:  row.earned?
       <>
       <TableCell ><span >{row.pair}</span> {row.protocol === "Ether"?<img className='fr' src="/assets/icons/eth.png" width="18px" alt="" />:<img className='fr'  src="/assets/icons/connects/polygon.svg" width="18px" alt="" />} </TableCell>
       <TableCell >{row.protocol}</TableCell>
       <TableCell >{row.assets}</TableCell>
       <TableCell >{row.earned}</TableCell>
       <TableCell >{row.amount}</TableCell>
       </>
       :
       <>
       <TableCell ><span>{row.pair}</span> {row.protocol === "Ether"?<img className='fr' src="/assets/icons/eth.png" width="18px" alt="" />:<img  className='fr'  src="/assets/icons/connects/polygon.svg" width="18px" alt="" />} </TableCell>
       <TableCell >{row.protocol}  </TableCell>
       <TableCell >{row.assets}</TableCell>
       <TableCell >{row.amount}</TableCell>
       </>
       }
       </StyledTableRow>
       
    </React.Fragment>
  );
}

export default Rows;