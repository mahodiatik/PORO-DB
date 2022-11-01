const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'officialporo@gmail.com',
        pass: 'byhnzfnsjzsbynvi'
    }
});

module.exports = transporter;