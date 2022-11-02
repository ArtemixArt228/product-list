const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/").get(getComments).post(createComment).delete(deleteComment);

module.exports = router;
