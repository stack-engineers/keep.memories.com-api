"use strict";
require("dotenv").config();
require("dotenv").configDotenv();
const format = require("date-fns").format;
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

module.exports = async function (to, subject, message) {
    try {
        await transporter.sendMail({
            from: process.env.MAILER,
            to: to,
            subject: subject,
            text: message,
            html: `
                <strong>${format(new Date(), "MM/ddd/yyyy\tHH:mm:ss")}</strong>
                <p>Email address ${to} has been used to subscribe to keep memories photos gallery newsletter. Thank you for your cooperation with us.</p>
                <p>Keep memories photo gallery developer <a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
                <br>
                <p>Thank you.</p>
            `
        });

        console.log(`sent email to ${to}`)
    } catch (error) {
        console.log(error)
    }
}