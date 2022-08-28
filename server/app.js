const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const fs = require("fs");
const mongoose = require("mongoose");
const Font = require("./model/Font");

const { getFont, writeCss } = require("./functions");

// App setup
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(morgan("tiny"));

// Database Connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Mongodb is connected");
  }
);

// Routes
app.get("/", (req, res) => {
  res.sendFile("index.html");
});

// Sending the requested fonts
app.post("/api/font", async (req, res) => {
  const fontFamily = req.body.fontFamily;

  try {
    fontFamily.forEach((font) => {
      getFont(font);
    });
    res.status(200).json({
      status: "success",
      bundle: "created",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      bundle: "not created",
      data: error,
    });
  }
});

// Sending the styles
app.get("/api/font/style", (req, res) => {
  res.status(200).sendFile(__dirname + "/public" + "/styles.css");
});

// Upload the files to server
app.post("/api/upload/font", async (req, res) => {
  const newFont = new Font(req.body);
  try {
    // create new font object
    const savedFont = await newFont.save();
    res.status(200).json({
      status: "success",
      data: savedFont,
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: error,
    });
  }
});

// Connection
app.listen(PORT, (req, res) => {
  console.log(`Server connected to port: ${PORT}`);
});
