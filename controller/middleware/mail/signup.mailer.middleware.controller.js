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

module.exports = async function (to, subject) {
    try {
        await transporter.sendMail({
            to: to,
            subject: subject,
            html: `
                <p>This is your email verification code 
                <strong>${JSON.stringify(Math.floor(Math.random() * 15235))}</strong>
                </p>
                <p>Thank you!</p> 
                `
        });

        console.log(`sent verification code to ${to}`)
    } catch (error) {
        console.log(error);
    }
}