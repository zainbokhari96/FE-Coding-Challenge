import React from 'react';

// Third-party libraries
import { useNavigate } from "react-router-dom";

// MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';

// Style
import './styles.scss'

interface Row {
  name: { first: string; last: string };
  email: string;
  gender: number;
  phone: number;
  dob: { age: number };
  id: { value: number };
}

interface Pagination {
  page: number;
  results: number;
}

interface ListingProps {
  rows: Row[];
  pagination: Pagination;
  updatePagination: (pagination: Pagination) => void;
}

const Listing = (props: ListingProps) => {
  const { rows, pagination, updatePagination } = props;

  const navigate = useNavigate();


  const navigateToUserProfile = (id: number) => {
    navigate(`user/${id}`);
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    updatePagination({
      page: newPage,
      results: pagination.results
    });
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePagination({
      page: 0,
      results: parseInt(event.target.value, 10)
    });
  };

  return (
    <div className='table-body'>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Gender</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any, index: number) => (
              <TableRow className='row' key={index} onClick={() => navigateToUserProfile(row?.id?.value)}>
                <TableCell align="left" >
                  {`${row?.name?.first}  ${row?.name?.last}` || " -"}
                </TableCell>
                <TableCell align="left">{row?.email || " -"}</TableCell>
                <TableCell align="left">{row?.gender || " -"}</TableCell>
                <TableCell align="left">{row?.dob?.age || " -"}</TableCell>
                <TableCell align="left">{row?.phone || " -"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 20, 50]}
        component="div"
        count={-1}
        rowsPerPage={parseInt(pagination.results)}
        page={pagination.page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Listing;