"use strict";
debugger;
const model_connection = require("../../../model/connection/model.connection");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");
const { SendNotificationMail } = require("../../middleware/mail/nodemailer.middleware.controller");

module.exports = async function (request, response) {
    response.contentType = "Application/json";
    response.statusCode = Number(parseInt(201));
    const query = await model_connection.query("SELECT * FROM admin_resources;");
    const resources = query[0];
    const { resource, category, admin, title } = request.body;
    var date = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");
    const FoundAdmin = await model_connection.query("SELECT admin_username FROM admins WHERE admin_username = ?;", [admin]);

    try {
        const FoundResource = resources.find((index) => {
            return index.resource_url === resource;
        });

        if (FoundResource) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "resource already exists in database!"
                });
        } else if (!resource || !category || !admin) {
            response.status(Number(parseInt(400)))
                .jsonp({
                    message: "All fields are required!"
                });
        } else if (!FoundAdmin[0][0]) {
            response.jsonp({
                message: "Admin not found!"
            });
        } else {
            await model_connection.query(`
                    INSERT INTO admin_resources (resource_url, category, resource_admin, resource_id, resource_title, upload_date)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [resource, category, admin, uuid(), title, date]);

            request.body.share === Boolean(true) ?
                await model_connection.query(`
                    INSERT INTO resources (resource_url, category, resource_admin, resource_id, resource_title, upload_date)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [resource, category, admin, uuid(), title, date]) : (function () {
                    return;
                }());

            response.status(Number(parseInt(201)))
                .jsonp({
                    message: "resource has been uploaded!"
                });
        }
    } catch (error) {
        console.log(error)
        response.status(Number(parseInt(500)))
            .jsonp({
                message: error.message
            });
    }
} 