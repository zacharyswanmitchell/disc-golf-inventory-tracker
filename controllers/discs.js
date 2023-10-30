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

function index(req, res) {
  Disc.find({}, function (err, discs) {
    res.render("discs/index", { title: "All Discs", discs });
  });
}

function newDisc(req, res) {
  Bag.find({}, function (err, bags) {
    res.render("discs/new", { title: "Add Disc", bags });
  });
}

function show(req, res) {
  Disc.findById(req.params.id)
    .populate("bag")
    .exec(function (err, disc) {
      res.render("discs/show", { title: "Disc Details", disc });
    });
}

function create(req, res) {
  const disc = new Disc(req.body);
  disc.save(function (err) {
    if (err) return res.redirect("/discs/new");
    res.redirect("/discs");
  });
}

function edit(req, res) {
  Disc.findById(req.params.id, function (err, disc) {
    res.render("discs/edit", { title: "Edit Disc", disc });
  });
}

function update(req, res) {
  Disc.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, disc) {
      res.redirect(`/discs/${disc._id}`);
    }
  );
}

function deleteDisc(req, res) {
  Disc.findByIdAndDelete(req.params.id, function (err, disc) {
    res.redirect("/discs");
  });
}
