import dynamic from 'next/dynamic'
import Breadcrumb from '@/components/layout/Breadcrumb'

const ContactCard = dynamic(() => import('@/components/contact/ContactCard'), {
    ssr: false,
})

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
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