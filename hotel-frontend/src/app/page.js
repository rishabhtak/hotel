import HomeCarousel from "../components/home/HomeCarousel";
import dynamic from 'next/dynamic'

const RoomCard = dynamic(() => import('@/components/home/RoomCard'), {
  ssr: false,
});
const AboutUsContent = dynamic(() => import('@/components/home/AboutUsContent'), {
  ssr: false,
});
const Counter = dynamic(() => import('@/components/home/Counter'), {
  ssr: false,
});
const ServiceCard = dynamic(() => import('@/components/home/ServiceCard'), {
  ssr: false,
});
const TeamMembers = dynamic(() => import('@/components/home/TeamMembers'), {
  ssr: false,
})
export default function Home() {

  return (
    <>
      <HomeCarousel />
      <AboutUsContent />
      <RoomCard />
      <Counter />
      <ServiceCard />
      <TeamMembers />
    </>
  );
}
