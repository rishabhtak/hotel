import { Helmet } from 'react-helmet-async';
import { PuffLoader } from 'react-spinners'

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

import { getRoomDetail } from '../features/roomDetail/roomDetailSlice';
import { setOpenModel, setDialogOpen } from '../features/model/modelSlice';


// components
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
import DeleteDialogBox from '../utils/DeleteDialogBox';

// sections
import { RoomDetailModel, RoomDetailListToolbar, RoomDetailListHead, RoomDetailListBody } from '../sections/@dashboard/roomdetail';



// mock

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'sno', label: 'S.No.', alignRight: false },
    { id: 'roomType', label: 'Room Type', alignRight: false },
    { id: 'features', label: 'Features', alignRight: false },
    { id: 'totalRooms', label: 'Total Rooms', alignRight: false },
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
        return filter(array, (_roomDetail) => _roomDetail.roomType.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}



export default function RoomDetailPage() {

    const override = {
        position: "fixed",
        zIndex: 1031,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    };

    const dispatch = useDispatch();
    const { roomDetail, loading, error } = useSelector(state => state.roomDetail);

    useEffect(() => {
        dispatch(getRoomDetail());


        // eslint-disable-next-line
    }, []);

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [actionType, setActionType] = useState("");
    const [currentRoomDetail, setCurrentRoomDetail] = useState(null);
    const [id, setId] = useState(null);

    let roomTypeArray = [];

    if (roomDetail && roomDetail.length > 0) {
        roomTypeArray = roomDetail.map((element, index) => {
            return element.roomType
        })
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };


    const filteredRoomDetail = applySortFilter(roomDetail, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredRoomDetail.length && !!filterName;

    const handleModelOpen = useCallback(() => dispatch(setOpenModel(true)), [dispatch]);


    const handleEdit = useCallback((roomDetail) => {
        setActionType("Update")
        setCurrentRoomDetail(roomDetail)
        handleModelOpen()
    }, []);

    const handleDelete = useCallback((id) => {
        dispatch(setDialogOpen(true))
        setId(id)
    }, []);


    const handleAddRoomDetail = useCallback(() => {
        setActionType("Add")
        setCurrentRoomDetail(null)
        handleModelOpen()
    }, []);

    const handleRequestSort = useCallback((event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    }, [order, orderBy]);

    const handleFilterByName = useCallback((event) => {
        setPage(0);
        setFilterName(event.target.value);
    }, []);


    return (
        <>
            <Helmet>
                <title>Room Detail</title>
            </Helmet>
            <Container>

                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Room Detail
                    </Typography>
                    <Button variant="contained" onClick={handleAddRoomDetail}
                        startIcon={<Iconify icon="eva:plus-fill" />}>
                        Add Room Detail
                    </Button>
                </Stack>
                {loading ? <PuffLoader cssOverride={override} /> : <>{actionType && <RoomDetailModel actionType={actionType} currentRoomDetail={currentRoomDetail} roomTypeArray={roomTypeArray} />}
                    {id && <DeleteDialogBox id={id} type="room detail" />}
                    <Card>
                        <RoomDetailListToolbar filterName={filterName} onFilterName={handleFilterByName} />

                        <Scrollbar>
                            <TableContainer sx={{ minWidth: 800 }} component={Paper}>
                                <Table aria-label="collapsible table">
                                    <RoomDetailListHead
                                        order={order}
                                        orderBy={orderBy}
                                        headLabel={TABLE_HEAD}
                                        onRequestSort={handleRequestSort}
                                    />
                                    <TableBody>
                                        {error ? <TableRow style={{ height: 53 }}>
                                            <TableCell colSpan={7} align='center'>Sorry, Some Error Occurred Please Try after Some Time</TableCell>
                                        </TableRow> : roomDetail.length === 0 ? (
                                            <TableRow style={{ height: 53 }}>
                                                <TableCell colSpan={7} align='center'>No Data Available</TableCell>
                                            </TableRow>
                                        ) :
                                            filteredRoomDetail.map((roomDetail, index) => {
                                                return (
                                                    <RoomDetailListBody roomDetail={roomDetail} sno={index + 1} key={roomDetail._id} handleEdit={handleEdit} handleDelete={handleDelete} />
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
                            count={roomDetail.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </Card></>}

            </Container >


        </>
    );
}
