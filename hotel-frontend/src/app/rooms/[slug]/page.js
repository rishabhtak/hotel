import RoomDetail from "../../../components/rooms/RoomDetail";

const page = ({ params }) => {
  return <RoomDetail params={params.slug} />;
};

export default page;
