const { Router } = require("express");
const { bugModel } = require("../Models/bug.model");

const bugController = Router();

bugController.post("/addbug", async(req, res) => {
  const { bugname, severity } = req.body;

  const existing_bug = await bugModel.findOne({ bugname });

  if (existing_bug) {
    res.send({ msg: "Same bug has been detected please resolve it first.." });
    return ;
  } 
    const newBug = new bugModel({
      bugname,
      severity,
    });

    await newBug.save()
  res.send({msg:"Bug has been created..!"})


});


module.exports={
    bugController
}
