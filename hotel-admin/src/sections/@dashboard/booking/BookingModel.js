
// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from "react-hook-form"
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from '@hookform/error-message';
import * as Yup from 'yup'

import {
    Card,
    Dialog,
    CardHeader,
    CardContent,
    Box,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions,
    TextField,
    Button,
    DialogContent,
    DialogTitle
} from '@mui/material';
import { setOpenModel } from '../../../features/model/modelSlice';


BookingModel.propTypes = {

}

const bookingModelSchema = Yup.object().shape({

});



function BookingModel({ open, close }) {
    const { modelOpen } = useSelector(state => state.setModel);
    const dispatch = useDispatch();


    const { handleSubmit, control, formState: { errors } } = useForm({
    }
    );

    const onSubmit = (data) => {
        console.log(data);
    }

    const handleModelClose = () => {
        dispatch(setOpenModel(false));
    };

    return (
        <Dialog open={modelOpen}
            onClose={handleModelClose}
            scroll='paper'
            aria-labelledby="addBooking">
            <form
                autoComplete="on"
                onSubmit={handleSubmit(onSubmit)}
            >
                <DialogTitle id="addBooking">Add Booking</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                                sx={{
                                    marginBottom: 3
                                }}
                            >
                                <Controller
                                    name='fullname'
                                    control={control}
                                    //    defaultValue={currentRoomDetail ? currentRoomDetail.roomType : ""}
                                    render={({ field: { ref, ...field }, fieldState: { error } }) => (
                                        <TextField
                                            //          defaultValue={currentRoomDetail ? currentRoomDetail.roomType : ""}
                                            fullWidth
                                            label="Full Name *"
                                            id='fullname'
                                            error={!!error}
                                            helperText={error?.message}
                                            onChange={field.onChange}
                                            value={field.fullname}
                                            name={field.name}
                                            inputRef={field.ref}
                                            onBlur={field.onBlur}

                                        />
                                    )} />

                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>

                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type="submit"
                        variant="contained">
                        Add Booking
                    </Button>
                    <Button variant="contained" onClick={handleModelClose} >
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Dialog >
    )
}

export default memo(BookingModel)

