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
            return;
        } else if (!havingValidEmail(warehouse.contact_email)) {
            res.status(400).send("Invalid email");
            return;
        } else if (!havingValidPhone(warehouse.contact_phone)) {
            res.status(400).send("Invalid phone number");
            return;
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
        const warehouseData = await knex
            .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
            .from('warehouses');

        res.status(200).json(warehouseData);
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
        const warehouse = await knex
            .select('id', 'warehouse_name', 'address', 'city', 'country', 'contact_name', 'contact_position', 'contact_phone', 'contact_email')
            .from('warehouses')
            .where({ id: req.params.id })
            .first();
            
        if (!warehouse) {
            res.status(404).json({
                message: `Warehouse with ID ${req.params.id} not found` 
            });
            return;
        }


        res.status(200).json(warehouse);
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
            res.status(404).json({
                message: `Warehouse with ID ${id} not found` 
            });
            return;
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

const deleteWarehouse = async (req, res) => {
    try {
        const deleted = await knex("warehouses")
            .where({ id: req.params.id })
            .delete();

        if (deleted === 0) {
            res.status(404).send(`Warehouse with ID ${req.params.id} not found`);
            return;
        }

        res.sendStatus(204);
    } 

    catch (error) {
        res.status(500).json({
            message: "Unable to delete warehouse",
            error:error.message
        });
    }
};

const updateWarehouse = async (req, res) => {
  try {

    const { id } = req.params;
    const { id: _id, ...warehouseItemToUpdate } = req.body;
    if (!!missedPropertiesWarehouse(warehouseItemToUpdate)) {
      res
        .status(400)
        .send(
          `Missing/empty required properties in your request body: ${missedPropertiesWarehouse(
            warehouseItemToUpdate
          ).join(', ')}`
        );
      return;

    }

    const warehouseItem = await knex('warehouses').where({ id }).first()
    if (!warehouseItem) {
        res.status(400).send(`Warehouse ID ${id} does not exist`);
        return;
    }

    const updated = await knex('warehouses').where({ id }).update(warehouseItemToUpdate);

    res.status(200).json({id, ...warehouseItemToUpdate});
    
  } catch (error) {
    res.status(500).json({
      message: 'Unable to update warehouse',
      error: error.message,
    });
  }
};

export { addWarehouse, getAllWarehouses, getMainWarehouse, getInventories, deleteWarehouse, updateWarehouse };