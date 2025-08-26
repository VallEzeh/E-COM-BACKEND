import e from "express";
import {
  del1User,
  forLogin,
  forSignup,
  get1user,
  getAllUsers,
  update1User,
} from "../controller/userController.js";
import authorize from "../middlewares/authorize.js";
const router = e.Router();

router.post("/", forSignup);

router.get("/get", authorize(["Admin"]), getAllUsers);

router.get("/:id", authorize(["Admin"]), get1user);

router.delete("/:id", authorize(["Admin"]), del1User);

router.put("/:id", update1User);

router.post("/login", forLogin);

export default router;
