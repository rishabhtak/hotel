const RoomDetail = require('../models/RoomDetail');
// const ObjectId = require("bson");
const fs = require('fs');


const updateImage = async (req, res, next) => {
    try {
        const data = req.body.images;
        const oldImages = await RoomDetail.findById(req.params.id);
        let imageName = [];
        if (data === "undefined" || data === null || data === undefined) {
            for (let i = 0; i < oldImages.images.length; i++) {
                fs.unlinkSync(`public/images/rooms/${oldImages.images[i]}`);
            }
        }
        else {
            /*   imageName = oldImages.images.filter(val => {
                   return data.includes(val)
               })
               let removedImages = oldImages.images.filter(val => !data.includes(val)||!"undefined")
               for (let i = 0; i < removedImages.length; i++) {
                   fs.unlinkSync(`public/images/rooms/${removedImages[i]}`);
               }
            */
            const set = new Set([...data, ...oldImages.images]);
            set.forEach(value => {
                if (value === "undefined") {
                    return; // Skip undefined values
                }
                if (data.includes(value) && oldImages.images.includes(value)) {
                    imageName.push(value);
                } else {
                    fs.unlinkSync(`public/images/rooms/${value}`);
                }
            });

        }

        req.updateImageName = imageName;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Some error' })
    }
}

module.exports = updateImage;