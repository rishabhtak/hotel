import dynamic from 'next/dynamic'
import Breadcrumb from '@/components/Layout/Breadcrumb'

const ContactCard = dynamic(() => import('@/components/Contact/ContactCard'), {
    ssr: false,
})

const ContactForm = dynamic(() => import('@/components/Contact/ContactForm'), {
    ssr: false,
})

function Contact() {

    return (
        <>
            <Breadcrumb img="/slider2.jpg" pageName="contact us" />
            <div className='pb-20'>
                <ContactCard />
                <ContactForm />
            </div>
        </>
    )
}

export default Contact