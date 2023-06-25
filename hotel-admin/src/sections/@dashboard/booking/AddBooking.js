// @mui
import { memo } from "react";
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

const AddBooking = (props) => {
    console.log("addBooking")

    const { open, close } = props;

    return (
        <Dialog open={open} onClose={close}>
            <form
                autoComplete="off"
                noValidate
            //   onSubmit={handleSubmit}
            >
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="New Booking"
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
                                        label="Full Name"
                                        name="fullName"
                                        //   onChange={handleChange}
                                        required
                                    //    value={values.fullName}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        //    onChange={handleChange}
                                        required
                                    //     value={values.email}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phone"
                                        //     onChange={handleChange}
                                        type="number"
                                        required
                                    //    value={values.phone}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Start Date"
                                        name="startDate"
                                        //     onChange={handleChange}
                                        required
                                    //    value={values.startDate}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="End Date"
                                        name="endDate"
                                        //     onChange={handleChange}
                                        required
                                    //    value={values.endDate}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Room Type"
                                        name="roomType"
                                        // onChange={handleChange}
                                        required
                                        select
                                    //   SelectProps={{ native: true }}
                                    //  value={value.roomType}
                                    >

                                        <option>
                                            Hello
                                        </option>
                                    </TextField>
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Total Person"
                                        name="totalPerson"
                                        //     onChange={handleChange}
                                        type="number"
                                        required
                                    //    value={values.totalPerson}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Total Room"
                                        name="totalRoom"
                                        //     onChange={handleChange}
                                        type="number"
                                        required
                                    //    value={values.totalRoom}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Special Request"
                                        name="specialRequest"
                                    //   onChange={handleChange}

                                    //    value={values.specialRequest}
                                    />
                                </Grid>
                                <Grid
                                    xs={12}
                                    md={6}
                                >
                                    <TextField
                                        fullWidth
                                        label="Total Amount"
                                        name="totalAmount"
                                        //     onChange={handleChange}
                                        type="number"
                                        required
                                    //    value={values.totalAmount}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <Divider />
                    <CardActions sx={{ justifyContent: 'flex-end' }}>
                        <Button variant="contained">
                            Add Booking
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

export default memo(AddBooking)