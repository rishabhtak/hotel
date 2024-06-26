const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");


// storage for images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../public/images/"));
    },
    filename: function (req, file, cb) {
        const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniquesuffix + ".webp");
    },
});

// multer filter for image 
const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true);
    } else {
        cb({ message: "Unsupported file format" }, false);
    }
};

// multer for upload photo
const uploadPhoto = multer({
    storage: storage,
    fileFilter: multerFilter,
    limits: { fileSize: 1000000 },
});

const roomImgResize = async (req, res, next) => {
    if (!req.files) return next();
    sharp.cache(false);
    await Promise.all(
        req.files.map(async (file) => {
            await sharp(file.path)
                .resize(1500, 1000)
                .toFormat("webp")
                .webp({ quality: 90 })
                .toFile(`public/images/rooms/${file.filename}`);
            fs.unlinkSync(`public/images/${file.filename}`);
        })
    );
    next();
};
module.exports = { uploadPhoto, roomImgResize };
