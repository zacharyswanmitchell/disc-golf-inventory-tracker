var express = require("express");
var router = express.Router();
const discsCtrl = require("../controllers/discs");

router.get("/", discsCtrl.index); // GET /discs

router.get("/new", discsCtrl.new); // GET /discs/new

router.get("/:id", discsCtrl.show); // GET /discs/123

router.post("/", discsCtrl.create); // POST /discs

router.get("/:id/edit", discsCtrl.edit); // GET /discs/123/edit

router.put("/:id", discsCtrl.update); // PUT /discs/123

router.delete("/:id", discsCtrl.delete); // DELETE /discs/123

module.exports = router;