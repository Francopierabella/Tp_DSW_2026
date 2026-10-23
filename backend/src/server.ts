import { app } from './app.js';
import { syncSchema } from './shared/db/orm.js';
import { seedDatabase } from './shared/db/seed.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

await syncSchema();
await seedDatabase();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});