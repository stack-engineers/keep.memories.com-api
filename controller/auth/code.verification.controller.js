"use strict";
const express = require("express");
const router = express.Router();
require("dotenv").config();
require("dotenv").configDotenv();
const model_connection = require("../../model/connection/model.connection");

router.route("/").post(async (request, response) => {
    response.statusCode = Number(parseInt(201));
    response.setHeader("Content-Type", "Application/json");
    let { code } = request.body;
    const code_query = await model_connection.query(`
        SELECT code FROM verification_codes WHERE code = ?
        `, [code]);

    try {
        if (!code) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Please provide a complete verification code!"
                });
        } else if (code_query[0][0]?.length === 0 || !code_query[0][0]) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Invalid code!"
                });
        } else {
            response.status(Number(parseInt(200)))
                .jsonp({
                    message: "Account has been verified successfully..."
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