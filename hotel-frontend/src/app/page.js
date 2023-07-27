import HomeCarousel from "./components/HomeCarousel";
import TeamMembers from "./components/TeamMembers";
import dynamic from 'next/dynamic'

const RoomCard = dynamic(() => import('./components/RoomCard'), {
  ssr: false,
})
const AboutUsContent = dynamic(() => import('./components/AboutUsContent'), {
  ssr: false,
})
const Counter = dynamic(() => import('./components/Counter'), {
  ssr: false,
})
const ServiceCard = dynamic(() => import('./components/ServiceCard'), {
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
