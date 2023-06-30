import Alert from '@mui/material/Alert';



export default function AlertBox({ alert }) {
    const { message, type } = alert;
    return (
        <>
            {message && <Alert severity={`${type}`} sx={{ width: '40%', textTransform: 'capitalize' }}>{message}</Alert>}
        </>


    );
}