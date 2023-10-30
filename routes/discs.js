var express = require("express");
var router = express.Router();
const discsCtrl = require("../controllers/discs");

router.get("/", discsCtrl.index);

router.get("/new", discsCtrl.new);

router.get("/:id", discsCtrl.show);

router.post("/", discsCtrl.create);