"use strict";
const jwt = require("jsonwebtoken");
const modelConnection = require("../../../model/connection/model.connection");
require("dotenv").config();
require("dotenv").configDotenv();

module.exports = async function (request, response, next) {
    try {
        const authorizationHeaders = request.headers["authorization"];
        const token = authorizationHeaders.split(" ")[1];
        const tokenUser = jwt.verify(token, process.env.REFRESH_TOKEN_SECRETE_KEY);
        const FoundUser = await modelConnection.query(`
            SELECT id FROM users WHERE id = ?
        `, [tokenUser.id]);

        if (jwt.decode(token) === null) {
            response.status(Number(parseInt(403)))
                .jsonp({
                    message: "Token is invalid or unauthorized!"
                });
        } else if (!token || typeof token === "undefined") {
            response.status(Number(parseInt(401)))
                .jsonp({
                    message: "token is undefined or not provided!"
                });
        } else if (!FoundUser[0]?.length || !FoundUser[0].length === Number(parseInt(0))) {
            response.status(Number(parseInt(404)))
                .jsonp({
                    message: "token user not found!"
                });
        } else {
            next();
            request.user = FoundUser;
        }
    } catch (error) {
        response.status(Number(parseInt(401)))
            .jsonp({
                message: "token is undefined or not provided!"
            });
    }
};