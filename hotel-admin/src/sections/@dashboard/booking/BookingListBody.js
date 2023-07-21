import { useState, memo } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
    Table,
    Stack,
    Collapse,
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
    { id: 'person', label: 'Person', alignLeft: true },
    { id: 'price', label: 'Price', alignLeft: true },
    { id: 'totalPrice', label: 'Total Price', alignLeft: true },
    { id: 'specialRequest', label: 'Special Request', alignLeft: true },

];

BookingListBody.propTypes = {
    row: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.number,
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        specialRequest: PropTypes.string,
        totalPrice: PropTypes.number,
        roomDetails: PropTypes.arrayOf(PropTypes.shape({
            person: PropTypes.number,
            roomName: PropTypes.string,
            roomType: PropTypes.string,
            roomId: PropTypes.string,
            price: PropTypes.number,
        }))
    }),
    handleOpenMenu: PropTypes.func,
};

function BookingListBody({ row, handleOpenMenu }) {
    const [openCollapse, setOpenCollapse] = useState(false);

    if (row) {
        const { _id, name, email, phone, startDate, endDate, specialRequest, totalPrice, roomDetails } = row;
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
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Table size="small" aria-label="purchases">
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
                                                <TableCell align="left" style={{ textTransform: 'capitalize' }}>{roomDetail.roomName}</TableCell>
                                                <TableCell align="center">{roomDetail.person}</TableCell>
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
            </>
        )
    }
}

export default memo(BookingListBody)


