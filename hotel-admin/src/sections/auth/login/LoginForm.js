import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';


// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import { login } from '../../../features/auth/authSlice';
import { loginModelSchema } from '../../../schemas';
import AlertBox from '../../../utils/Alertbox';


// ----------------------------------------------------------------------

export default function LoginForm() {
  const alert = useSelector(state => state.alerts);

  const navigate = useNavigate();
  const dispatch = useDispatch()



  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setcredentials] = useState({ email: "", password: "" })


  const { values, errors, handleBlur, handleChange, handleSubmit, touched } = useFormik({
    initialValues: credentials,
    validationSchema: loginModelSchema,
    onSubmit: (value, action) => {
      dispatch(login(value))
    },
  })

  const { admin, success, loading, error } = useSelector(state => state.admin);

  useEffect(() => {
    if (success) {
      navigate("/admin/booking");
    } else {
      navigate("/login");
    }
  }, [error, admin, success, loading]);

  return (
    <>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email address"
          helperText={errors.email && touched.email ? (errors.email) : null}
          id='email'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.email} />

        <TextField
          name="password"
          label="Password"
          helperText={errors.password && touched.password ? (errors.password) : null}
          type={showPassword ? 'text' : 'password'}
          id='password'
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton sx={{ my: 3 }} fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit}>
        Login
      </LoadingButton>
      <AlertBox alert={alert} />
    </>
  );
}
