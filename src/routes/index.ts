import { Router } from "express";
import cacheRouter from "./cache";

const router = Router();

router.use("/cache", cacheRouter);

export default router;