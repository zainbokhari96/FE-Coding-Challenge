import React, { useEffect, useState, useCallback } from "react";

// Third-party libraries
import { useNavigate } from "react-router-dom";

// Utils
import { DEFAULT_PAGINATION } from '../../utils/constant';
import { debounce } from "../../utils/helper";
import service from '../../service';

// Components
import Table from "./Listing";
import Filters from "./Filters";

// MUI Components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

// Styles
import './styles.scss'


interface User {
  rows: object
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [pagination, setPagination] = useState(DEFAULT_PAGINATION);

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentPage = parseInt(queryParams.get('page') || '');
  const currentFilter = queryParams.get('gender') || '';

  const handleSearchChange = useCallback(
    debounce((event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch((event.target.value));
      setPagination((prev) => ({
        ...prev,
        page: 0
      }));
    }, 200),
    []
  );

  const clearFilters = () => {
    setGender('');
    navigate(`?page=${pagination.page}`);
  }

  const fetchUsers = async () => {
    try {
      const payload = {
        ...pagination,
        name: search,
        gender: gender
      }
      const request = await service.get('', payload);
      if (request.status === 200) {
        setUsers(request.data.results as User[]);
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (currentPage && currentPage !== pagination.page) {
      setPagination((prev) => ({
        ...prev,
        page: currentPage
      }))
    }
    if (currentFilter) {
      setGender(currentFilter);
    }
  }, [currentPage, currentFilter]);

  useEffect(() => {
    if (gender) {
      navigate(`?page=${pagination.page}&gender=${gender}`);
    } else {
      navigate(`?page=${pagination.page}`);
    }
  }, [gender, pagination.page]);

  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.results, search, gender]);

  return (
    <>
      <h2>FE Coding Challenge</h2>
      <div>
        <Box className="search">
          <TextField id="standard-basic" label="Search by name" variant="outlined" onChange={handleSearchChange} />
          <Button className="filter-button" onClick={() => setOpenFilter(true)}>
            <Fab aria-label="edit">
              <EditIcon />
            </Fab>
          </Button>
          {gender.length > 0 && <Button className="filter-button" onClick={clearFilters}>
            Clear
          </Button>}
        </Box>
        <Table rows={users} updatePagination={setPagination} pagination={pagination} />
        <Filters
          open={openFilter} onSubmit={setGender} handleClose={() => setOpenFilter(false)} current={gender} />
      </div >

    </>
  );
};

export default Users;
