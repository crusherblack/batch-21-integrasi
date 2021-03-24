const express = require("express");

const router = express.Router();
const { authenticated } = require("../middlewares/auth"); //import middlware auth
const { checkRolePartner } = require("../middlewares/checkRole");
const { uploadFile, uploadSingle } = require("../middlewares/upload");

const {
  getTodos,
  detailTodo,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");

const {
  getUsers,
  getProfiles,
  getSkills,
  getDetailUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");

const {
  getProducts,
  getCategories,
  addProduct,
} = require("../controllers/product");

const { registerUser, login, checkAuth } = require("../controllers/auth");

router.get("/todos", getTodos);
router.get("/todo/:id", detailTodo);
router.post("/todo", addTodo);
router.patch("/todo/:id", updateTodo);
router.delete("/todo/:id", deleteTodo);

router.get("/users", authenticated, getUsers);
router.get("/profiles", getProfiles);
router.get("/skills", getSkills);
router.get("/user/:id", getDetailUser);
router.post("/user", addUser);
router.patch("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.get("/products", getProducts);
router.get("/categories", getCategories);
router.post("/product", uploadSingle("image"), addProduct);

router.post("/register", uploadFile("imageFile", "videoFile"), registerUser);
router.post("/login", login);
router.get("/check-auth", authenticated, checkAuth);

module.exports = router;
