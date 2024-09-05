import { missedPropertiesWarehouse, havingValidEmail, havingValidPhone } from '../utils/model-validation.js';
import knexConfig from '../../knexfile.js';
import initKnex from 'knex';

const knex = initKnex(knexConfig);
const addWarehouse = async (req, res) => {
    try {
        const warehouse = req.body;
        if (!!missedPropertiesWarehouse(warehouse)) {
            res.status(400).send(
                `Missing/empty required properties in your request body: ${missedPropertiesWarehouse(
                    warehouse
                ).join(", ")}`
            );
        } else if (!havingValidEmail(warehouse.contact_email)) {
            res.status(400).send("Invalid email");
        } else if (!havingValidPhone(warehouse.contact_phone)) {
            res.status(400).send("Invalid phone number");
        } else {
            const newWarehouseIds = await knex("warehouses").insert(warehouse);
            const newWarehouse = { id: newWarehouseIds[0], ...warehouse };
            res.status(201).json(newWarehouse);
        }
    } catch (error) {
        res.status(500).json({
            message: "Unable to add new warehouse",
            error: error.message,
        });
    }
};

const getAllWarehouses = async (_req, res) => {
    try {
        const warehouseData = await knex('warehouses');
        const warehouseDataAbridged = warehouseData.map((warehouse) => {
            return {
                id: warehouse.id,
                warehouse_name: warehouse.warehouse_name,
                address: warehouse.address,
                city: warehouse.city,
                country: warehouse.country,
                contact_name: warehouse.contact_name,
                contact_position: warehouse.contact_position,
                contact_phone: warehouse.contact_phone,
                contact_email: warehouse.contact_email,
            }
        });
        res.status(200).json(warehouseDataAbridged);
    } 

    catch (error) {
        res.status(500).json({
            message: "Unable to retrieve warehouses data",
            error: error.message
        });
    }
};

const getMainWarehouse = async (req, res) => {
    try {
        const warehousesFound = await knex('warehouses')
            .where({ id: req.params.id });

        if (warehousesFound.length === 0) {
            return res.status(404).json({
                message: `Warehouse with ID ${req.params.id} not found` 
            });
        }

        const mainWarehouse = {
                id: warehousesFound[0].id,
                warehouse_name: warehousesFound[0].warehouse_name,
                address: warehousesFound[0].address,
                city: warehousesFound[0].city,
                country: warehousesFound[0].country,
                contact_name: warehousesFound[0].contact_name,
                contact_position: warehousesFound[0].contact_position,
                contact_phone: warehousesFound[0].contact_phone,
                contact_email: warehousesFound[0].contact_email,
        };
        res.status(200).json(mainWarehouse);
    } 

    catch (error) {
        res.status(500).json({
            message: `Unable to retrieve warehouse data for ID ${req.params.id}`,
            error: error.message
        });
    }
};

async function getInventories(req, res){
    try {
        const id= req.params.id;
        const warehouse = await knex('warehouses')
            .where({id}).first();

        if (!warehouse) {
            return res.status(404).json({
                message: `Warehouse with ID ${id} not found` 
            });
        }
        const inventories = await knex.select("id", "item_name", "category", "status", "quantity").from('inventories').where({warehouse_id:id})
        res.status(200).json(inventories);
    } 

    catch (error) {
        res.status(500).json({
            message: `Unable to retrieve inventory data for warehouse data for ID ${req.params.id}`,
            error: error.message
        });
    }
}

export { addWarehouse, getAllWarehouses, getMainWarehouse, getInventories };