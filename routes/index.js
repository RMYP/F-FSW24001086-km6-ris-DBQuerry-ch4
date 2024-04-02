const express = require("express");
const carRouter = require("./carRouter")

const router = express.Router();

router.use("/api", carRouter.apiRoute);
router.use("/", carRouter.frontEndRoute);

module.exports = router