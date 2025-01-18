"use strict";
const express = require("express");
const router = express();
const format = require("date-fns").format;
const { v5: uuid } = require("uuid");
const validator = require("validator");
const mailer = require("../middleware/mail/newsletter.mailer.middleware.controller");

router.route("/").post((request, response) => {
    response.contentType = "Application/json";
    response.statusCode = Number.parseInt(201);

    try {
        const { email } = request.body;

        if (!email) {
            response.status(Number.parseInt(400))
                .json({
                    message: "Please provide your email for subscription!"
                });
        } else if (!validator.isEmail(email) || validator.isEmail(email) === Boolean(false)) {
            response.status(Number.parseInt(400))
                .jsonp({
                    message: "Please provide a valid email address!"
                });
        } else {
            // save user to db for subscribers
            // make sure that the user is registered and has an account
            // send  weekly emails to the user
            mailer(email, "Weekly Newsletter Subscription", "");
            response.status(Number.parseInt(201))
                .jsonp({
                    message: "Subscribed successfully!"
                });
        }

    } catch (error) {
        response.status(Number.parseInt(500))
            .jsonp({
                message: "Error while subscribing to newsletter"
            });
    }
});

module.exports = router;