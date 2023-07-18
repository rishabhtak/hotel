import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Booking from './pages/Booking';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import Room from './pages/Room';
import User from './pages/User';
import RoomDetail from './pages/RoomDetail';


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/admin',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/admin/booking" />, index: true },
        { path: 'booking', element: <Booking /> },
        { path: 'room', element: <Room /> },
        { path: 'roomdetail', element: <RoomDetail /> },
        { path: 'user', element: <User /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/admin/booking" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
