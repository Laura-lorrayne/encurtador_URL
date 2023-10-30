require('dotenv').config()
const express = require("express")
const connectDb = require("./config/db")
const urlRoutes = require("./routes/url")

const swaggerUI = require('swagger-ui-express')
const YAML = require('yamljs')
const specs = YAML.load('./src/swagger.yml')

const app = express()

connectDb()

app.use(express.json())
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use("/", urlRoutes)

const port = process.env.PORT || 8080
app.listen(port);