"use strict";
const express = require("express");
const router = express.Router();

router.route("/").get((request, response) => {
    response.contentType = "text/html";
    response.statusCode = Number(parseInt(200));

    response.status(Number(parseInt(200)))
        .sendFile(require("node:path").join(__dirname, "../../view/index.html"))
});

router.use("/login", require("../auth/login.auth.controller"));
router.use("/signup", require("../auth/signup.auth.controller"));
router.use("/account/verification", require("../auth/code.verification.controller"));
router.use("/newsletter/account/subscription", require("./newsletter.route.controller"));

router.use(require("../middleware/error/404.middleware.controller"));
module.exports = router; 