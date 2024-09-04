import express from 'express';
import { addWarehouse, getAllWarehouses } from '../controllers/warehouses-controller.js';

const router = express.Router();

router
    .post('/', addWarehouse)
    .get('/', getAllWarehouses)

export default router;