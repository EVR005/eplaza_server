const express = require("express");
const publicRouter = express.Router();
const { publicService } = require("../controllers/public/public");

publicRouter.get("/health", publicService.checkHealth);

module.exports = { publicRouter };
