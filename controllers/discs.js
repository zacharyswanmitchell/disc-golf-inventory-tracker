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
  const bag = await Bag.findById(req.body.bag);
  const disc = new Disc(req.body);
  bag.discs.push(disc);
  await disc.save();
  await bag.save();
  // console.log(bag);
  // console.log(disc);
  res.redirect("/discs");
}

async function edit(req, res) {
  const disc = await Disc.findById(req.params.id);
  const bags = await Bag.find({});
  res.render("discs/edit", { title: "Edit Disc", disc, bags });
}

async function update(req, res) {
  console.log(req.body);
  const disc = await Disc.findById(req.params.id);
  console.log(disc);
  if (disc.bag) {
    const oldBag = await Bag.findById(disc.bag);
    console.log(oldBag);
    oldBag.discs.remove(disc);
    await oldBag.save();
    const newBag = await Bag.findById(req.body.bag);
    console.log(newBag);
    if (newBag) {
      newBag.discs.push(disc);
      await newBag.save();
    }
    await Disc.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/discs/${disc._id}`);
  } else {
    await Disc.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/discs/${disc._id}`);
  }
}

async function deleteDisc(req, res) {
  const disc = await Disc.findById(req.params.id);
  if (disc.bag) {
    const bag = await Bag.findById(disc.bag);
    bag.discs.remove(disc);
    await bag.save();
  } else {
    await Disc.findByIdAndDelete(req.params.id);
    res.redirect("/discs");
  }
}

// Compare this snippet from views/discs/index.ejs:
