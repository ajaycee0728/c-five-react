import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Box, IconButton, Collapse, TextField, MenuItem } from '@mui/material';
import { alpha } from '@mui/material/styles';
import {  Container } from 'react-bootstrap';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar'; 
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types'; 
import { GetAll, register, update, remove } from './DataAccess/Guitar';
import moment from 'moment';
import Create from './Components/Create';
import Update from './Components/Update';
import DeleteIcon from '@mui/icons-material/Delete'; 
import CloseIcon from '@mui/icons-material/Close';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function filterByValue(array, string, column) {  
  if(string === '') {
    return array
  } else {   
    return array.filter(o => o[column] === string) === undefined ? [] :  array.filter(o => o[column] === string) ;
  }
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'brand',
    numeric: true,
    disablePadding: false,
    label: 'Brand',
  },
  {
    id: 'date_bought',
    numeric: true,
    disablePadding: false,
    label: 'Date Bought',
  }
]; 

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow> 
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align='right'> Action </TableCell>
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props; 
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >  
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

function App() { const [order, setOrder]  = useState('asc');
const [rows , setRows]                    = useState([]);
const [orderBy, setOrderBy]               = useState('name');
const [selected, setSelected]             = useState([]);
const [page, setPage]                     = useState(0);
const [dense, setDense]                   = useState(false);
const [rowsPerPage, setRowsPerPage]       = useState(5);
const [open, setOpen]                     = useState(false);
const [message, setMessage]               = useState('');
const [search, setSearch]                 = useState('');
const [column, setColumn]                 = useState('name');

useEffect(() => { 
  GetAll()
    .then((response)=>{ 
      setRows(response.data.data);
    }) 
}, []);

const RegisterGuitar = (values) =>{
  register(values)
    .then((response) =>{
      setRows(rows.concat(response.data.data));
      setMessage('Guitar Successfully Registered');
    })
    .finally(()=>{
      setOpen(true);
      CloseAlert();
    })
}

const UpdateGuitar = (values, id) =>{ 
  update(values, id)
    .then((response)=>{ 
      let index   = rows.findIndex(e=> e.id === id); 
      let tempObj = rows.filter((row) => row.id !== id); 
      tempObj.splice(index, 0, response.data);
      setRows(tempObj); 
      setMessage('Guitar Successfully Updated');
    })
    .finally(()=>{
      setOpen(true);
      CloseAlert();
    })
} 

const RemoveGuitar = (id) =>{
  remove(id)
    .then(()=> {
      setRows(rows.filter((row) => row.id !== id)); 
      setMessage('Guitar Successfully Deleted');
    })
    .finally(()=>{
      setOpen(true);
      CloseAlert();
    })
}

const handleRequestSort = (event, property) => {
  const isAsc = orderBy === property && order === 'asc';
  setOrder(isAsc ? 'desc' : 'asc');
  setOrderBy(property);
};

const handleSelectAllClick = (event) => {
  if (event.target.checked) {
    const newSelecteds = rows.map((n) => n.name);
    setSelected(newSelecteds);
    return;
  }
  setSelected([]);
};

const handleClick = (event, name) => {
  const selectedIndex = selected.indexOf(name);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
  } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1),
    );
  }
  setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
  setRowsPerPage(parseInt(event.target.value, 10));
  setPage(0);
}; 

const CloseAlert =()=> {
  setTimeout(() => {
    setOpen(false);
  }, 1500);
}
  
// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <div className="App"> 
      <Collapse 
        in={open}
        className='guitar-alert' 
      >
        <Alert 
         variant="outlined" severity="info"
         action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpen(false);
            }}
          >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }>
          {message}
        </Alert>
      </Collapse>
      <Container fixed className='d-flex align-items-center justify-content-center h-100'> 
      <div className='table-container'>
        <div className='d-flex justify-content-between'>
          <div>
            <Create RegisterGuitar={RegisterGuitar}/> 
          </div>
          <div>
            <TextField
              id="filled-select-currency"
              select
              label="Select" 
              helperText="Select Column to Filter"
              variant="standard"
              defaultValue={'name'}
              onChange={e=> setColumn(e.target.value)}
              size='small'
            > 
                <MenuItem key={'name'} value={'name'}>
                  Name
                </MenuItem> 
                <MenuItem key={'type'} value={'type'}>
                  Type
                </MenuItem> 
                <MenuItem key={'brand'} value={'brand'}>
                  Brand
                </MenuItem> 
            </TextField>
            <TextField onChange={e=> setSearch(e.target.value)} label="Search" variant="standard" size='small'/> 
          </div> 
        </div>
        
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {filterByValue(stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), search, column)
                .map((row, index) => { 
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox" 
                      tabIndex={-1}
                      key={row.name} 
                    > 
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.brand}</TableCell>
                      <TableCell align="right">{moment(row.date_bought).format("MMM D, YYYY")}</TableCell> 
                      <TableCell align='right'>
                          <Update row={row} UpdateGuitar={UpdateGuitar}/>
                          <IconButton onClick={e=> RemoveGuitar(row.id)}>
                            <DeleteIcon/>
                          </IconButton>
                          </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />   
        </div>
      </Container>
    </div>
  );
}

export default App;
