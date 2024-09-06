import { Router } from 'express';
import { addInventory, getAllInventories, deleteInventoryItem, updateInventoryItem } from '../controllers/inventories-controller.js';

const router = Router();

router
    .route('/')
    .get(getAllInventories)
    .post(addInventory);

router
    .route("/:id")
    .delete(deleteInventoryItem)
    .put(updateInventoryItem);

export default router;