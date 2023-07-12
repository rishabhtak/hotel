import * as Yup from 'yup'

export const roomModelSchema = Yup.object().shape({
    type: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room type"),
    description: Yup.string().min(5, "Please enter minimum 5 characters").required("Please enter a room description"),
    price: Yup.number().typeError("Please enter only number").positive("Please enter a positive number").integer("Please enter an integer number").required("Please enter a room price"),
    capacity: Yup.number().typeError("Please enter only number").positive("Please enter a positive number").integer("Please enter an integer number").required("Please enter a room capacity"),
    size: Yup.string().required("Please enter a room size")
})

export const loginModelSchema = Yup.object().shape({
    email: Yup.string().email().required("Please enter email address"),
    password: Yup.string().required("Please enter a password")
})


export const roomDetailModelSchema = Yup.object().shape({
    roomType: Yup.string().min(3, "Please enter minimum 3 characters").required("Please enter a room type"),
})