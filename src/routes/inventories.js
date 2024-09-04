import { Router } from 'express';
import { addInventory, getAllInventories } from '../controllers/inventories-controller.js';

const router = Router();

router
    .route('/')
    .get(getAllInventories)
    .post(addInventory);

export default router;