"use strict";
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const model_connection = require("../../model/connection/model.connection");
const validator = require("validator");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const mailer = require("../middleware/mail/signup.mailer.middleware.controller");

router.route("/").post(async (request, response) => {
    response.statusCode = Number(parseInt(201));
    response.setHeader("Content-Type", "Application/json");
    let { username, email, password } = request.body;

    const DuplicateAdminEmail = await model_connection.query(`
        SELECT admin_email AS email FROM admins WHERE admin_email = ?
    `, [email]);

    try {
        if (DuplicateAdminEmail[0]?.length) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Email already in use!"
                });
        } else if (!username || !email || !password) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "All fields are required!"
                });
        } else if (!validator.isEmail(email)) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Invalid email address!"
                });
        } else if (!validator.isStrongPassword(password)) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "Include Upper and Lowercase characters, numbers and symbols in password plz!",
                    instructions: "Include Upper and Lowercase characters, numbers and symbols to continue!"
                });
        } else {
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(`${JSON.stringify(password)}`, salt);
            var date = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");
            const admin_id = uuid();

            await model_connection.query(`
                INSERT INTO admins (admin_id, admin_email, admin_password, date, admin_username) VALUES (?, ?, ?, ?, ?)
            `, [admin_id, email, hash, date, username]);

            await mailer(
                email, "Account Verification Code"
            );

            response.status(Number(parseInt(201)))
                .jsonp({
                    message: "Admin has been registered."
                });
        }
    } catch (error) {
        response.status(Number(parseInt(500)))
            .jsonp({
                message: error.message
            });
    }
});


module.exports = router;