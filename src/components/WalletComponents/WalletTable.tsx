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
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import "./style.css";

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  marginBottom: 20,
  backgroundColor : '#207b69',

  '&:hover': {
    backgroundColor: '#0069d9',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#207b69',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  }
});

function WalletTable(props: any) {
  const { rows } = props;
  const [filterValue, setFilterValue] = useState("");
  const [sortBy, setSortBy] = useState<any>("asc");
  const [filteredData, setFilteredData] = useState<any>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [protocol, setProtocol] = React.useState('all');
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
      setTotalTokens(filteredFarm.length)
    } else if (event.target.value === 'polygon') {
      rows.map((item: any) => {
        let pairName = item.protocol.toLowerCase();
        if (pairName === "polygon") {
          filteredFarm.push(item);
        }
      })
      setFilteredData(filteredFarm)
      setTotalTokens(filteredFarm.length)
    }
    else {
      setFilteredData(rows)
      setTotalTokens(rows.length)
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
    if (filterValue === "") {
      let totalprice = 0;
      setFilteredData(rows)
      setTotalTokens(rows.length);
      rows.map((row : any) => {
        totalprice = totalprice + row.value
      })
      setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
    }
  }, [props]);

  useEffect(() => {
    if (filterValue !== "") {
      let totalprice = 0;
      const filteredFarm: any = [];
      rows.map((item: any) => {
        let pairName = item.assets.toLowerCase();
        if (pairName.includes(filterValue.toLowerCase())) {
          filteredFarm.push(item);
          totalprice = totalprice + item.value
        }
      })
      setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
      setTotalTokens(filteredFarm.length);
      setFilteredData(filteredFarm)
    } else {
      let totalprice = 0;
      rows.map((row : any) => {
        totalprice = totalprice + row.value;
      })
      setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
      setFilteredData(rows);
      setTotalTokens(rows.length);
    }
  }, [filterValue]);

  useEffect(() => {
    let totalprice = 0;
    filteredData.map((row : any) => {
      totalprice = totalprice + row.value;
    })
    setTotalPrices(Number.parseFloat(totalprice).toFixed(2));
  }, [filteredData]);

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

  const html = (
    <>
      <Stack direction="row"  spacing={2}>
        {props.availableSearch &&
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField 
              id="outlined-basic" 
              label="Filter Assets" 
              variant="outlined" 
              onChange={(e) => setFilterValue(e.target.value)}
              value={filterValue} />
          </Box>
        }
        {props.chooseFilter &&
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Protocol</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={protocol}
                  label="Protocol"
                  onChange={handleChange}
                >
                  <MenuItem value={'all'}>All</MenuItem>
                  <MenuItem value={'eth'}>Ethereum</MenuItem>
                  <MenuItem value={'polygon'}>Polygon</MenuItem>
                </Select>
            </FormControl>
          </Box>
        }
      </Stack>
      <TableContainer component={Paper}>
        <Table className="table-striped table-dark collapse-table" aria-label="collapsible table" size="small">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => sortbyProtocol()}>Protocol <img  src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyAssets()}>Assets <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyAmount()}>Amount <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell onClick={() => sortingbyvalue()} >Value <img src="/assets/icons/sort/sort1.png" width="18px" alt="" /></TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody className='th_height_font'>
            {filteredData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: any) => (
                <Rows key={i} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p style={{
          paddingTop : 10,
          paddingBottom: 10,
          backgroundColor:'#212529',
          textAlign : 'center'
        }}><span className="fa fa-coins icon" />{totalTokens} Tokens &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;   <span className="fa fa-coins icon" /><b>Total $ {totlaPrices}</b></p>
      <div className='flexxx'>
        <BootstrapButton  variant="contained"  href='/swap'>
          Swap Tokens
        </BootstrapButton>
        
        <TablePagination
          className='w-pagenation'
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

export default WalletTable;