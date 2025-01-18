"use strict";
const express = require("express");
const router = express.Router();
require("dotenv").config();
require("dotenv").configDotenv();

router.route("/").post(async (request, response) => {
    response.statusCode = Number(parseInt(201));
    response.setHeader("Content-Type", "Application/json");
    let { a, b, c, d } = request.body;

    try {
        if (!a || !b || !c || !d) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Please provide a complete verification code!"
                });
        } else {
            response.status(Number(parseInt(200)))
                .jsonp({
                    message: "Account verified..."
                });
        }
    } catch (error) {
        response.status(Number(parseInt(500)))
            .jsonp({
                message: "Error while verifying code!"
            });
    }
});

module.exports = router;