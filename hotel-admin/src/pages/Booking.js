import { Helmet } from 'react-helmet-async';
import { PuffLoader } from 'react-spinners'
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
    Popover,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    CircularProgress
} from '@mui/material';
import { getBookings } from '../features/booking/bookingSlice';
import { setOpenModel } from '../features/model/modelSlice';

// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { BookingListHead, BookingListToolbar, BookingListBody, AddBooking } from '../sections/@dashboard/booking';
// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'phone', label: 'Phone', alignRight: false },
    { id: 'startdate', label: 'Start Date', alignRight: false },
    { id: 'enddate', label: 'End Date', alignRight: false },
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
        return filter(array, (_booking) => _booking.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}



export default function BookingPage() {
    const navigate = useNavigate();

    const override = {
        position: "fixed",
        zIndex: 1031,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"

    }
    const dispatch = useDispatch();
    const { bookings, loading, error } = useSelector(state => state.bookings);
    const { modelOpen } = useSelector(state => state.setModel)


    useEffect(() => {
        if (localStorage.getItem('adminToken')) {
            dispatch(getBookings());
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, []);

    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // const [modelAddBooking, setModelAddBooking] = useState(false);


    const handleCloseMenu = () => {
        setOpen(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };


    // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings.length) : 0;

    const filteredBooking = applySortFilter(bookings, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredBooking.length && !!filterName;

    //  const handleModelToggle = useCallback(() => setModelAddBooking(prevShow => !prevShow), [modelAddBooking]);

    const handleModelClose = useCallback(() => dispatch(setOpenModel(false)), [dispatch]);

    const handleOpenMenu = useCallback((event) => setOpen(event.currentTarget), [open])

    const handleRequestSort = useCallback((event, property) => {
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
                <title>Booking</title>
            </Helmet>

            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Booking
                    </Typography>
                    <Button variant="contained" onClick={() => dispatch(setOpenModel(true))} startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Booking
                    </Button>
                </Stack>

                {loading ? <PuffLoader cssOverride={override} /> : <>
                    <AddBooking open={modelOpen} close={handleModelClose} /><Card>
                        <BookingListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }} component={Paper}>
                                <Table aria-label="collapsible table">
                                    <BookingListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {error ? <TableRow style={{ height: 53 }}>
                                            <TableCell colSpan={7} align='center'>Sorry, Some Error Occurred Please Try after Some Time</TableCell>
                                        </TableRow> :
                                            bookings.length === 0 ? (
                                                <TableRow style={{ height: 53 }}>
                                                    <TableCell colSpan={7} align='center'>No Data Available</TableCell>
                                                </TableRow>
                                            ) :
                                                filteredBooking.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                                    return (
                                                        <BookingListBody row={row} key={row._id} handleOpenMenu={handleOpenMenu} />
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
                            count={bookings.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card></>}

            </Container >

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
