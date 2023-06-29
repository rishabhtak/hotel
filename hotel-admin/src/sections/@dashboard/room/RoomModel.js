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
} from '@mui/material';
import { roomModelSchema } from '../../../schemas';

import { addRoom, updateRoom } from '../../../features/room/roomSlice';
import { closeModel } from '../../../features/model/modelSlice';


RoomModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    // currentRoom: PropTypes.oneOfType([null, PropTypes.object])
}



function RoomModel({ actionType, currentRoom }) {
    const { modelOpen } = useSelector(state => state.setModel)

    const dispatch = useDispatch()
    const [room, setRoom] = useState({
        description: '',
        type: "",
        size: '',
        capacity: '',
        price: '',
    })


    useEffect(() => {
        if (currentRoom === null) {
            setRoom({
                description: '',
                type: "",
                size: '',
                capacity: '',
                price: '',
            })
        }
        else {
            setRoom({
                id: currentRoom._id,
                description: currentRoom.description,
                type: currentRoom.type,
                size: currentRoom.size,
                capacity: currentRoom.capacity,
                price: currentRoom.price,
            })
        }
    }, [currentRoom])


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
    })



    const handleModelClose = () => dispatch(closeModel(false));

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
                                    <TextField
                                        fullWidth
                                        label="Room Type"
                                        helperText={errors.type && touched.type ? (errors.type) : null}
                                        id='type'
                                        name="type"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.type}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Room Size"
                                        helperText={errors.size && touched.size ? (errors.size) : null}
                                        id='size'
                                        name="size"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.size}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
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
                                        label="Capacity"
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
                                        label="Description"
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

