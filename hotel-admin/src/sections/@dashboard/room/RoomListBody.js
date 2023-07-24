import { memo, useState } from 'react';
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
    room: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }),
    handleEdit: PropTypes.func.isRequired,
    sno: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
};



function RoomListBody({ room, handleEdit, sno, handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget)
    };

    const handleEditRoom = (room) => {
        handleEdit(room);
        setOpen(false);

    };

    const handleDeleteRoom = (id) => {
        handleDelete(id)
        setOpen(false);

    };

    if (room) {
        const { roomType, capacity, name, description, price } = room;
        return (
            <>
                <TableRow tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" scope="row">
                        {sno}
                    </TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{roomType}</TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{name}</TableCell>
                    <TableCell align="left">{capacity}</TableCell>
                    <TableCell align="left">{price}</TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{description}</TableCell>
                    <TableCell align="left">
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
                    <MenuItem onClick={() => handleEditRoom(room)}>
                        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>

                    <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteRoom(room._id)}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
            </>
        )
    }
}

export default memo(RoomListBody)
