import express, { Router } from "express";
import controllers from "../controllers";

const router: Router = express.Router();

router.post("/hash-password", controllers.hashPassword);
router.post("/compare-password", controllers.comparePassword);

export default router;
