import { memo } from 'react';
import PropTypes from 'prop-types';
// @mui
import {
  TableRow,
  TableCell,
} from '@mui/material';

// ----------------------------------------------------------------------

UserListBody.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.number.isRequired,
  }),
  sno: PropTypes.number.isRequired,
};



function UserListBody({ user, sno }) {
  if (user) {
    const { name, email, phone } = user;
    return (
      <>
        <TableRow tabIndex={-1} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell component="th" scope="row">
            {sno}
          </TableCell>
          <TableCell align="left" style={{ textTransform: 'capitalize' }}>{name}</TableCell>
          <TableCell align="left">{email}</TableCell>
          <TableCell align="left">{phone}</TableCell>
        </TableRow>
      </>
    )
  }
}

export default memo(UserListBody)
