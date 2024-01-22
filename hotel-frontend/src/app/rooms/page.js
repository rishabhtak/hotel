import Breadcrumb from "../../components/layout/Breadcrumb";
import dynamic from 'next/dynamic';

const RoomCard = dynamic(() => import('@/components/rooms/RoomCard'), {
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
