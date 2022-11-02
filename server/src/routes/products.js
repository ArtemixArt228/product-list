const { Router } = require("express");
// eslint-disable-next-line new-cap
const router = Router();

const {
  addProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/products");

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").get(getProduct).delete(deleteProduct).put(updateProduct);
module.exports = router;
