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
	if (!!missedPropertiesInventory(inventory)) {
		res.status(400).send(`Missing required properties in your request body: ${missedInventoryProperties(inventory).join(', ')}`);
	}

    else if (typeof(inventory.quantity) !== 'number' || !Number.isInteger(inventory.quantity)) {
        if (!Number.isInteger(inventory.quantity)) {
            res.status(400).send('Quantity must be an integer');
        }
        res.status(400).send('Quantity must be a number');
    }

	else {
		try {
			const newInventoryId = await knex("inventories").insert(inventory);
			const newInventory = {id: newInventoryId[0], ...inventory};
			res.status(201).json(newInventory);
		} 
        
        catch (error) {           
            if (error.toString().includes("FOREIGN KEY (`warehouse_id`) REFERENCES `warehouses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE)")) {
                res.status(400).send('Warehouse ID does not exist');
            }

            res.status(500).json({
                message: "Unable to add new inventory",
                error:error.toString()
            });
		}
	}
};

export { getAllInventories, addInventory };
