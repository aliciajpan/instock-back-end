import express from 'express';
import { addWarehouse, getAllWarehouses, getMainWarehouse } from '../controllers/warehouses-controller.js';

const router = express.Router();

router
    .route('/')
    .post(addWarehouse)
    .get(getAllWarehouses);

router
    .route("/:id")
    .get(getMainWarehouse);

export default router;