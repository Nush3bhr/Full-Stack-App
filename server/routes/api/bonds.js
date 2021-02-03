const express = require("express");
const router = express.Router();

const Bond = require("../../models/bond");

router.get("/", (req, res) => {
  Bond.find()
    .sort({ date: -1 })
    .then((items) => res.json(items));
});

router.post("/", (req, res) => {
  const newItem = new Bond({
    name: req.body.name,
    partner: req.body.partner,
    message: req.body.message,
  });

  newItem.save().then((item) => res.json(item));
});

module.exports = router;
