"use strict";
const cors = require("cors");
const allowedOrigins = [
    "https://keep-memories.netlify.app"
]

module.exports = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by cors"))
        }
    },
    credentials: true,
    optionsSuccessStatus: 200
}