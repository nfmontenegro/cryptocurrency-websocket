import {Router} from "express";
import {createUser} from "../controllers/user";

const router: Router = Router();

router.post("/users", createUser);

export default router;
