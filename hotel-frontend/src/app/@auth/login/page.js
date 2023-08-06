import Modal from '@/components/modal/Modal'
import LoginForm from '@/components/auth/LoginForm'

export default async function Login() {
    return (
        <Modal>
            <LoginForm />
        </Modal>
    )
}