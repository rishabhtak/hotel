import { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
    Alert

} from '@mui/material';
import { deleteRoom } from '../features/room/roomSlice';
import { setDialogOpen } from '../features/model/modelSlice'



function DeleteDialogBox({ id, type }) {
    const { dialogOpen } = useSelector(state => state.setModel)
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(setDialogOpen(false))
    };

    const handleConfirmDelete = () => {
        dispatch(setDialogOpen(false))
        dispatch(deleteRoom(id))
    }

    return (
        <Dialog
            open={dialogOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <Alert severity="warning">
                    {`Delete ${type}?`}
                </Alert>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {`Do you really want to delete ${type}?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirmDelete} autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default memo(DeleteDialogBox)