// @mui
import PropTypes from 'prop-types';
import { useState, useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ErrorMessage } from '@hookform/error-message';

import * as Yup from 'yup';

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
} from '@mui/material';
import UploadImage from '../../../utils/UploadImage';

// import { roomDetailModelSchema } from '../../../schemas';
import { addRoomDetail, updateRoomDetail, getRoomDetail } from '../../../features/roomDetail/roomDetailSlice';
import { setOpenModel } from '../../../features/model/modelSlice';

RoomDetailModel.propTypes = {
  actionType: PropTypes.string.isRequired,
  roomTypeArray: PropTypes.array.isRequired,
};

const imageURL = process.env.REACT_APP_HOST_IMAGE;

function RoomDetailModel({ actionType, currentRoomDetail, roomTypeArray }) {
  const { modelOpen } = useSelector((state) => state.setModel);
  const dispatch = useDispatch();

  let imageName = [];
  useEffect(() => {
    if (currentRoomDetail) {
      imageName = currentRoomDetail.images.map((image) => {
        return {
          key: image,
          url: imageURL + image,
        };
      });
    }
  }, [currentRoomDetail]);

  const checkRoomType = (value) => {
    if (actionType === 'Update') {
      return false;
    }
    // check if room type is not same as new room type
    const string = value
      .toLowerCase()
      .split(' ')
      .filter((s) => s)
      .join(' ');
    return roomTypeArray.includes(string);
  };

  const roomDetailModelSchema = Yup.object().shape({
    roomType: Yup.string()
      .min(3, 'Please enter minimum 3 characters')
      .required('Please enter a room type')
      .test('test', 'Please enter another room type', (value) => !checkRoomType(value)),
    totalRooms: Yup.number()
      .typeError('Please enter only number')
      .positive('Please enter a positive number')
      .integer('Please enter an integer number')
      .required('Please enter total rooms'),
    description: Yup.string().required('Please enter a room description'),
    images: Yup.array().min(1, 'Please upload atleast one image').required('Images is Required'),
    features: Yup.array().min(1, 'Please add atleast one Features').required('Features is Required'),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(roomDetailModelSchema),
  });

  const onSubmit = (data) => {
    if (actionType === 'Add' && currentRoomDetail === null) {
      dispatch(addRoomDetail(data));
    }
    if (actionType === 'Update' && currentRoomDetail._id) {
      data.id = currentRoomDetail._id;
      dispatch(updateRoomDetail(data));
    }
  };

  const handleModelClose = () => {
    dispatch(getRoomDetail());
    dispatch(setOpenModel(false));
  };

  return (
    <Dialog
      open={modelOpen}
      onClose={handleModelClose}
      scroll="paper"
      aria-labelledby={`${actionType.toLowerCase()}roomDetail`}
      sx={{
        zIndex: 1000,
      }}
    >
      <form autoComplete="on" onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle id={`${actionType}roomDetail`}>{`${actionType} Room Detail`}</DialogTitle>
        <DialogContent dividers>
          <Box>
            <Grid container spacing={3}>
              <Grid
                xs={12}
                md={12}
                sx={{
                  marginBottom: 3,
                }}
              >
                <Controller
                  name="roomType"
                  control={control}
                  defaultValue={currentRoomDetail ? currentRoomDetail.roomType : ''}
                  render={({ field: { ref, ...field }, fieldState: { error } }) => (
                    <TextField
                      defaultValue={currentRoomDetail ? currentRoomDetail.roomType : ''}
                      fullWidth
                      label="Room Type *"
                      id="roomType"
                      error={!!error}
                      helperText={error?.message}
                      onChange={field.onChange}
                      value={field.roomType}
                      name={field.name}
                      inputRef={field.ref}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </Grid>
              <Grid
                xs={12}
                md={12}
                sx={{
                  marginBottom: 3,
                }}
              >
                <Controller
                  name="totalRooms"
                  control={control}
                  defaultValue={currentRoomDetail ? currentRoomDetail.totalRooms : ''}
                  render={({ field: { ref, ...field }, fieldState: { error } }) => (
                    <TextField
                      defaultValue={currentRoomDetail ? currentRoomDetail.totalRooms : ''}
                      type="number"
                      fullWidth
                      label="Total Rooms *"
                      id="totalRooms"
                      error={!!error}
                      helperText={error?.message}
                      onChange={field.onChange}
                      value={field.totalRooms}
                      name="totalRooms"
                      inputRef={field.ref}
                    />
                  )}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <Controller
                  name="features"
                  control={control}
                  defaultValue={!currentRoomDetail ? [] : currentRoomDetail.features.toString().split(',')}
                  render={({ field: { ref, ...field }, fieldState: { error } }) => (
                    <Autocomplete
                      {...field}
                      defaultValue={!currentRoomDetail ? [] : currentRoomDetail.features.toString().split(',')}
                      multiple
                      options={[]}
                      onChange={(event, value) => field.onChange(value)}
                      freeSolo
                      id="features-autocomplete"
                      renderInput={(params) => (
                        <TextField
                          error={!!error}
                          helperText={error?.message}
                          label="Features *"
                          id="features"
                          name="features"
                          inputRef={ref}
                          {...params}
                        />
                      )}
                    />
                  )}
                />
                <p>Note: For add features just type and press enter!</p>
                <p>Example: Free wifi, Free breakfast etc.</p>
              </Grid>
              <Grid xs={12} md={12}>
                <h3>Upload Images *</h3>
                <Controller
                  name="images"
                  control={control}
                  defaultValue={
                    currentRoomDetail
                      ? currentRoomDetail.images.map((image) => {
                          return {
                            key: image,
                            url: imageURL + image,
                          };
                        })
                      : []
                  }
                  render={({ field: { ref, ...field } }) => (
                    <UploadImage
                      id="images"
                      name="images"
                      images={currentRoomDetail ? imageName : []}
                      onChange={(event, value) => field.onChange(event, value)}
                      inputRef={ref}
                      //   onBlur={field.onBlur}
                    />
                  )}
                />
                <ErrorMessage errors={errors} name="images" render={({ message }) => <p>{message}</p>} />
                <p>Note: Please upload only jpeg, jpg, png, webp format image!</p>
              </Grid>
              <Grid xs={12} md={12}>
                <h3>Description *</h3>
                <Controller
                  name="description"
                  control={control}
                  defaultValue={currentRoomDetail ? currentRoomDetail.description : ''}
                  render={({ field: { ref, ...field } }) => (
                    <ReactQuill
                      theme="snow"
                      defaultValue={currentRoomDetail ? currentRoomDetail.description : ''}
                      id="description"
                      onChange={(event, value) => field.onChange(event, value)}
                      inputRef={ref}
                    />
                  )}
                />
                <ErrorMessage errors={errors} name="description" render={({ message }) => <p>{message}</p>} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            {`${actionType} Room Detail`}
          </Button>
          <Button variant="contained" onClick={handleModelClose}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Dialog>
  );
}

export default memo(RoomDetailModel);
