const {GridFsStorage} = require('multer-gridfs-storage');
const mongoose = require("mongoose")
const Grid = require('gridfs-stream');
const multer = require('multer');
const crypto = require('crypto');

const connection_url = process.env.DB_CONNECTION_URL;

// Create Storage 
// Create storage engine
const storage = new GridFsStorage({
    url: connection_url,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname;
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads'
                };
                resolve(fileInfo);
            });
        });
    }
});
const upload = multer({ storage });
module.exports.upload = upload;