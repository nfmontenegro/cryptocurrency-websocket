import {Router} from "express";
import {createUser, getUsers, login} from "../controllers/user";

const router: Router = Router();

router.post("/login", login);
router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
