import Alert from '@mui/material/Alert';


export default function AlertBox({ alert }) {
    return (
        <>
            {alert && <Alert severity="success" sx={{ width: '40%', textTransform: 'capitalize' }}>{alert}</Alert>}
        </>


    );
}