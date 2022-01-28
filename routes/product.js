const express = require("express");
const router = express.Router();

const { isLoggedIn, customRole } = require("../middleware/user");

const {
  addProduct,
  getAllProduct,
  adminProducts,
  getOneProduct,
  adminUpdateOneProduct,
  adminDeleteOneProduct,
  addReview,
} = require("../controller/productController");

//user routes
router.route("/products").get(getAllProduct);
router.route("/products/:id").get(getOneProduct);
router.route("/review").put(isLoggedIn, addReview);

// aadmin routes
router
  .route("/admin/product/add")
  .post(isLoggedIn, customRole("admin"), addProduct);

router
  .route("admin/products")
  .get(isLoggedIn, customRole("admin"), adminProducts);

router
  .route("admin/product/:id")
  .get(isLoggedIn, customRole("admin"), adminUpdateOneProduct)
  .delete(isLoggedIn, customRole("admin"), adminDeleteOneProduct);

module.exports = router;
