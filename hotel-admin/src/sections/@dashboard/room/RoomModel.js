// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
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
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    FormHelperText
} from '@mui/material';
import { roomModelSchema } from '../../../schemas';
import { addRoom, updateRoom } from '../../../features/room/roomSlice';
import { setOpenModel } from '../../../features/model/modelSlice';
import { toTitleCase } from '../../../utils/formatText';



RoomModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    // currentRoom: PropTypes.oneOfType([null, PropTypes.object])
}



function RoomModel({ actionType, currentRoom }) {
    const { roomDetail } = useSelector(state => state.roomDetail);
    const { modelOpen } = useSelector(state => state.setModel);

    const dispatch = useDispatch();
    const [room, setRoom] = useState({
        description: '',
        roomType: "",
        name: '',
        capacity: '',
        price: '',
    });


    useEffect(() => {
        if (currentRoom === null) {
            setRoom({
                description: '',
                roomType: "",
                name: '',
                capacity: '',
                price: '',
            });
        }
        else {
            setRoom({
                id: currentRoom._id,
                description: currentRoom.description,
                roomType: currentRoom.roomType,
                name: currentRoom.name,
                capacity: currentRoom.capacity,
                price: currentRoom.price,
            });
        }
    }, [currentRoom]);


    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        enableReinitialize: true,
        initialValues: room,
        validationSchema: roomModelSchema,
        onSubmit: (value, action) => {
            if (actionType === "Add") {
                dispatch(addRoom(value))
            }
            if (actionType === 'Update') {
                dispatch(updateRoom(value));
            }
            action.resetForm()
        },
    });



    const handleModelClose = () => dispatch(setOpenModel(false));

    return (
        <Dialog open={modelOpen} onClose={handleModelClose}>
            <form
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title={`${actionType} Room`}
                    />
                    <CardContent>
                        <Box>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <FormControl fullWidth>
                                        <InputLabel id="roomTypeLabel">Room Type</InputLabel>
                                        <Select
                                            labelId="roomTypeLabel"
                                            id="roomType"
                                            name='roomType'
                                            value={values.roomType}
                                            label="Room Type"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={
                                                Boolean(touched.roomType && errors.roomType)
                                            }

                                        >
                                            {roomDetail && roomDetail.map(roomDetail => <MenuItem style={{ textTransform: 'capitalize' }} key={roomDetail._id} value={roomDetail.roomType}>{toTitleCase(roomDetail.roomType)}</MenuItem>)}
                                        </Select>
                                        {touched.roomType && errors.roomType ? (
                                            <FormHelperText
                                                sx={{ color: "#bf3333", marginLeft: "16px !important" }}
                                            >
                                                {touched.roomType && errors.roomType}
                                            </FormHelperText>
                                        ) : null}
                                    </FormControl>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Room Name"
                                        helperText={errors.name && touched.name ? (errors.name) : null}
                                        id='name'
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Price"
                                        id='price'
                                        name="price"
                                        helperText={errors.price && touched.price ? (errors.price) : null}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.price}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        type='number'
                                        label="Capacity(Max No. of Person)"
                                        id='capacity'
                                        name="capacity"
                                        helperText={errors.capacity && touched.capacity ? (errors.capacity) : null}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.capacity}
                                    />
                                </Grid>

                                <Grid
                                    xs={12}
                                    md={12}
                                >
                                    <TextField
                                        fullWidth
                                        label="Small Information(Optional)"
                                        id='description'
                                        helperText={errors.description && touched.description ? (errors.description) : null}
                                        name="description"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description}
                                        multiline
                                        rows={3}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button type="submit" onClick={handleSubmit} variant="contained">
                            {`${actionType} Room`}
                        </Button>
                        <Button variant="contained" onClick={handleModelClose} >
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Dialog>
    )
}

export default memo(RoomModel)

