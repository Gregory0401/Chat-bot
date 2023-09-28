const express = require("express");
const ctrl = require("./ctrl");

const router = express.Router();

router.get("/", ctrl.getAll);
router.post("/", ctrl.addUser);

module.exports = router;
