var express = require("express");
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const discsCtrl = require("../controllers/discs");


router.get("/", ensureLoggedIn, discsCtrl.index); // GET /discs

router.get("/new", ensureLoggedIn, discsCtrl.new); // GET /discs/new

router.get("/:id", ensureLoggedIn, discsCtrl.show); // GET /discs/123

router.post("/", ensureLoggedIn, discsCtrl.create); // POST /discs

router.get("/:id/edit", ensureLoggedIn, discsCtrl.edit); // GET /discs/123/edit

router.put("/:id", ensureLoggedIn, discsCtrl.update); // PUT /discs/123

router.delete("/:id", ensureLoggedIn, discsCtrl.delete); // DELETE /discs/123

module.exports = router;