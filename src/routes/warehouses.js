import { Router } from 'express';
import { addWarehouse, getAllWarehouses, getMainWarehouse } from '../controllers/warehouses-controller.js';

const router = Router();

router
    .route('/')
    .post(addWarehouse)
    .get(getAllWarehouses);

router
    .route("/:id")
    .get(getMainWarehouse);

export default router;