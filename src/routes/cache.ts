import { Router } from "express";
import CacheController from "../controller/cache";

const router = Router();

router.get('/keys', CacheController.getKeys);
router.get('/:key', CacheController.getByKey);

export default router;