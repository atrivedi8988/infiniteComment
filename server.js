const express = require("express");
const mongoose = require("mongoose");
const CommentModel = require("./CommentModel");

const app = express();
app.use(express.json());
mongoose.set("strictQuery", true);

app.get("/allcomment", async (req, res) => {
  const comment = await CommentModel.find();
  res.status(200).json({
    success: true,
    comment,
  });
});

app.post("/newcomment", async (req, res) => {
  try {
    const comment = await CommentModel.create(req.body);
    comment.save();
    res.status(201).json({
      success: true,
      comment,
    });
  } catch (error) {
    res.status(500).send(error.errors.comment.message);
  }
});

app.put("/editcomment/:id", async (req, res) => {
  let comment = await CommentModel.findById(req.params.id);
  if (!comment) {
    return res.status(404).json({
      success: false,
      message: "comment not found",
    });
  }
  comment = await CommentModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    comment,
  });
});

app.delete("/deletecomment/:id", (req, res) => {});
mongoose
  .connect("mongodb://localhost:27017/b12")
  .then(() => {
    app.listen(8080, () => {
      console.log("listening on port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
