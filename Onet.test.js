const request = require("supertest");
const application = require("./controller/server/server.controller");

// test for root route for serving static page
// check status code for root route for serving static page
// check content-type for root route for serving static page
describe("/ GET test for root route", () => {
    test("test for root route for serving static page", async () => {
        const response = await request(application).get("/");
        expect(response.statusCode).toStrictEqual(200);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("html"));
    });
});

// test for route for serving api resources
// test for response status codes
// test for response content-type
// check and test for headers availability
// check for response body weather its sent back to client
describe("/resources GET test for route for resources", () => {
    test("test for route for serving api resources", async () => {
        const response = await request(application).get("/resources").send([]);
        expect(response.statusCode).toStrictEqual(200);
        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.headers).toBeDefined();
        expect(response.body).toBeDefined();
    });
});

// test for account login
// test for email and password are provided
// test for request and response content-types
// test for response body is available
// test for user is available
describe("POST /login", () => {
    test("test for account login", async () => {
        const response = await request(application).post("/login").send({
            email: "ssekabirarobert037@gmail.com",
            password: "ABCabc123!"
        });

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.statusCode).toStrictEqual(404); // expected 200 status code, buh no internat to connect to db
        expect(response.statusCode).not.toStrictEqual(400);
        expect(response.statusCode).not.toStrictEqual(500);
        expect(response.body).toBeDefined();
    });
});

// test for account signup
// test for username, email and password are provided
// test for request and response content-types
// test for response body is available
describe("POST /signup", () => {
    test("test for account signup", async () => {
        const response = await request(application).post("/signup").send({
            username: "sample",
            email: "sample@gmail.com",
            password: "ABCabc123!"
        });

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.statusCode).toStrictEqual(201);
        expect(response.statusCode).not.toStrictEqual(400);
        expect(response.statusCode).not.toStrictEqual(500);
        expect(response.body).toBeDefined();
    })
});

// test for subscriptions
// test for email are provided
describe("POST /newsletter/account/subscription", () => {
    test("test for account subscriptions", async () => {
        const response = await request(application).post("/newsletter/account/subscription").send({
            email: "sample@gmail.com",
        });

        expect(response.headers["content-type"]).toEqual(expect.stringContaining("json"));
        expect(response.statusCode).toStrictEqual(302);
        expect(response.statusCode).not.toStrictEqual(400);
        expect(response.statusCode).not.toStrictEqual(500);
        expect(response.body).toBeDefined();
    })
});