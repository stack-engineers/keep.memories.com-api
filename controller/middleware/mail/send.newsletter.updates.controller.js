"use strict";
debugger;
require("dotenv").config();
require("dotenv").configDotenv();
const model_connection = require("../../../model/connection/model.connection");
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

module.exports = async function sendUpdate() {
    try {
        const query = await model_connection.query("SELECT * FROM subscribers");
        const subscribers = query[0];

        subscribers.forEach(async (subscriber) => {
            await transporter.sendMail({
                from: process.env.MAILER,
                to: subscriber.email,
                subject: "Keep Memories Newsletter Updates",
                html: `
                    <strong>${format(new Date(), "MM/ddd/yyyy\tHH:mm:ss")}</strong>
                    <p>
                    Hi user,
                    Thank you for subscribing to <a href="https://keep-memories.netlify.app">Keep Memories</a>! We're excited to have you on board. Get ready to enjoy exclusive content & special offers.
                    If you have any questions or need support, feel free to reach out to us at support@email.com. In the meantime, explore our collection of photos <a href="https://keep-memories.netlify.app/photos/categories/collection" target="_blank">collection</a>.
                    Welcome aboard!
                    </p>
                    <p>
                    Best Regards,
                    </p>
                    <a><a href="https://robertsims.netlify.app" target="_blank">robert sims</a></p>
                    <a><a href="https://keep-memories.netlify.app">Keep Memories</a></p>
                    `
            });

            console.log(`sent verification code to ${subscriber.email}`)
        });

    } catch (error) {
        console.log(error);
    }
}