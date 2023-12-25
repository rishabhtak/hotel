import { useState, memo } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
    Table,
    Collapse,
    Popover,
    MenuItem,
    Box,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    IconButton,

} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Iconify from '../../../components/iconify';
import { fDate } from '../../../utils/formatTime';




// ----------------------------------------------------------------------
const TABLE_COLLAPSIBLE = [
    { id: 'roomType', label: 'Room Type', alignLeft: true },
    { id: 'roomName', label: 'Room Name', alignLeft: true },
    { id: 'count', label: 'Total Rooms', alignLeft: true },
    { id: 'price', label: 'Price/1 Night', alignLeft: true },
    { id: 'totalPrice', label: 'Total Price', alignLeft: true },
    { id: 'specialRequest', label: 'Special Request', alignLeft: true },

];

BookingListBody.propTypes = {
    booking: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        specialRequest: PropTypes.string,
        totalPrice: PropTypes.number,
        roomDetails: PropTypes.arrayOf(PropTypes.shape({
            count: PropTypes.number,
            name: PropTypes.string,
            roomType: PropTypes.string,
            roomId: PropTypes.string,
            price: PropTypes.number,
        }))
    }),
    handleDelete: PropTypes.func
};

function BookingListBody({ booking, handleDelete }) {
    const [openCollapse, setOpenCollapse] = useState(false);
    const [open, setOpen] = useState(false);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget)
    };

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleDeleteBooking = (id) => {
        handleDelete(id)
        setOpen(false);

    };


    if (booking) {
        const { name, email, phone, startDate, endDate, specialRequest, totalPrice, roomDetails } = booking;
        return (
            <>
                <TableRow tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpenCollapse(!openCollapse)}
                        >
                            {openCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell >
                        <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }} noWrap>
                            {name}
                        </Typography>
                    </TableCell>
                    <TableCell align="left">{email}</TableCell>
                    <TableCell align="left">{phone}</TableCell>
                    <TableCell align="left"> {fDate(startDate)}</TableCell>
                    <TableCell align="left">{fDate(endDate)}</TableCell>
                    <TableCell align="left">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="roomDetail">
                                    <TableHead>
                                        <TableRow>
                                            {TABLE_COLLAPSIBLE.map((tableCollasibleHead) => (

                                                <TableCell key={tableCollasibleHead.id} align={tableCollasibleHead.alignLeft ? 'left' : 'right'}>
                                                    {tableCollasibleHead.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {roomDetails.map((roomDetail, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="left" style={{ textTransform: 'capitalize' }}>{roomDetail.roomType}</TableCell>
                                                <TableCell align="left" style={{ textTransform: 'capitalize' }}>{roomDetail.name}</TableCell>
                                                <TableCell align="center">{roomDetail.count}</TableCell>
                                                <TableCell align="left">{roomDetail.price}</TableCell>

                                                <TableCell align="left">{roomDetails.length - 1 === index ? totalPrice : ""}</TableCell>
                                                <TableCell align="left">{roomDetails.length - 1 === index ? specialRequest : ""}</TableCell>
                                            </TableRow>
                                        ))}

                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow >
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
                    <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteBooking(booking._id)}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
            </>
        )
    }
}

export default memo(BookingListBody)


