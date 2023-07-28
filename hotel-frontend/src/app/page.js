import HomeCarousel from "./components/Home/HomeCarousel";
import dynamic from 'next/dynamic'

const RoomCard = dynamic(() => import('./components/Home/RoomCard'), {
  ssr: false,
});
const AboutUsContent = dynamic(() => import('./components/Home/AboutUsContent'), {
  ssr: false,
});
const Counter = dynamic(() => import('./components/Home/Counter'), {
  ssr: false,
});
const ServiceCard = dynamic(() => import('./components/Home/ServiceCard'), {
  ssr: false,
});
const TeamMembers = dynamic(() => import('./components/Home/TeamMembers'), {
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
