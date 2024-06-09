const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { promisify } = require("util");
const fs = require("fs");
const { pipeline } = require("stream");

// Use dynamic import to import multer
const multerPromise = import("multer");
let multer;

multerPromise
  .then((module) => {
    multer = module.default;
  })
  .catch((error) => {
    console.error("Error importing multer:", error);
  });

const router = express.Router();

router.post("/resume", async (req, res) => {
  try {
    // Ensure multer is available before proceeding
    if (!multer) {
      return res.status(500).json({
        message: "Multer is not available",
      });
    }

    const upload = multer();

    const { file } = req;
    if (file.detectedFileExtension != ".pdf") {
      return res.status(400).json({
        message: "Invalid format",
      });
    }

    const filename = `${uuidv4()}${file.detectedFileExtension}`;

    await pipeline(
      file.stream,
      fs.createWriteStream(`${__dirname}/../public/resume/${filename}`)
    );

    res.send({
      message: "File uploaded successfully",
      url: `/host/resume/${filename}`,
    });
  } catch (err) {
    console.error("Error while uploading resume:", err);
    res.status(400).json({
      message: "Error while uploading",
    });
  }
});

// Define a similar route for profile image upload

module.exports = router;
