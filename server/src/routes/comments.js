const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const {
  getComments,
  createComment,
  deleteComment,
} = require("../controllers/comments");

router.route("/").post(createComment).delete(deleteComment);
router.get("/:id", getComments)

module.exports = router;
