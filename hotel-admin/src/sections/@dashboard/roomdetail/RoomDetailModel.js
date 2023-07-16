// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup'

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
import UploadImage from '../../../utils/UploadImage';

// import { roomDetailModelSchema } from '../../../schemas';
import { addRoomDetail, updateRoomDetail, getRoomDetail } from '../../../features/roomDetail/roomDetailSlice';
import { setOpenModel } from '../../../features/model/modelSlice';


RoomDetailModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    roomTypeArray: PropTypes.array.isRequired
}


const imageURL = "http://localhost:5000/public/images/rooms/";

function RoomDetailModel({ actionType, currentRoomDetail, roomTypeArray }) {
    const { modelOpen } = useSelector(state => state.setModel)
    const dispatch = useDispatch()
    const [features, setFeatures] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        if (currentRoomDetail) {
            setFeatures(currentRoomDetail.features);
            const imageName = currentRoomDetail.images.map((image) => {
                return {
                    key: image,
                    url: imageURL + image
                }
            })
            setImages(imageName);
        }
    }, [currentRoomDetail])


    const checkRoomType = (value) => {
        if (actionType === "Update") {
            return false;
        }
        // check if room type is not same as new room type
        const string = value.toLowerCase().split(' ').filter(s => s).join(' ');
        return roomTypeArray.includes(string);
    }

    const roomDetailModelSchema = Yup.object().shape({
        roomType: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room type").test(
            "test",
            "Please enter another room type",
            (value) => !checkRoomType(value)
        ),
        description: Yup.string().required("Please enter a room description"),
        features: Yup
            .array()
            .min(1, "Please add atleast one Features")
            .required("Features is Required"),
        images: Yup
            .array()
            .min(1, "Please add atleast one image")
            .required("Images is Required"),
    })

    useEffect(() => {
        values.features = features;
        values.images = images;
    }, [features, images, currentRoomDetail]);

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        enableReinitialize: true,
        initialValues: {
            roomType: currentRoomDetail ? currentRoomDetail.roomType : "",
            description: currentRoomDetail ? currentRoomDetail.description : "",
            images: currentRoomDetail ? images : "",
            features: currentRoomDetail ? features : "",
        },
        validationSchema: roomDetailModelSchema,
        onSubmit: (value, action) => {
            if (actionType === "Add") {
                dispatch(addRoomDetail(value))
            }
            if (actionType === "Update") {
                value.id = currentRoomDetail._id
                dispatch(updateRoomDetail(value))
            }
            action.resetForm()
        },
    })

    const handleFeatureChange = (event, value) => {
        setFeatures(value)
    }

    const handleImageUpload = (images) => {
        setImages(images)
    }

    /*   const defaultFeatures = [
           { title: 'Free Wifi' },
           { title: 'Free Breakfast' },
           { title: 'Free Coffee' },
       ]; */

    const handleModelClose = () => {
        dispatch(setOpenModel(false))
        dispatch(getRoomDetail())
    }

    return (
        <Dialog
            open={modelOpen}
            onClose={handleModelClose}
            scroll='paper'
            aria-labelledby={`${actionType} Room Detail`}
            sx={{
                zIndex: 1000,
            }}

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
                                sx={{
                                    marginBottom: 3
                                }}
                            >
                                <TextField
                                    fullWidth
                                    label="Room Type"
                                    id='roomType'
                                    name="roomType"
                                    helperText={errors.roomType && touched.roomType ? (errors.roomType) : null}
                                    onBlur={handleBlur("roomType")}
                                    onChange={handleChange}

                                    value={values.roomType}
                                />
                            </Grid>
                            <Grid xs={12} md={12} >
                                <Autocomplete
                                    multiple
                                    options={[]}
                                    filterSelectedOptions
                                    defaultValue={currentRoomDetail ? currentRoomDetail.features.toString().split(',') : []}
                                    onChange={handleFeatureChange}
                                    freeSolo
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Features *"
                                            name='features'
                                        />
                                    )}
                                />
                                <p>Note: For add features just type and press enter!</p>
                                <p>Example: Free wifi, Free breakfast etc.</p>
                                <p>{errors.features && touched.features ? (errors.features) : ""}</p>

                            </Grid>

                            <Grid xs={12} md={12} >
                                <h3>Upload Images *</h3>
                                <UploadImage handleImageUpload={handleImageUpload} images={images} />
                                <p>Note: Please upload only jpeg, jpg, png, webp format image!</p>
                                <p>{errors.images && touched.images ? (errors.images) : ""}</p>
                            </Grid>
                            <Grid xs={12} md={12}>
                                <h3>Description *</h3>
                                <ReactQuill theme="snow"
                                    name="description"
                                    id="description"
                                    onChange={handleChange("description")}
                                    value={values.description}
                                />
                                <p>{errors.description && touched.description ? (errors.description) : ""}</p>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button type="submit"
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

