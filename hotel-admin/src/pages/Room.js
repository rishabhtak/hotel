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

import { getRooms } from '../features/room/roomSlice';
import { setOpenModel, setDialogOpen } from '../features/model/modelSlice';
import { getRoomDetail } from '../features/roomDetail/roomDetailSlice';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import DeleteDialogBox from '../utils/DeleteDialogBox';

// sections
import { RoomModel, RoomListToolbar, RoomListHead, RoomListBody } from '../sections/@dashboard/room';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'sno', label: 'S.No.', alignRight: false },
  { id: 'roomType', label: 'Room Type', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'capacity', label: 'Capacity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'action', label: 'Actions', alignRight: false },
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
    return filter(array, (_room) => _room.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function RoomPage() {
  const navigate = useNavigate();

  const override = {
    position: 'fixed',
    zIndex: 1031,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const dispatch = useDispatch();
  const { rooms, loading, error, count } = useSelector((state) => state.rooms);

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      dispatch(getRoomDetail());
      dispatch(getRooms());
      /*  dispatch(getRooms({
                page: 1,
                limit: 5
            })); */
    } else {
      navigate('/login');
    }
    // eslint-disable-next-line
  }, []);

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [actionType, setActionType] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [id, setId] = useState(null);

  const handleChangePage = (event, newPage) => {
    /*  dispatch(
      getRooms({
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
      getRooms({
        page: 1,
        limit,
      })
    ); 
     setPage(0);
   setRowsPerPage(limit, 10);  
  }; */

  const filteredRoom = applySortFilter(rooms, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredRoom.length && !!filterName;

  const handleModelOpen = useCallback(() => dispatch(setOpenModel(true)), [dispatch]);

  const handleEdit = useCallback((room) => {
    setActionType('Update');
    setCurrentRoom(room);
    handleModelOpen();
  }, []);

  const handleDelete = useCallback((id) => {
    dispatch(setDialogOpen(true));
    setId(id);
  }, []);

  const handleAddRoom = useCallback(() => {
    setActionType('Add');
    setCurrentRoom(null);
    handleModelOpen();
  }, []);

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
    //  dispatch(getRooms(query))
    setFilterName(event.target.value);
  }, []);

  return (
    <>
      <Helmet>
        <title>Room</title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Room
          </Typography>
          <Button variant="contained" onClick={handleAddRoom} startIcon={<Iconify icon="eva:plus-fill" />}>
            Add Room
          </Button>
        </Stack>
        {loading ? (
          <PuffLoader cssOverride={override} />
        ) : (
          <>
            {actionType && <RoomModel actionType={actionType} currentRoom={currentRoom} />}
            {id && <DeleteDialogBox id={id} type="room" />}
            <Card>
              <RoomListToolbar filterName={filterName} onFilterName={handleFilterByName} />

              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }} component={Paper}>
                  <Table aria-label="collapsible table">
                    <RoomListHead
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
                      ) : rooms.length === 0 ? (
                        <TableRow style={{ height: 53 }}>
                          <TableCell colSpan={7} align="center">
                            No Data Available
                          </TableCell>
                        </TableRow>
                      ) : (
                        /*  filteredRoom.map((room, index) => {
                          return (
                            <RoomListBody
                              room={room}
                              sno={page === 0 ? index + 1 : (page + 1 - 1) * rowsPerPage + (index + 1)}
                              key={room._id}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
                            />
                          );
                        }) */

                        filteredRoom.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((room, index) => {
                          return (
                            <RoomListBody
                              room={room}
                              sno={page === 0 ? index + 1 : (page + 1 - 1) * rowsPerPage + (index + 1)}
                              key={room._id}
                              handleEdit={handleEdit}
                              handleDelete={handleDelete}
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
                //   count={count}
                count={rooms.length}
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
