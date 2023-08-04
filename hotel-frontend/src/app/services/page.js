import Breadcrumb from '../components/Layout/Breadcrumb';
import dynamic from 'next/dynamic';

const ServiceCard = dynamic(() => import('../components/Services/ServicesCard'), {
  ssr: false,
})



export default function Services() {

  return (
    <>
      <Breadcrumb img="/slider2.jpg" pageName="services" />
      <ServiceCard />
    </>

  )
}

