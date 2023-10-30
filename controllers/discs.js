const Disc = require("../models/disc");
const Bag = require("../models/bag");

module.exports = {
  index,
  new: newDisc,
  show,
  create,
  edit,
  update,
  delete: deleteDisc,
};

async function index(req, res) {
  const discs = await Disc.find({});
  res.render("discs/index", { title: "All Discs", discs });
}

async function newDisc(req, res) {
  const bags = await Bag.find({});
  res.render("discs/new", { title: "Add Disc", bags });
}

async function show(req, res) {
  const disc = await Disc.findById(req.params.id).populate("bag");
  res.render("discs/show", { title: "Disc Details", disc });
}

async function create(req, res) {
  const disc = new Disc(req.body);
  await disc.save();
  res.redirect("/discs");
}

async function edit(req, res) {
  const disc = await Disc.findById(req.params.id);
  const bags = await Bag.find({});
  res.render("discs/edit", { title: "Edit Disc", disc, bags });
}

function update(req, res) {
  Disc.findByIdAndUpdate(req.params.id, req.body, function (err, disc) {
    res.redirect(`/discs/${disc._id}`);
  });
}

function deleteDisc(req, res) {
  Disc.findByIdAndDelete(req.params.id, function (err, disc) {
    res.redirect("/discs");
  });
}

// Compare this snippet from views/discs/index.ejs:
