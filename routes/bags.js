var express = require("express");
var router = express.Router();
const ensureLoggedIn = require('../config/ensureLoggedIn');
const bagsCtrl = require("../controllers/bags");

router.get("/", ensureLoggedIn, bagsCtrl.index); // GET /bags

router.get("/shelf", ensureLoggedIn, bagsCtrl.shelf); // GET /bags/shelf

router.get("/new", ensureLoggedIn, bagsCtrl.new); // GET /bags/new

router.get("/:id", ensureLoggedIn, bagsCtrl.show); // GET /bags/123

router.post("/", ensureLoggedIn, bagsCtrl.create); // POST /bags

router.get("/:id/edit", ensureLoggedIn, bagsCtrl.edit); // GET /bags/123/edit

router.put("/:id", ensureLoggedIn, bagsCtrl.update); // PUT /bags/123

router.delete("/:id", ensureLoggedIn, bagsCtrl.delete); // DELETE /bags/123

module.exports = router;