import { useState } from 'react';
import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';

import { filter } from 'lodash';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Collapse,
    Box,
    TableHead,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Label from '../../../components/label';

import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------
const TABLE_COLLAPSIBLE = [
    { id: 'roomtype', label: 'Room Type', alignRight: false },
    { id: 'persons', label: 'Person', alignRight: false },
    { id: 'totalrooms', label: 'Total Rooms', alignRight: false },
    { id: 'specialrequest', label: 'Special Reauest', alignRight: false },
];

export default function BookingListBody({row,handleOpenMenu}) {

    const [openCollapse, setOpenCollapse] = useState(false);

    if (row) {
         const { id, name, role, status, company, isVerified } = row;
        return (
            <>
                <TableRow hover key={id} tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                            <Typography variant="subtitle2" noWrap>
                                {name}
                            </Typography>
                        </Stack>
                    </TableCell>

                    <TableCell align="left">{company}</TableCell>

                    <TableCell align="left">{role}</TableCell>

                    <TableCell align="left">{isVerified ? 'Yes' : 'No'}</TableCell>

                    <TableCell align="left">
                        <Label color={(status === 'banned' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                    </TableCell>

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
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell align="right">Amount</TableCell>
                                            <TableCell align="right">Total price ($)</TableCell>
                                        </TableRow>
                                    </TableHead>

                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow >
            </>
        )
    }
}


