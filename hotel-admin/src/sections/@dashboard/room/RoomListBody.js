import { memo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

// @mui
import {
    Popover,
    TableRow,
    TableCell,
    MenuItem,
    IconButton,

} from '@mui/material';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

RoomListBody.propTypes = {
    row: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string,
        price: PropTypes.number,
        size: PropTypes.string,
        capacity: PropTypes.number,
        description: PropTypes.string,
    }),
};



function RoomListBody({ row, handleEdit, sno }) {

    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget)
    }

    const handleEditRoom = (row) => {
        handleEdit(row);

    }

    if (row) {
        const { _id, type, capacity, size, description, price } = row;
        return (
            <>
                <TableRow tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" scope="row">
                        {sno}
                    </TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{type}</TableCell>
                    <TableCell align="left">{size}</TableCell>

                    <TableCell align="left">{capacity}</TableCell>
                    <TableCell align="left">{price}</TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{description}</TableCell>


                    <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Iconify icon={'eva:more-vertical-fill'} />
                        </IconButton>
                    </TableCell>
                </TableRow>
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
                    <MenuItem onClick={() => handleEditRoom(row)}>
                        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>

                    <MenuItem sx={{ color: 'error.main' }}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>

            </>
        )
    }
}

export default RoomListBody
