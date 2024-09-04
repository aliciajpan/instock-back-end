import knexConfig from "../../knexfile.js";
import initKnex from "knex";

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

export { getAllInventories };
