var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
require('dotenv').config()
var app = express()
var port = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors())
app.use(
  bodyParser.urlencoded({ extended: false })
)

var Users = require("./routes/users")
var Orders = require("./routes/orders")
var Shoppers = require("./routes/shoppers")

app.use("/users", Users)
app.use("/orders", Orders)
app.use("/shoppers", Shoppers)

app.listen(port, function () {
  console.log("Server is running on port " + port)
})