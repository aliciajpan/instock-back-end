import knexConfig from "../../knexfile.js";
import initKnex from "knex";
import { missedPropertiesInventory } from '../utils/model-validation.js';

const knex = initKnex(knexConfig);

const getAllInventories = async (req, res) => {
    try {
        const inventories = await knex("inventories")
            .join("warehouses", "inventories.warehouse_id", "warehouses.id")
            .select("inventories.*", "warehouses.warehouse_name")
            .orderBy("created_at", "desc");
        const inventoriesToReturn = inventories.map(
            ({
                id,
                warehouse_name,
                item_name,
                description,
                category,
                status,
                quantity,
            }) => {
                return {
                    id,
                    warehouse_name,
                    item_name,
                    description,
                    category,
                    status,
                    quantity,
                };
            }
        );
        res.status(200).json(inventoriesToReturn);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addInventory = async (req, res) => {
	const inventory = req.body;
    try {
        const existingWarehouses = await knex('warehouses').where({id: inventory.warehouse_id});
        if (!!missedPropertiesInventory(inventory)) {
            res.status(400).send(`Missing/empty required properties in your request body: ${missedPropertiesInventory(inventory).join(', ')}`);
            return;
        }
        else if (typeof(inventory.quantity) !== 'number' || !Number.isInteger(inventory.quantity)) {
            if (!Number.isInteger(inventory.quantity)) {
                res.status(400).send('Quantity must be an integer');
                return;
            }
            res.status(400).send('Quantity must be a number');
            return;
        }
        else if (existingWarehouses.length === 0) {
            res.status(400).send('Warehouse ID does not exist');
            return;
        }
        else {
            const newInventoryId = await knex("inventories").insert(inventory);
            const newInventory = {id: newInventoryId[0], ...inventory};
            res.status(201).json(newInventory);
        }
	}
    catch (error) {
        res.status(500).json({
            message: "Unable to add new inventory",
            error: error.message
        });
    }
};

const deleteInventoryItem = async (req, res) => {
    try {
        const deleted = await knex("inventories")
            .where({ id: req.params.id })
            .delete();

        if (deleted === 0) {
            res.status(404).send(`Inventory item with ID ${req.params.id} not found`);
            return;
        }

        res.sendStatus(204);
    } 
    
    catch (error) {
        res.status(500).json({
            message: "Unable to delete inventory item",
            error: error.message
        });
    }
};

const updateInventoryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { id: _id, ...inventoryItemToUpdate} = req.body;

        if (!!missedPropertiesInventory(inventoryItemToUpdate)) {
            res.status(400).send(`Missing/empty required properties in your request body: ${missedPropertiesInventory(inventoryItemToUpdate).join(', ')}`);
            return;
        }

        if (typeof(inventoryItemToUpdate.quantity) !== 'number' || !Number.isInteger(inventoryItemToUpdate.quantity)) {
            if (!Number.isInteger(inventoryItemToUpdate.quantity)) {
                res.status(400).send('Quantity must be an integer');
                return;
            }
            res.status(400).send('Quantity must be a number');
            return;
        }

        const existingWarehouses = await knex('warehouses').where({id: inventoryItemToUpdate.warehouse_id});
        if (existingWarehouses.length === 0) {
            res.status(400).send(`Warehouse ID ${inventoryItemToUpdate.warehouse_id} does not exist`);
            return;
        }

        const updated = await knex("inventories")
            .where({ id })
            .update(inventoryItemToUpdate);

        if (updated === 0) {
            res.status(404).send(`Inventory item with ID ${id} not found`);
            return;
        }

        res.status(200).json({id, ...inventoryItemToUpdate});
    }
    catch (error) {
        res.status(500).json({
            message: "Unable to update inventory item",
            error: error.message
        });
    }
};

export { getAllInventories, addInventory, deleteInventoryItem, updateInventoryItem };
