"use strict";
require("dotenv").config();
require("dotenv").configDotenv();
const model_connection = require("../../../model/connection/model.connection");

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

module.exports = async function (to, subject) {
    try {
        const code = Math.floor(100000 + Math.random() * 900000);
        // save code 
        await model_connection.query(`
            INSERT INTO verification_codes (email, code) VALUES (?, ?)
            `, [to, code]);

        await transporter.sendMail({
            from: process.env.MAILER,
            to: to,
            subject: subject,
            html: `
                <p>Thank you for creating up an account for our gallery. This is your email verification code <strong>${JSON.stringify(code)}</strong>. Use it to verify your account. 
                </p>
                <p>Thank you!</p> 
                `
        });

        console.log(`sent verification code to ${to}`)
    } catch (error) {
        console.log(error);
    }
}