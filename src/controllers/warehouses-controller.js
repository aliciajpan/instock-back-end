import { missedProperties, havingValidEmail, havingValidPhone } from '../utils/model-validation.js';
import knexConfig from '../../knexfile.js';
import initKnex from 'knex';

const knex = initKnex(knexConfig);
const addWarehouse = async (req, res) => {
	const warehouse = req.body;
	if (!!missedProperties(warehouse)) {
		res.status(400).send(`Missing required properties in your request body: ${missedProperties(warehouse).join(', ')}`);
	}
	else if (!havingValidEmail(warehouse.contact_email)) {
		res.status(400).send('Invalid email');
	}
	else if (!havingValidPhone(warehouse.contact_phone)) {
		res.status(400).send('Invalid phone number');
	}
	else {
		try {
			const newWarehouseIds = await knex('warehouses').insert(warehouse);
			const newWarehouse = {id: newWarehouseIds[0], ...warehouse};
			res.status(201).json(newWarehouse);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
};

export { addWarehouse };