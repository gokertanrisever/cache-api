import { Router } from "express";
import CacheController from "../controller/cache";

const router = Router();

router.get('/keys', CacheController.getKeys);
router.get('/:key', CacheController.getByKey);
router.post('/:key', CacheController.createOrUpdate);
router.delete('/:key', CacheController.deleteByKey);

export default router;