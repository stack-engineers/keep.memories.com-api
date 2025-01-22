"use strict";
require("dotenv").config();
require("dotenv").configDotenv();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: Boolean(true),
    auth: {
        user: process.env.MAILER,
        pass: process.env.MAILER_PASSWORD
    }
});

module.exports = async function (to, subject, message) {
    try {
        await transporter.sendMail({
            to: to,
            subject: subject,
            text: message,
            html: `
             <p>Now you have been able to log into your account using ${to}, feel free to download and save all you favorite photos from one place</p>
             <p>Keep memories photo gallery developer <a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
             <br>
             <p>Thank you.</p>
         `
        });

        console.log(`sent email to ${to}`)

    } catch (error) {
        console.log(error);
    }
}