import Modal from '../../components/Utils/Modal'
import SignUpForm from '@/app/components/Auth/SignupForm'
async function page() {
    return (
        <Modal>
            <SignUpForm />
        </Modal>
    )
}

export default page