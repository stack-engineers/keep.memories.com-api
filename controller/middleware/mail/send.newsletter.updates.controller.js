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

module.exports = async function () {
    try {
        const query = await model_connection.query("SELECT * FROM subscribers");
        const subscribers = query[0];

        subscribers.forEach((subscriber) => {
            global.setInterval(async () => {
                await transporter.sendMail({
                    from: process.env.MAILER,
                    to: subscriber.email,
                    subject: "Keep Memories Updates Newsletter",
                    html: `
                        <p>
                            Hello ${subscriber.admin_username},
                            we are glad to inform you that we have new updates on our website
                            <a href="https://keep-memories.netlify.app">Keep Memories</a>
                            we have new features and updates that you can check out.
                        </p>
                        <p>Keep memories photo gallery developer <a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
                        <br>
                        <p>Thank you.</p>
                        `
                });

                console.log(`sent verification code to ${subscriber.email}`)

            }, 1000 * 60 * 60 * 24 * 7);
            // }, 1000 * 60 * 60 * 24 * 7);
        });

    } catch (error) {
        console.log(error);
    }
}