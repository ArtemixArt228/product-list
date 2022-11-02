const { Comment } = require("../models/Comment");

const createComment = async (req, res) => {
  const { productId, description } = req.body;

  const comment = new Comment({
    productId,
    description,
  });

  await comment.save();

  res.status(200).json({
    comment,
  });
};

const getComments = async (req, res) => {
  const { productId } = req.body;

  const comment = await Comment.find({
    productId,
  });

  await comment.save();

  res.status(200).json({
    message: "Success",
  });
};

const deleteComment = async (req, res) => {
  const { id } = req.body;

  await Comment.findByIdAndDelete(id);

  res.status(200).json({
    message: "Success",
  });
};

module.exports = { createComment, getComments, deleteComment };
