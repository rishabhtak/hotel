import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';




// @mui
import {
    Popover,
    TableRow,
    TableCell,
    MenuItem,
    IconButton,

} from '@mui/material';
import { deleteRoom } from '../../../features/room/roomSlice';
import Iconify from '../../../components/iconify';



// ----------------------------------------------------------------------

RoomListBody.propTypes = {
    room: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        size: PropTypes.string.isRequired,
        capacity: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    }),
    handleEdit: PropTypes.func.isRequired,
    sno: PropTypes.number.isRequired,
};



function RoomListBody({ room, handleEdit, sno }) {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget)
    }

    const handleEditRoom = (room) => {
        handleEdit(room);
        setOpen(false);

    }

    const handleDeleteRoom = (id) => {
        dispatch(deleteRoom(id))
        setOpen(false);
    }

    if (room) {
        const { type, capacity, size, description, price } = room;
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
