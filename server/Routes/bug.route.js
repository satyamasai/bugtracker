const { Router } = require("express");
const { bugModel } = require("../Models/bug.model");

const bugController = Router();
// -----------------------------------adding bug in database----------------
bugController.post("/addbug", async (req, res) => {
  const { bugname, severity } = req.body;
  console.log(bugname, severity, "this is data");
  const existing_bug = await bugModel.findOne({ bugname });

  if (existing_bug) {
    res.send({ msg: "Same bug has been detected please resolve it first.." });
    return;
  }
  try {
    const newBug = new bugModel({
      bugname,
      severity,
    });

    await newBug.save();
    res.send({ msg: "Bug has been created..!" });
  } catch (err) {
    console.log(err);
  }
});
// -----------------------------------Fetching bug in database----------------

bugController.get("/getBugs", async(req, res) => {
  const allBugs = await bugModel.find();

  res.send({ allBugs });
});

// ----------------------------------------------------------------------------
module.exports = {
  bugController,
};
