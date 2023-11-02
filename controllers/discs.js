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
    if (req.body.bag === shelf._id.toString()) {
      if (!shelf.discs.includes(disc._id)) {
        shelf.discs.push(disc._id);
      }
      await user.save();
      console.log(user);
    } else {
      const bag = await Bag.findById(req.body.bag);
      if (bag) {
        bag.discs.push(disc);
        await bag.save();
      }
    }
    res.redirect("/discs/new");
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
    let disc = await Disc.findById(req.params.id);
    const user = await User.findById(req.user._id);
    const shelf = user.shelf;
    // console.log("req.body.bag:", req.body.bag);
    // console.log("shelf._id.toString():", shelf._id.toString());
    if (disc.bag && disc.bag.toString() !== req.body.bag) {
      const oldBag = await Bag.findById(disc.bag);
      if (oldBag) {
        oldBag.discs.remove(disc._id);
        await oldBag.save();
      }
    }
    if (req.body.bag === shelf._id.toString()) {
      if (!shelf.discs.includes(disc._id)) {
        shelf.discs.push(disc._id);
      }
      await user.save();
      // console.log(user);
    } else {
      const newBag = await Bag.findById(req.body.bag);
      if (newBag) {
        newBag.discs.push(disc._id);
        await newBag.save();
      } else {
        return res.status(400).send("Invalid bag ID");
      }
      if (shelf.discs.includes(disc._id)) {
        shelf.discs.remove(disc._id);
        await user.save();
    }
    // If the disc is in the shelf, remove it
    }
    Object.assign(disc, req.body);
    await disc.save();
    res.redirect(`/discs/${disc._id}`);
  } catch (error) {
    console.error("An error occurred while updating the disc:", error);
    res.status(500).send("An error occurred while updating the disc");
  }
}

async function deleteDisc(req, res) {
  try {
    const disc = await Disc.findById(req.params.id);
    if (!disc) {
      console.log("Disc not found");
      return res.status(404).send("Disc not found");
    }
    if (disc.bag) {
      const bag = await Bag.findById(disc.bag);
      console.log(bag);
      if (bag) {
        bag.discs.remove(disc._id);
        await bag.save();
      }
    }
    // Delete the disc after removing it from the bag
    await Disc.findByIdAndDelete(req.params.id);
    res.redirect("/bags/shelf");
  } catch (error) {
    console.error("An error occurred while deleting the disc:", error);
    res.status(500).send("An error occurred while deleting the disc");
  }
}
