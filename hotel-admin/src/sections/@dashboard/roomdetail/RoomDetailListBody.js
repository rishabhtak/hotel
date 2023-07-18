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

RoomDetailListBody.propTypes = {
    roomDetail: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        roomType: PropTypes.string.isRequired,
        features: PropTypes.array.isRequired,
        totalRooms:PropTypes.number.isRequired,
    }),
    handleEdit: PropTypes.func.isRequired,
    sno: PropTypes.number.isRequired,
    handleDelete: PropTypes.func.isRequired,
};



function RoomDetailListBody({ roomDetail, handleEdit, sno, handleDelete }) {
    const [open, setOpen] = useState(false);

    const handleCloseMenu = () => {
        setOpen(false);
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget)
    };

    const handleEditRoomDetail = (roomDetail) => {
        handleEdit(roomDetail);
        setOpen(false);

    };

    const handleDeleteRoomDetail = (id) => {
        handleDelete(id)
        setOpen(false);

    };

    if (roomDetail) {
        const { roomType, features,totalRooms } = roomDetail;
        return (
            <>
                <TableRow tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell component="th" scope="row">
                        {sno}
                    </TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{roomType}</TableCell>
                    <TableCell align="left" style={{ textTransform: 'capitalize' }}>{features}</TableCell>
                    <TableCell align="left">{totalRooms}</TableCell>
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
                    <MenuItem onClick={() => handleEditRoomDetail(roomDetail)}>
                        <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                        Edit
                    </MenuItem>

                    <MenuItem sx={{ color: 'error.main' }} onClick={() => handleDeleteRoomDetail(roomDetail._id)}>
                        <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                        Delete
                    </MenuItem>
                </Popover>
            </>
        )
    }
}

export default memo(RoomDetailListBody)
