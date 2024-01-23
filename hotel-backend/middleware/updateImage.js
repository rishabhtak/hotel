const RoomDetail = require('../models/RoomDetail');
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
            imageName = oldImages.images.filter(val => {
                return data.includes(val)
            })
            let removedImages = oldImages.images.filter(val => !data.includes(val) || !"undefined")
            for (let i = 0; i < removedImages.length; i++) {
                fs.unlinkSync(`public/images/rooms/${removedImages[i]}`);
            }
        }
        req.updateImageName = imageName;
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Image error', error })
    }
}

module.exports = updateImage;