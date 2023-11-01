const Disc = require("../models/disc");
const Bag = require("../models/bag");
const User = require("../models/user");

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
  const shelf = await User.findById(req.user._id).shelf;
  res.render("discs/new", { title: "Add Disc", bags, shelf });
}

async function show(req, res) {
  const disc = await Disc.findById(req.params.id).populate("bag");
  res.render("discs/show", { title: "Disc Details", disc });
}

async function create(req, res) {
  try {
    const user = await User.findById(req.user._id);
    const shelf = user.shelf;
    const disc = new Disc(req.body);
    await disc.save();
    if (req.body.bag._id === shelf._id.toString()) {
      shelf.discs.push(disc);
      await shelf.save();
    } else {
      const bag = await Bag.findById(req.body.bag);
      if (bag) {
        bag.discs.push(disc);
        await bag.save();
      }
    }
    res.redirect("/discs");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating the disc");
  }
}

async function edit(req, res) {
  const shelf = await User.findById(req.user._id).shelf;
  const disc = await Disc.findById(req.params.id);
  const bags = await Bag.find({});
  res.render("discs/edit", { title: "Edit Disc", disc, bags, shelf });
}

async function update(req, res) {
  try {
    console.log("Request body:", req.body);  // Log the request body
    let disc = await Disc.findById(req.params.id);
    console.log("Disc:", disc);  // Log the disc
    const user = await User.findById(req.user._id);
    console.log("User:", user);  // Log the user
    const shelf = user.shelf;
    if (disc.bag) {
      const oldBag = await Bag.findById(disc.bag);
      console.log("Old bag:", oldBag);  // Log the old bag
      if (oldBag) {
        oldBag.discs.remove(disc._id);
        await oldBag.save();
      }
    }
    if (req.body.bag === shelf._id.toString()) {
      shelf.discs.push(disc._id);
      await user.save();
    } else {
      const newBag = await Bag.findById(req.body.bag);
      console.log("New bag:", newBag);  // Log the new bag
      if (newBag) {
        newBag.discs.push(disc._id);
        await newBag.save();
      } else {
        return res.status(400).send("Invalid bag ID");
      }
    }
    Object.assign(disc, req.body);
    await disc.save();
    res.redirect(`/discs/${disc._id}`);
  } catch (error) {
    console.error('An error occurred while updating the disc:', error);
    res.status(500).send("An error occurred while updating the disc");
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