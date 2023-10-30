var express = require("express");
var router = express.Router();
const bagsCtrl = require("../controllers/bags");

router.get("/", bagsCtrl.index); // GET /bags

router.get("/new", bagsCtrl.new); // GET /bags/new

router.get("/:id", bagsCtrl.show); // GET /bags/123

router.post("/", bagsCtrl.create); // POST /bags

router.get("/:id/edit", bagsCtrl.edit); // GET /bags/123/edit

router.put("/:id", bagsCtrl.update); // PUT /bags/123

router.delete("/:id", bagsCtrl.delete); // DELETE /bags/123

module.exports = router;