// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useDispatch } from 'react-redux';
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
    Button
} from '@mui/material';
import { addRoom } from '../../../features/room/roomSlice';

AddRoom.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired
}



function AddRoom({ open, close, actionType, currentRoom }) {
    const dispatch = useDispatch()


    const [room, setRoom] = useState({})

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
            setRoom(currentRoom)
        }
    }, [currentRoom])

    console.log(room)

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addRoom(room));
        setRoom({
            description: '',
            type: '',
            size: '',
            capacity: '',
            price: '',
        })
    }

    const handleChange = (e) => {

        setRoom({ ...room, [e.target.name]: e.target.value })
    }
    return (
        <Dialog open={open} onClose={close}>
            <form
                autoComplete="on"
                noValidate
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
                                        name="type"
                                        onChange={handleChange}
                                        required
                                        value={room.type}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Room Size"
                                        name="size"
                                        onChange={handleChange}
                                        required
                                        value={room.size}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Price"
                                        name="price"
                                        onChange={handleChange}
                                        type="number"
                                        required
                                        value={room.price}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Capacity"
                                        name="capacity"
                                        onChange={handleChange}
                                        type="number"
                                        required
                                        value={room.capacity}
                                    />
                                </Grid>

                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Description"
                                        name="description"
                                        onChange={handleChange}
                                        value={room.description}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button type="submit" onClick={close} variant="contained">
                            {`${actionType} Room`}
                        </Button>
                        <Button variant="contained" onClick={close} >
                            Cancel
                        </Button>
                    </CardActions>
                </Card>
            </form>
        </Dialog>
    )
}

export default memo(AddRoom)

