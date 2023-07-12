// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'Bookings',
    path: '/admin/booking',
    icon: icon('ic_booking'),
  },
  {
    title: 'room',
    path: '/admin/room',
    icon: icon('ic_user'),
  },
  {
    title: 'room details',
    path: '/admin/roomdetail',
    icon: icon('ic_user'),
  },
  {
    title: 'user',
    path: '/admin/user',
    icon: icon('ic_user'),
  },
];

export default navConfig;
