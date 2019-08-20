const express = require("express");
const ResourceDb = require("./resource-model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const resource = await ResourceDb.add(req.body);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: "Failed to post resource", err });
  }
});
router.get("/", async (req, res) => {
  try {
    const resources = await ResourceDb.find();
    res.status(200).json(resources);
  } catch (err) {
    res.status(500).json({ message: "Failed to post resource", err });
  }
});
// router.post('/', async (req, res) => {
//  try {

//  } catch (err) {
//   res.status(500).json({ message: 'Failed to post resource', err });
//  }
// });

module.exports = router;
