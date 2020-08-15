import {Router} from "express";

import {verifyToken} from "../middlewares";
import {createPost} from "../controllers";

const router: Router = Router();

router.post("/posts", verifyToken, createPost);

export default router;
