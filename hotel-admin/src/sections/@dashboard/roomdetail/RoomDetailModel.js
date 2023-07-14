// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo, useCallback } from 'react';
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
import { addRoomDetail } from '../../../features/roomDetail/roomDetailSlice';
import { setOpenModel } from '../../../features/model/modelSlice';


RoomDetailModel.propTypes = {
    actionType: PropTypes.string.isRequired,
    roomTypeArray: PropTypes.array.isRequired
}




function RoomDetailModel({ actionType, currentRoomDetail, roomTypeArray }) {
    const { modelOpen } = useSelector(state => state.setModel)

    const dispatch = useDispatch()
    const [features, setFeatures] = useState([
        'Free Wifi'
    ])

    const [images, setImages] = useState([])
    /*  const [roomDetail, setRoomDetail] = useState({
          description: "",
          roomType: "",
          features: [],
          images: [],
      }) */


    /* useEffect(() => {
         if (currentRoomDetail === null) {
             setRoomDetail({
                 description: "",
                 roomType: "",
                 features: ["Free Wifi"],
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
     }, [currentRoomDetail]) */




    const validate = (value) => {
        //  let isExistRoomType = false;
        const string = value.toLowerCase().split(' ').filter(s => s).join(' ');
        return roomTypeArray.includes(string);

    }

    const roomDetailModelSchema = Yup.object().shape({
        roomType: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room type").test(
            "test",
            "Please enter another room type",
            (value) => !validate(value)
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
    }, [features, images]);

    const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
        enableReinitialize: true,
        initialValues: {
            roomType: '',
            description: '',
            images: '',
            features: ''
        },
        validationSchema: roomDetailModelSchema,
        onSubmit: (value, action) => {
            console.log(value)
            action.resetForm()
        },
    })

    console.log(errors)

    const handleFeatureChange = (event, value) => {
         setFeatures(value)
    }

    const handleImageUpload = (images) => {
         setImages(images)
    }

    const defaultFeatures = [
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
                                    //    onChange={handleRoomTypeChange}
                                    //   value={roomDetail.roomType}
                                    onBlur={handleBlur("roomType")}
                                    onChange={handleChange}

                                    value={values.roomType}
                                />
                            </Grid>
                            <Grid xs={12} md={12} >
                                <Autocomplete
                                    multiple
                                    name="features"
                                    options={defaultFeatures.map((option) => option.title)}
                                    filterSelectedOptions
                                     defaultValue={[defaultFeatures[0].title]}
                                    onChange={handleFeatureChange}
                                    onBlur={handleBlur}
                                    freeSolo
                                    renderTags={(value, getTagProps) =>
                                        value.map((option, index) => (
                                            <Chip label={option} {...getTagProps({ index })} />
                                        ))
                                    }
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Features *"
                                            id="features"
                                            name="features"
                                            helperText={errors.features && touched.features ? (errors.features) : null}
                                        />
                                    )}
                                />
                                <p>Note: For add features just type and press enter!</p>

                            </Grid>

                            <Grid xs={12} md={12} >
                                <h3>Upload Images *</h3>
                                <UploadImage handleImageUpload={handleImageUpload} />
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

