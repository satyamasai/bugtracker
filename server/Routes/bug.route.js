const { Router } = require("express");
const { bugModel } = require("../Models/bug.model");

const bugController = Router();
// -----------------------------------adding bug in database----------------
bugController.post("/addbug", async (req, res) => {
  const { bugname, severity,totalCount } = req.body;
  // console.log(bugname, severity,totalCount, "this is data");
  const existing_bug = await bugModel.findOne({ bugname });

  if (existing_bug) {
    // res.send({ msg: "Same bug has been detected please resolve that first.." });
    res.status(500).send({msg:"Bug already detected ...!"})
    return;
  }
  try {
    const newBug = new bugModel({
      bugname,
      severity,
      id: totalCount
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

// ---------------------  delete Bug-------------------------------------------------------


bugController.delete("/DeleteBug/:id", async(req, res) => {
  // console.log(req.params)
  const {id} = req.params
  const allBugs = await bugModel.deleteOne({_id:id});
  res.send({ msg:"Bug has been deleted..!"});
});


// ----------------------------------------------------------------
module.exports = {
  bugController
};
