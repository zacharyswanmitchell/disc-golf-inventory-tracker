const Disc = require("../models/disc");
const Bag = require("../models/bag");

module.exports = {
  index,
  new: newBag,
  show,
  create,
  edit,
  update,
  delete: deleteBag,
};

async function index(req, res) {
  const bags = await Bag.find({});
  res.render("bags/index", { title: "All Bags", bags });
}

async function newBag(req, res) {
  res.render("bags/new", { title: "Add Bag" });
}

async function show(req, res) {
  const bag = await Bag.findById(req.params.id).populate("discs");
  res.render("bags/show", { title: "Bag Details", bag });
}

async function create(req, res) {
  const bag = new Bag(req.body);
  await bag.save();
  res.redirect("/bags");
}

async function edit(req, res) {
  const bag = await Bag.findById(req.params.id);
  res.render("bags/edit", { title: "Edit Bag", bag });
}

async function update(req, res) {
  const bag = await Bag.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/bags/${bag._id}`);
}

async function deleteBag(req, res) {
  const bag = await Bag.findById(req.params.id);
  if (bag.discs.length > 0) {
    const disc = await Disc.findById(bag.discs[0]);
    disc.bag = null;
    await disc.save();
  }
  await Bag.findByIdAndDelete(req.params.id);
    res.redirect("/bags");
};
