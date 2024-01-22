import Breadcrumb from '../../components/layout/Breadcrumb'
import CheckAvailabilty from '../../components/booking/CheckAvailabilty'
import AvailableRoom from '../../components/booking/AvailableRoom'

export default function Booking() {
    return (
        <>
            <Breadcrumb img="/booking.jpg" pageName="booking" />
            <CheckAvailabilty />
            <AvailableRoom />
        </>
    )
}
