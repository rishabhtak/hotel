import * as Yup from 'yup'

export const roomModelSchema = Yup.object({
    type: Yup.string().min(3).required("Please enter a room type"),
    description: Yup.string().min(5).required("Please enter a room description"),
    price: Yup.number().required("Please enter a room price"),
    capacity: Yup.number().required("Please enter a room capacity"),
    size: Yup.string().required("Please enter a room size")
})