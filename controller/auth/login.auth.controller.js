"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const model_connection = require("../../model/connection/model.connection");
const jwt = require("jsonwebtoken");
require("dotenv").config();
require("dotenv").configDotenv();
const mailer = require("../middleware/mail/login.mailer.middleware.controller");
const { v4: uuid } = require("uuid");
const format = require("date-fns").format;

router.route("/").post(async (request, response) => {
    response.statusCode = Number(parseInt(201));
    response.setHeader("Content-Type", "Application/json");
    let { email, password } = request.body;

    try {
        const query = await model_connection.query("SELECT * FROM admins WHERE admin_email = ?", [email]);

        const FoundAdmin = query[0][0]
        const { admin_username, admin_email, admin_password } = FoundAdmin;

        const PasswordMatch = await bcrypt.compare(`${JSON.stringify(password)}`, admin_password);

        const token = jwt.sign({
            username: admin_username,
            email: admin_email,
        }, process.env.REFRESH_TOKEN_SECRETE_KEY, {
            expiresIn: "2d"
        });

        if (!FoundAdmin[0]?.length === Number(parseInt(0))) {
            response.status(Number(parseInt(404)))
                .jsonp({
                    message: "No such admin with email was found!"
                });
        } else if (!PasswordMatch || PasswordMatch === Boolean(false)) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Incorrect Password!"
                });
        } else if (!email || !password) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "All fields are required!"
                });
        } else {
            await mailer(
                admin_email, "Logged into account successfully."
            );
            response.status(Number(parseInt(200)))
                .jsonp({
                    login_id: uuid(),
                    username: admin_username,
                    email: admin_email,
                    token: token,
                    message: "Please wait, authentication in progress...",
                    status: "Logged in",
                    signedUp: Boolean(true),
                    date: format(new Date(), "MM/ddd/yyyy\tHH:mm:ss")
                });
        }
    } catch (error) {
        response.status(Number(parseInt(404)))
            .jsonp({
                message: "No such admin with email was found!"
            });
    }
});

module.exports = router;