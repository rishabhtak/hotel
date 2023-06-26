import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';


// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Button,
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
} from '@mui/material';
import { getRooms } from '../features/room/roomSlice';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { AddRoom, RoomListToolbar, RoomListHead, RoomListBody } from '../sections/@dashboard/room';

// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'sno', label: 'S.No.', alignRight: false },
    { id: 'type', label: 'Room Type', alignRight: false },
    { id: 'size', label: 'Size', alignRight: false },
    { id: 'capacity', label: 'Capacity', alignRight: false },
    { id: 'price', label: 'Price', alignRight: false },
    { id: 'description', label: 'Description', alignRight: false },
    { id: '' },
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
        return filter(array, (_room) => _room.type.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}



export default function RoomPage() {
    const dispatch = useDispatch();
    const { rooms, loading, error } = useSelector(state => state.rooms);

    useEffect(() => {
        dispatch(getRooms());
        // eslint-disable-next-line
    }, []);

    // const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [actionType, setActionType] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null)
    const [modelAddRoom, setModelAddRoom] = useState(false);




    const handleAddRoom = () => {
        console.log("add")
        setActionType("Add")
        setCurrentRoom(null)
        handleModelToggle()
    }

    const handleEdit = (room) => {
        console.log(room)
        setActionType("Update")
        setCurrentRoom(room)
        handleModelToggle()

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };


    const filteredRoom = applySortFilter(rooms, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredRoom.length && !!filterName;

    const handleModelToggle = useCallback(() => setModelAddRoom(prevShow => !prevShow), [modelAddRoom]);





    const handleRequestSort = useCallback((event, property) => {
        console.log(property)
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleFilterByName = useCallback((event) => {
        setPage(0);
        setFilterName(event.target.value);
    }, [page, filterName]);




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
                    <Button variant="contained" onClick={handleAddRoom}
                        startIcon={<Iconify icon="eva:plus-fill" />}>
                        Add Room
                    </Button>
                </Stack>
                <AddRoom open={modelAddRoom} close={handleModelToggle} actionType={actionType} currentRoom={currentRoom} />
                <Card>
                    <RoomListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

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
                                    {rooms.length === 0 ? (
                                        <TableRow style={{ height: 53 }}>
                                            <TableCell colSpan={7} align='center'>No Data Available</TableCell>
                                        </TableRow>
                                    ) :
                                        filteredRoom.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {

                                            return (
                                                <RoomListBody row={row} sno={index + 1} key={row._id} handleEdit={handleEdit} />
                                            );
                                        })
                                    }


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
                        count={rooms.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Card>
            </Container >


        </>
    );
}
