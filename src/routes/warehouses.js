import { Router } from 'express';
import { addWarehouse, getAllWarehouses, getMainWarehouse, getInventories, deleteWarehouse, updateWarehouse } from '../controllers/warehouses-controller.js';

const router = Router();

router
    .route('/')
    .post(addWarehouse)
    .get(getAllWarehouses);

router
    .route("/:id")
    .get(getMainWarehouse)
    .delete(deleteWarehouse)
    .put(updateWarehouse);

router
    .route("/:id/inventories")
    .get(getInventories);

export default router;