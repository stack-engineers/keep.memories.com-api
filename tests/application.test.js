import { test, describe, it, expect } from "vitest";
const application = require("../controller/server/server.controller");
const request = require("supertest");

describe("GET /", () => {
    test("test api root route end point!", async () => {
        const response = await request(application).get("/");

        expect(response).not.toBeTypeOf("undefined");
        expect(response.statusCode).toStrictEqual(Number.parseInt(200));
        expect(response.headers["content-type"])
            .toStrictEqual(expect.stringContaining("html"))
    });
});

// tests for root route for serving resources
describe("GET /resources", () => {
    test("test api root route end point for serving resources from api db!", async () => {
        const response = await request(application).get("/resources");

        expect(response).not.toBeTypeOf("undefined");
        expect(response.statusCode).toStrictEqual(Number.parseInt(200));
        expect(response.headers["content-type"])
            .toStrictEqual(expect.stringContaining("json"))
    });
});

// tests for root route for logging users in
describe("POST /login", () => {
    test("test api root route end point for logging in user!", async () => {
        const response = await request(application).post("/login")
            .send({
                email: "ssekabirarobert037@gmail.com",
                password: "ABCabc123!"
            });

        expect(response).not.toBeTypeOf("undefined");
        expect(response.statusCode).toStrictEqual(Number.parseInt(200));
        expect(response.statusCode).not.toEqual(Number.parseInt(400));
        expect(response.headers["content-type"])
            .toStrictEqual(expect.stringContaining("json"));
    });
}); 