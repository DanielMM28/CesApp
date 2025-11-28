import { Router } from "express";
import { LoginController } from "../controllers/LoginController";

const router = Router();
const loginCtrl = new LoginController();

router.post("/", loginCtrl.login);

export default router;
