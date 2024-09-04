import express from 'express';
import cors from 'cors';
import "dotenv/config";
import warehousesRouter from './routes/warehouses.js';
import inventoriesRouter from './routes/inventories.js';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/warehouses', warehousesRouter);
app.use('/api/inventories', inventoriesRouter);

app.listen(PORT, () => {
	console.log(`Listening at http://localhost:${PORT}`);
});