"use strict";
const express = require("express");
const router = express.Router();
const model_connection = require("../../model/connection/model.connection");
const json = require("../../model/json/api.resources.json");

router.route("/").get(async (request, response) => {
    response.contentType = "Application/json";
    response.statusCode = Number(parseInt(200));

    try {
        const query = await model_connection.query("SELECT * FROM resources;");
        const resources = query[0];

        response.status(Number(parseInt(200)))
            .jsonp(resources.length > 0 || json.length > 0 ? [...json, ...resources] : {
                message: "No resources found!"
            });

    } catch (error) {
        response.status(Number(parseInt(200)))
            .jsonp({
                message: error.message
            });
    }
});

router.use(require("../middleware/error/404.middleware.controller"));
module.exports = router;