const express = require("express");
export const publicRouter = express.Router();
const publicService = require("../controllers/PublicController");

// router.post('/editDetails',faculty.)
publicRouter.get("/get", publicService.checkHealth);
