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
    { id: 'specialrequest', label: 'Special Reauest', alignRight: false },
    { id: 'totalprice', label: 'Total Price', alignRight: false },

];

BookingListBody.propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    headLabel: PropTypes.array,
    collapse: PropTypes.array,
    openCollapse: PropTypes.bool,
    numSelected: PropTypes.number,
    onRequestSort: PropTypes.func,
    onSelectAllClick: PropTypes.func,
};

export default function BookingListBody({ row, handleOpenMenu }) {

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
                                            {TABLE_COLLAPSIBLE.map((tableCollasibleHead) => (

                                                <TableCell key={tableCollasibleHead.id} align={tableCollasibleHead.alignRight ? 'left' : 'right'}>
                                                    {tableCollasibleHead.label}
                                                </TableCell>
                                            ))}
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


