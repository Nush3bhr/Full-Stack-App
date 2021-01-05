const express = require("express");
const mongoose = require("mongoose");
cors = require("cors");

const bodyParser = require("body-parser");

const items = require("./routes/api/items");

const app = express();
app.use(cors());
//BodyParser Middleware
app.use(bodyParser.json());

//Connect to Mongo
mongoose
  .connect("mongodb+srv://nush:nush@cluster0.zw2cb.mongodb.net/learning", {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/items", items);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port " + port));
