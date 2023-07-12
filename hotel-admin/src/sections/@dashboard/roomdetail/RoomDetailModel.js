// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Box,
    Unstable_Grid2 as Grid,
    Divider,
    CardActions,
    TextField,
    Button,
    Autocomplete,
    Chip
} from '@mui/material';
import { roomDetailModelSchema } from '../../../schemas';

// import { addRoom, updateRoom } from '../../../features/room/roomSlice';
import { setOpenModel } from '../../../features/model/modelSlice';


RoomDetailModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    roomTypeArray: PropTypes.array.isRequired
}



function RoomDetailModel({ actionType, currentRoomDetail, roomTypeArray }) {
    const { modelOpen } = useSelector(state => state.setModel)

    const dispatch = useDispatch()
    const [roomDetail, setRoomDetail] = useState({
        description: '',
        roomType: "",
        features: [],
        images: [],
    })

    useEffect(() => {
        if (currentRoomDetail === null) {
            setRoomDetail({
                description: '',
                roomType: "",
                features: [],
                images: [],
            })
        }
        else {
            setRoomDetail({
                id: currentRoomDetail._id,
                description: currentRoomDetail.description,
                type: currentRoomDetail.roomType,
                features: currentRoomDetail.features,
                images: currentRoomDetail.images,
            })
        }
    }, [currentRoomDetail])

    const handleRoomTypeChange = (event) => {
        console.log(event.target.value)
        setRoomDetail({
            ...roomDetail, [event.target.name]: event.target.value
        })
    }
    const handleFeatureChange = (event, value) => {
        setRoomDetail({
            ...roomDetail, features: value
        })
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roomDetail)
    }


    //   let isExistRoomType = false;
    /*  if (values.roomType) {
          const string = values.roomType.split(' ').filter(s => s).join(' ');
          isExistRoomType = roomTypeArray.includes(string);
  
      } */

    const addFeatures = [
        { title: 'Free Wifi' },
        { title: 'Free Breakfast' },
        { title: 'Free Coffee' },
    ];



    const handleModelClose = () => dispatch(setOpenModel(false));

    return (
        <Dialog
            open={modelOpen}
            onClose={handleModelClose}
            scroll='paper'
            aria-labelledby={`${actionType} Room Detail`}
        >
            <form
                autoComplete="on"
                onSubmit={handleSubmit}
            >
                <DialogTitle id={`${actionType} Room Detail`}>{`${actionType} Room Detail`}</DialogTitle>
                <DialogContent dividers>
                    <Box>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Room Type"
                                    id='roomType'
                                    name="roomType"
                                    onChange={handleRoomTypeChange}
                                    value={roomDetail.roomType}
                                />
                            </Grid>
                            <Grid xs={12} md={12} >
                                <Autocomplete
                                    multiple
                                    options={addFeatures.map((option) => option.title)}
                                    filterSelectedOptions
                                    onChange={handleFeatureChange}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Features"
                                            id="features"
                                            name="features"
                                            value={roomDetail.features}
                                        />
                                    )}
                                />
                                <p>Note: For add features just type and press enter!</p>
                            </Grid>

                        </Grid>
                    </Box>
                </DialogContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type="submit"
                        // onClick={handleSubmit}
                        variant="contained">
                        {`${actionType} Room Detail`}
                    </Button>
                    <Button variant="contained" onClick={handleModelClose} >
                        Cancel
                    </Button>
                </CardActions>
            </form>
        </Dialog>
    )
}

export default memo(RoomDetailModel)

