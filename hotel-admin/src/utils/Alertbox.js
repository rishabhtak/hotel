import Alert from '@mui/material/Alert';

export default function AlertBox(props) {


    return (
        <>
            {props.alert && <Alert severity="success" sx={{ width: '40%', textTransform: 'capitalize' }}>{props.alert}</Alert>}
        </>


    );
}