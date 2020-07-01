const router = require("express").Router();

// Models
const reportModel = require("../../models/report");

router.get("/", (req, res) => {
  reportModel
    .find({})
    .sort("-_id")
    .lean()
    .then(result => res.send(result))
    .catch(err => res.end(err));
});

router.delete("/:id", (req, res) => {
  reportModel
    .findByIdAndDelete(req.params.id)
    .then(result => res.send("success"))
    .catch(err => res.end(err));
});

router.put("/done", (req, res) => {
  reportModel
    .updateMany({ _id: { $in: req.body } }, { done: true })
    .then(r => res.send("success"))
    .catch(err => res.end(err));
});

router.put("/undone", (req, res) => {
  reportModel
    .updateMany({ _id: { $in: req.body } }, { done: false })
    .then(r => res.send("success"))
    .catch(err => res.end(err));
});

router.put("/delete", (req, res) => {
  reportModel
    .deleteMany({ _id: { $in: req.body } })
    .then(r => res.send("success"))
    .catch(err => res.end(err));
});

module.exports = router;
