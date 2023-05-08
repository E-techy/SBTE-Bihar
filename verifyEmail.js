const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(emailId,name,opt) {
    // Create a transporter with your email configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
        user: process.env.GMAIL_ID,
        pass: process.env.GMAIL_PASSWORD,
        },
    });
    
    // Configure the email options
    const mailOptions = {
        from: 'ashokamaurya4321@gmail.com',
        to:emailId,
        subject: 'SBTE-Bihar Gmail Verification',
        html:`<img src="https://sbteonline.in/VAADIN/themes/ems/img/sbte.png" alt="SBTE Logo" height="100px" width="100px"><br> <h2>Hello ${name}</h2><br><h3>Your OPT for registering to SBTE is ${opt}</h3>`
        ,
    };
    
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.log('Error sending email:', error);
        } else {
        console.log('Email sent:', info.response);
        }
    });
  
}

module.exports=sendMail;