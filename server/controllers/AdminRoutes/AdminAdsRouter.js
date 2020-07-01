const router = require("express").Router();

// Models
const adModel = require("../../models/ad");

router.get("/", (req, res) => {
  adModel
    .find({})
    .sort("-_id")
    .lean()
    .then(ads => {
      res.send(ads);
    })
    .catch(err => res.end(err));
});

router.post("/", (req, res) => {
  const ad = adModel(req.body);
  ad.save()
    .then(result => res.send(result))
    .catch(err => res.end(err));
});

router.put("/:id", (req, res) => {
  const postData = req.body;
  adModel
    .findByIdAndUpdate(
      req.params.id,
      {
        ...postData
      },
      { new: true }
    )
    .then(result => res.send("success"))
    .catch(err => res.end(err));
});

router.delete("/:id", (req, res) => {
  adModel
    .findByIdAndDelete(req.params.id)
    .then(result => res.send("success"))
    .catch(err => res.end(err));
});

module.exports = router;
