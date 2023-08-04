import Breadcrumb from "../components/Layout/Breadcrumb";
import dynamic from 'next/dynamic';

const RoomCard = dynamic(() => import('../components/Rooms/RoomCard'), {
  ssr: false,
})


export default function Rooms() {
  return (
    <>
      <Breadcrumb img="/slider1.jpg" pageName="Rooms" />
      <RoomCard />
    </>

  );
}
