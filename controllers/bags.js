const Disc = require("../models/disc");
const Bag = require("../models/bag");
const User = require("../models/user");

module.exports = {
  index,
  new: newBag,
  show,
  create,
  edit,
  update,
  delete: deleteBag,
  shelf,
};

async function index(req, res) {
  const bags = await Bag.find({});
  res.render("bags/index", { title: "Bags", bags });
}

async function newBag(req, res) {
  res.render("bags/new", { title: "Add Bag" });
}

async function show(req, res) {
  // Sort the discs by the query string
  let sortby = req.query.sortby || "name"; // Default to 'name' if no sortby is provided
  const bag = await Bag.findById(req.params.id).populate({
    path: "discs",
    options: { sort: { [sortby]: 1 } }, // Sort the populated discs
  });
  res.render("bags/show", { title: "Bag Details", bag, sortby });
}

async function create(req, res) {
  const bag = new Bag(req.body);
  await bag.save();
  const user = await User.findById(req.user._id);
  // Add the bag to the user's bags array
  user.bags.push(bag._id);
  await user.save();
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
  // Remove the bag from the user's bags array
  const bag = await Bag.findById(req.params.id);
  const user = await User.findById(req.user._id);
  if (bag.discs.length > 0) {
    user.bags.pull(bag._id);
    // Remove the discs from the user's bag
    await user.save();
    for (let i = 0; i < bag.discs.length; i++) {
      const disc = await Disc.findById(bag.discs[i]);
      disc.bag = req.user.shelf;
      // Add the disc to the user's shelf
      await disc.save();
      user.shelf.discs.push(disc._id);
      // Save User!
      await user.save();
    }
  }
  await Bag.findByIdAndDelete(req.params.id);
  res.redirect("/bags");
}

async function shelf(req, res) {
  // Sort the discs by the query string
  let sortby = req.query.sortby || "name"; // Default to 'name' if no sortby is provided
  const user = await User.findById(req.user._id).populate({
    path: "shelf.discs",
    options: { sort: { [sortby]: 1 } }, // Sort the populated discs
  });
  res.render("bags/shelf", { title: "My Shelf", user, sortby });
}
