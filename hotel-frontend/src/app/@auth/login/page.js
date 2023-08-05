import LoginForm from '@/app/components/Auth/LoginForm'
import Modal from '../../components/Utils/Modal'

async function page() {
    return (
        <Modal>
            <LoginForm />
        </Modal>
    )
}

export default page