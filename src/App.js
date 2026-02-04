const { hexRgbConverter } = require("./mylib")
const express = require("express")
const app = express()
//const port = 3000

//easy test postman
app.get("/", (req, res) => {
  res.send("Hello App!")
})
app.get("/color", (req, res) => {
  const { hex } = req.query

  // make sure he exists
  if (!hex) {
    return res.status(400).json({ error: "Hex is missing" })
  }

  //  make sure hex is the right format
  try {
    value = hexRgbConverter(hex)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json(value)
})

module.exports = app
