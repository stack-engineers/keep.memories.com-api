"use strict";
const model_connection = require("../../../model/connection/model.connection");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

module.exports = async function (request, response) {
    response.contentType = "Application/json";
    response.statusCode = Number(parseInt(201));
    const query = await model_connection.query("SELECT * FROM resources;");
    const resources = query[0];
    const { resource, category, admin, title } = request.body;
    var date = format(new Date(), "MM/dd/yyyy\tHH:mm:ss");

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
        } else {
            await model_connection.query(`
                    INSERT INTO resources (resource_url, category, resource_admin, resource_id, resource_title, upload_date)
                    VALUES (?, ?, ?, ?, ?, ?)
                `, [resource, category, admin, uuid(), title, date]);

            response.status(Number(parseInt(201)))
                .jsonp({
                    message: "resource has been uploaded!"
                });
        }
    } catch (error) {
        // console.log(error)
        response.status(Number(parseInt(500)))
            .jsonp({
                message: error.message
            });
    }
}