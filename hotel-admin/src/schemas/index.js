import * as Yup from 'yup'


export const roomModelSchema = Yup.object().shape({
    roomType: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room type"),
    name: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room name"),
    description: Yup.string(),
    price: Yup.number().typeError("Please enter only number").positive("Please enter a positive number").integer("Please enter an integer number").required("Please enter a room price"),
    capacity: Yup.number().typeError("Please enter only number").positive("Please enter a positive number").integer("Please enter an integer number").required("Please enter a room capacity"),
})

export const loginModelSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter email address"),
    password: Yup.string().required("Please enter a password")
})

