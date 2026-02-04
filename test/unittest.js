// 01.02.2026  unittest
const { expect } = require("chai")
const { hexRgbConverter } = require("../src/mylib")

const request = require("supertest") // node supertest for intergration test (npm install supertest --save-dev)
const app = require("../src/App") // import the Express app for integration testing

// test mylib.js functions
describe("mylib.js (expect skeleton)", () => {
  describe("hexRgbConverter()", () => {
    it("should convert hex color to RGB", () => {
      const result = hexRgbConverter("#E00DB9")
      expect(result).to.deep.equal({ r: 224, g: 13, b: 185 })
    })
    it("should throw an error for invalid hex color", () => {
      expect(() => hexRgbConverter("#XYZ")).to.throw("Invalid hex color format")
    })
  })
})
// full app intergration test with supertest
describe("Full integration test with node supertest", () => {
  describe("GET /color", () => {
    it("should return 200 and correct text", async () => {
      await request(app)
        .get("/") //supertest request to the app
        .expect(200)
        .expect("Hello App!")
    })
    //Let's test endpoint /color when all is valid
    it("should return 200 and correct rgb and content type JSON", async () => {
      await request(app)
        .get("/color") //supertest request to the app
        .query({ hex: "ffffff" })
        .expect(200)
        .expect("Content-Type", /json/)
        .expect({ r: 255, g: 255, b: 255 })
    })
    //Let's test endpoint /color when hex is missing
    it("should return 400 for missing hex query parameter", async () => {
      await request(app)
        .get("/color") //supertest request to the app
        .expect(400)
        .expect("Content-Type", /json/)
        .expect({ error: "Hex is missing" })
    })
    //Let's test if app expands 3 digit hex correctly
    it("should correctly expand 3 digit hex", async () => {
      await request(app)
        .get("/color")
        .query({ hex: "03f" })
        .expect(200)
        .expect({ r: 0, g: 51, b: 255 })
    })
    //Lets test for not allowed hex characters
    it("should return 400 and error message for characters not allowed", async () => {
      await request(app)
        .get("/color")
        .query({ hex: "G12345" }) // G is not valid hex
        .expect(400)
        .expect({ error: "Invalid hex color format" })
    })
    //Lets test for incorrect hex length
    it("should return 400 for incorrect hex length (e.g., 5 digits)", async () => {
      await request(app).get("/color").query({ hex: "abcde" }).expect(400)
    })

    it("should throw an error for invalid hex color", () => {
      expect(() => hexRgbConverter("#XYZ")).to.throw("Invalid hex color format")
    })
  })
})
