import { useState } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';

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
import Label from '../../../components/label';

import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------
const TABLE_COLLAPSIBLE = [
    { id: 'roomtype', label: 'Room Type', alignRight: false },
    { id: 'totalperson', label: 'Total Person', alignRight: false },
    { id: 'totalroom', label: 'Total Room', alignRight: false },
    { id: 'specialrequest', label: 'Special Request', alignRight: false },
    { id: 'totalprice', label: 'Total Price', alignRight: false },

];

BookingListBody.propTypes = {
    _id: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.number,
    startdate: PropTypes.string,
    enddate: PropTypes.string,
    roomtype: PropTypes.string,
    totalperson: PropTypes.number,
    totalroom: PropTypes.number,
    specialrequest: PropTypes.string,
    totalprice: PropTypes.number,
};

export default function BookingListBody({ row, handleOpenMenu }) {

    const [openCollapse, setOpenCollapse] = useState(false);

    if (row) {
        const { _id, name, email, phone, startdate, enddate, roomtype, totalperson, totalroom, specialrequest, totalprice } = row;
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
                    <TableCell component="th" scope="row" padding="none">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" style={{ textTransform: 'capitalize' }} noWrap>
                                {name}
                            </Typography>
                        </Stack>
                    </TableCell>

                    <TableCell align="left">{email}</TableCell>

                    <TableCell align="left">{phone}</TableCell>

                    <TableCell align="left">{startdate}</TableCell>
                    <TableCell align="left">{enddate}</TableCell>

                    <TableCell align="right">
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

                                                <TableCell key={tableCollasibleHead.id} align={tableCollasibleHead.alignRight ? 'left' : 'right'}>
                                                    {tableCollasibleHead.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="right" style={{ textTransform: 'capitalize' }}>{roomtype}</TableCell>
                                            <TableCell align="right">{totalperson}</TableCell>
                                            <TableCell align="right">{totalroom}</TableCell>
                                            <TableCell align="center">{specialrequest}</TableCell>
                                            <TableCell align="right">{totalprice}</TableCell>
                                        </TableRow>
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


