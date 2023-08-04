import Breadcrumb from '../components/Layout/Breadcrumb'
import dynamic from 'next/dynamic'

const AboutContent = dynamic(() => import('../components/About/AboutContent'), {
    ssr: false,
})
export default function About() {

    return (
        <>
            <Breadcrumb img="/slider3.jpg" pageName="about us" />
            <AboutContent />
        </>
    )
}

