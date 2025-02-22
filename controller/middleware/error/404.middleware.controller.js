"use strict";
debugger;
const path = require("node:path");

module.exports = async function (request, response) {
    response.statusCode = Number(parseInt(404));
    response.contentType = ["text/html", "text/plain", "application/json"];

    if (request.accepts("text/html")) {
        response.status(Number(parseInt(404)))
            .sendFile(path.join(__dirname, "../../../view/404.html"));
    } else if (request.accepts("application/json")) {
        response.status(Number(parseInt(404)))
            .jsonp({
                message: "404 Not Found!"
            });
    } else if (request.accepts("text/plain")) {
        response.status(Number(parseInt(404)))
            .send(String("404 Not Found!"));
    }
};