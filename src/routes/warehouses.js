import express from 'express';
import { addWarehouse } from '../controllers/warehouses-controller.js';

const router = express.Router();

router.post('/', addWarehouse);

export default router;