"use strict";
const express = require("express");
const router = express();
const format = require("date-fns").format;
const { v5: uuid } = require("uuid");
const validator = require("validator");
const mailer = require("../middleware/mail/newsletter.mailer.middleware.controller");
const model_connection = require("../../model/connection/model.connection");
const sendUpdates = require("../middleware/mail/send.newsletter.updates.controller");
sendUpdates();

router.route("/").post(async (request, response) => {
    response.contentType = "Application/json";
    response.statusCode = Number.parseInt(201);

    try {
        const { email } = request.body;
        const query = await model_connection.query("SELECT * FROM admins WHERE admin_email = ?", [email]);
        const FoundSubscriber = await model_connection.query("SELECT * FROM subscribers WHERE email = ?", [email]);

        if (!email) {
            response.status(Number.parseInt(400))
                .json({
                    message: "Please provide your email for subscription!"
                });
        } else if (!query[0][0]?.admin_email) {
            response.status(Number.parseInt(400))
                .jsonp({
                    message: "Sorry no such admin was found for subscription with email!"
                });

        } else if (!validator.isEmail(email) || validator.isEmail(email) === Boolean(false)) {
            response.status(Number.parseInt(400))
                .jsonp({
                    message: "Please provide a valid email address!"
                });
        } else if (FoundSubscriber[0]?.length) {
            response.contentType = "plain/html";
            response.status(Number.parseInt(400))
                .jsonp(`
                    <h1>Sorry, you are already subscribed to our newsletter!</h1>
                    `);
        } else {
            await model_connection.query("INSERT INTO subscribers (email, subscription_date) VALUES (?, ?)", [email, format(new Date(), "yyyy-MM-dd")]);

            mailer(email, "Newsletter Subscription", "");

            response.status(Number.parseInt(302))
                .redirect("https://keep-memories.netlify.app");
        }

    } catch (error) {
        console.log(error)
        response.status(Number.parseInt(500))
            .jsonp({
                message: "Error while subscribing to newsletter"
            });
    }
});

module.exports = router;