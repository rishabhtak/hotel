import { Helmet } from 'react-helmet-async';
import { PuffLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

import { filter } from 'lodash';
import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { getUsers } from '../features/user/userSlice';

// components
import Scrollbar from '../components/scrollbar';

// sections
import { UserListBody, UserListHead, UserListToolbar } from '../sections/@dashboard/user';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No.', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const navigate = useNavigate();

  const override = {
    position: 'fixed',
    zIndex: 1031,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const dispatch = useDispatch();
  const { users, loading, error, count } = useSelector((state) => state.users);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      /*  dispatch(getUsers({
                page: 1,
                limit: 5
            })); */
      dispatch(getUsers());
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  // const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState(null);

  const selected = [];
  const handleChangePage = (event, newPage) => {
    /* dispatch(
      getUsers({
        page: newPage + 1,
        limit: rowsPerPage,
      })
    ); */
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  /* const handleChangeRowsPerPage = (event) => {
    const limit = event.target.value;
    dispatch(
      getUsers({
        page: 1,
        limit,
      })
    );
    setPage(0);
    setRowsPerPage(limit, 10);
  }; */

  const filteredUser = applySortFilter(users, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUser.length && !!filterName;

  const handleRequestSort = useCallback(
    (event, property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    },
    [order, orderBy]
  );

  const handleFilterByName = useCallback((event) => {
    setPage(0);
    setFilterName(event.target.value);
  }, []);

  return (
    <>
      <Helmet>
        <title>User</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
        </Stack>
        {loading ? (
          <PuffLoader cssOverride={override} />
        ) : (
          <>
            {' '}
            <Card>
              <UserListToolbar
                numSelected={selected.length}
                filterName={filterName}
                onFilterName={handleFilterByName}
              />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} component={Paper}>
                  <Table aria-label="collapsible table">
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD}
                      onRequestSort={handleRequestSort}
                    />
                    <TableBody>
                      {error ? (
                        <TableRow style={{ height: 53 }}>
                          <TableCell colSpan={7} align="center">
                            Sorry, Some Error Occurred Please Try after Some Time
                          </TableCell>
                        </TableRow>
                      ) : users.length === 0 ? (
                        <TableRow style={{ height: 53 }}>
                          <TableCell colSpan={7} align="center">
                            No Data Available
                          </TableCell>
                        </TableRow>
                      ) : (
                        /*  filteredUser.map((user, index) => {
                          return <UserListBody user={user} sno={index + 1} key={user._id} />;
                        }) */

                        filteredUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user, index) => {
                          return (
                            <UserListBody
                              user={user}
                              sno={page === 0 ? index + 1 : (page + 1 - 1) * rowsPerPage + (index + 1)}
                              key={user._id}
                            />
                          );
                        })
                      )}
                    </TableBody>
                    {isNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                            <Paper
                              sx={{
                                textAlign: 'center',
                              }}
                            >
                              <Typography variant="h6" paragraph>
                                Not found
                              </Typography>

                              <Typography variant="body2">
                                No results found for &nbsp;
                                <strong>&quot;{filterName}&quot;</strong>.
                                <br /> Try checking for typos or using complete words.
                              </Typography>
                            </Paper>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                //  count={count}
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>
          </>
        )}
      </Container>
    </>
  );
}
