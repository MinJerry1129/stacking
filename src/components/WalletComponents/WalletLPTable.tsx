import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Rows from '../GeneralComponents/Rows';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './style.css'

const MLButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: "#207b69",
  '&:hover': {
    backgroundColor: '#207b69',
  },
}));

function WalletLPTable(props: any) {
  const { rows, farms } = props;
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<any>("asc");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [protocol, setProtocol] = React.useState('all');
  const [showPool, setShowPool] = useState(true);
  const [totalTokens, setTotalTokens] = useState(0);
  const [totlaPrices, setTotalPrices] = useState(0);

  const handleChange = (event: SelectChangeEvent) => {
    setProtocol(event.target.value as string);
    const filteredFarm: any = [];
    if (event.target.value === 'eth') {
      rows.map((item: any) => {
        let pairName = item.protocol.toLowerCase();
        if (pairName === "ether") {
          filteredFarm.push(item);
        }
      })
      setFilteredData(filteredFarm)
    } else if (event.target.value === 'polygon') {
      rows.map((item: any) => {
        let pairName = item.protocol.toLowerCase();
        if (pairName === "polygon") {
          filteredFarm.push(item);
        }
      })
      setFilteredData(filteredFarm)
    }
    else {
      setFilteredData(rows)
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    console.log(showPool)
    if (showPool) {
      if (filterValue === "") {
        let totalprice = 0;
        rows.map((row: any) => {
          totalprice = totalprice + row.amount;
        })
        setFilteredData(rows)
        setTotalTokens(rows.length);
        setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
      }
    } else {
      if (filterValue === "") {
        setFilteredData(farms)
      }
    }
  }, [props, showPool]);

  useEffect(() => {
    if (showPool) {
      if (filterValue !== "") {
        let totalprice = 0;
        const filteredFarm: any = [];
        rows.map((item: any) => {
          let pairName = item.pair.toLowerCase();
          if (pairName.includes(filterValue.toLowerCase())) {
            filteredFarm.push(item);
            totalprice = totalprice + item.amount;
          }
        })

        setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
        setTotalTokens(filteredFarm.length);
        setFilteredData(filteredFarm)
      } else {
        let totalprice = 0;
        rows.map((row: any) => {
          totalprice = totalprice + row.amount
        })
        setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
        setFilteredData(rows)
        setTotalTokens(rows.length);
      }
    }
    else {
      if (filterValue !== "") {
        const filteredFarm: any = [];
        let totalprice = 0;
        farms.map((item: any) => {
          let pairName = item.pair.toLowerCase();
          if (pairName.includes(filterValue.toLowerCase())) {
            filteredFarm.push(item);
            totalprice = totalprice + item.amount;
          }
        })
        setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
        setFilteredData(filteredFarm)
        setTotalTokens(filteredFarm.length);
      } else {
        let totalprice = 0;
        farms.map((row: any) => {
          totalprice = totalprice + row.amount
        })
        setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
        setFilteredData(farms)
        setTotalTokens(farms.length);
      }
    }
  }, [filterValue, showPool]);

  const sortbyProtocol = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.protocol > b.protocol) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.protocol > b.protocol) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyAssets = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.assets > b.assets) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.assets > b.assets) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyAmount = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.amount > b.amount) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.amount > b.amount) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }
  
  const sortingbyvalue = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.value > b.value) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.value > b.value) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyPair = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.pair > b.pair) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.pair > b.pair) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const sortingbyEarned = () => {
    if (sortBy === "asc") {
      filteredData.sort((a: any, b: any) => (a.earned > b.earned) ? -1 : 1);
      setFilteredData([...filteredData]);
      setSortBy("dec");
    }
    else {
      filteredData.sort((a: any, b: any) => (a.earned > b.earned) ? 1 : -1);
      setFilteredData([...filteredData]);
      setSortBy("asc");
    }
  }

  const html = (
    <>
      <div className="btn-group btn-group-flex liquidity_button_size">
        <button type="button" onClick={() => { setShowPool(true) }} className={showPool ? "btn btn-locked" : "btn btn-flexible"}>
          Liquidity Pools
        </button>
        <button type="button" onClick={() => { setShowPool(false) }} className={showPool ? "btn btn-flexible" : "btn btn-locked"} >Yield Farming</button>
      </div>
      <br />
      {props.availableSearch &&
        <TextField
          id="outlined-basic"
          style={{
            marginBottom: 15,
            borderColor: '#ffffff',
            color: '#ffffff'
          }}

          label="Filter Pair"
          variant="outlined"
          onChange={(e) => setFilterValue(e.target.value)}
          value={filterValue}
        />}
      {props.chooseFilter &&
        <Box sx={{ width: 120, color: '#000000', margin: 1 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={protocol}
              label="Age"
              onChange={handleChange}
            >
              <MenuItem value={'all'}>All</MenuItem>
              <MenuItem value={'eth'}>Ethereum</MenuItem>
              <MenuItem value={'polygon'}>Polygon</MenuItem>
            </Select>
          </FormControl>
        </Box>
      }

      <TableContainer component={Paper}>
        <Table className="table-striped table-dark collapse-table" aria-label="collapsible table" size="small">
          {showPool ?
            <>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => sortingbyPair()}  >Pair <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortbyProtocol()}> Protocol <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortingbyAssets()} >Provider<img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortingbyvalue()} >Your Value <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                </TableRow>
              </TableHead>
              <TableBody className='th_height_font'>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, i: any) => (
                    <Rows key={i} row={row} />
                  ))}
              </TableBody>
            </> :
            <>
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => sortingbyPair()} >Pair <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortbyProtocol()}>Protocol <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortingbyAssets()}>Farm <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortingbyEarned()}>Earned <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
                  <TableCell onClick={() => sortingbyAmount()} >Staked <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>

                </TableRow>
              </TableHead>
              <TableBody className='th_height_font'>
                {filteredData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, i: any) => (
                    <Rows key={i} row={row} />
                  ))}
              </TableBody>
            </>
          }
        </Table>
      </TableContainer>
      <p style={{
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#212529',
        textAlign: 'center'
      }}><span className="fa fa-coins icon" />{totalTokens} Tokens &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;   <span className="fa fa-coins icon" /> <b>Total $ {totlaPrices}</b></p>

      <div className='flexxx'>
        {showPool ?
          <MLButton href="/liquidity" variant="contained">
            More Liquidity Pools &nbsp;&nbsp; <img src="/assets/img/arrow.png" width="15px" alt="" /></MLButton>
          :
          <MLButton href="/farm" variant="contained">
            More Yield Farms &nbsp;&nbsp; <img src="/assets/img/arrow.png" width="15px" alt="" />
          </MLButton>
        }

        <TablePagination
          className="lpPagenation"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>)

  return html;
}

export default WalletLPTable;