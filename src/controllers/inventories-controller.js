import knexConfig from "../../knexfile.js";
import initKnex from "knex";
import { missedPropertiesInventory } from '../utils/model-validation.js';

const knex = initKnex(knexConfig);

const getAllInventories = async (req, res) => {
    try {
        const inventories = await knex("inventories")
            .join("warehouses", "inventories.warehouse_id", "warehouses.id")
            .select("inventories.*", "warehouses.warehouse_name");
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
    const existingWarehouses = await knex('warehouses').where({id: inventory.warehouse_id});

	if (!!missedPropertiesInventory(inventory)) {
		res.status(400).send(`Missing/empty required properties in your request body: ${missedPropertiesInventory(inventory).join(', ')}`);
	}

    else if (typeof(inventory.quantity) !== 'number' || !Number.isInteger(inventory.quantity)) {
        if (!Number.isInteger(inventory.quantity)) {
            res.status(400).send('Quantity must be an integer');
        }
        res.status(400).send('Quantity must be a number');
    }

    else if (existingWarehouses.length === 0) {
        res.status(400).send('Warehouse ID does not exist');
    }

	else {
		try {
			const newInventoryId = await knex("inventories").insert(inventory);
			const newInventory = {id: newInventoryId[0], ...inventory};
			res.status(201).json(newInventory);
		} 
        
        catch (error) {           
            res.status(500).json({
                message: "Unable to add new inventory",
                error:error.toString()
            });
		}
	}
};

export { getAllInventories, addInventory };
