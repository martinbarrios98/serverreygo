require('dotenv').config({path: 'variables.env'});
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ventasreygo@gmail.com', // generated ethereal user
        pass: process.env.PASSWORD_NODEMAILER  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
});

transporter.verify().then( () => {
    console.log('Servico SMTP listo para enviar correos ... ');
});

module.exports = transporter;