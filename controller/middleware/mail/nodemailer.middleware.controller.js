"use strict";
require("dotenv").config();
require("dotenv").configDotenv();

const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: Boolean(true),
    auth: {
        user: process.env.MAILER,
        pass: process.env.MAILER_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});

async function SendVerificationMail(to, subject) {
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
}

async function SendMail(to, subject, message) {
    await transporter.sendMail({
        to: to,
        subject: subject,
        text: message,
        html: `
            <p>Thank you for signing up to keep memories and verifying your email address. Now you have been able to log into your account, feel free to use our gallery for your own benefits and also store all your memories in one place.</p>
            <p>Keep memories photo gallery developer <a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
            <br>
            <p>Thank you.</p>
        `
    });

    console.log(`sent email to ${to}`)
}

async function SendNotificationMail(to, subject, message) {
    await transporter.sendMail({
        to: to,
        subject: subject,
        text: message,
        html: `
            <p>You have been able to upload a number of photos in your collection, plz continue using your photos gallery collection well.</p>
            <p>Keep memories photo gallery developer <a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
            <br>
            <p>Thank you.</p>
        `
    });

    console.log(`sent email to ${to}`)
}

module.exports = { SendVerificationMail, SendMail, SendNotificationMail };