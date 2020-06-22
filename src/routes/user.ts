import {Router} from "express";
import {createUser, getUsers} from "../controllers/user";

const router: Router = Router();

router.get("/users", getUsers);
router.post("/users", createUser);

export default router;
