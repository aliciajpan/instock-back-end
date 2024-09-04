import { Router } from 'express';
import { getAllInventories } from '../controllers/inventories-controller.js';

const router = Router();

router
    .route('/')
    .get(getAllInventories);

export default router;