import {Router} from "express";

import {verifyToken} from "../middlewares";
import {createUser, getUsers, login, updateUser, getProfile} from "../controllers/user";

const router: Router = Router();

router.get("/users", verifyToken, getUsers);
router.get("/profile", verifyToken, getProfile);
router.post("/login", login);
router.post("/users", createUser);
router.put("/users/:userId", verifyToken, updateUser);

export default router;
