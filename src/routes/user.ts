import {Router} from "express";
import {createUser, getUsers, login, updateUser} from "../controllers/user";

const router: Router = Router();

router.post("/login", login);
router.get("/users", getUsers);
router.post("/users", createUser);
router.put("/users/:userId", updateUser);

export default router;
