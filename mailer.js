const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alimurtoza.ams@gmail.com',
        pass: 'ajgcbrnmvxxahnwe'
    }
});

module.exports = transporter;