const router = require("express").Router();
const { protect,permittedRoles } = require("./appMiddleware");
const userController = require("./../controllers/userController");

router.get("/", userController.getAllUsers);
router.delete("/:userId", userController.deleteUser);

module.exports = router;
