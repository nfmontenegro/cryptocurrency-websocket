import {Router} from "express";

import {verifyToken} from "../middlewares";
import {createUser, getUsers, login, updateUser} from "../controllers/user";

const router: Router = Router();

router.post("/login", login);
router.get("/users", verifyToken, getUsers);
router.post("/users", createUser);
router.put("/users/:userId", verifyToken, updateUser);

export default router;
