import { app } from './app.js';
import { syncSchema } from './shared/db/orm.js';
import { seedDatabase } from './shared/db/seed.js';

const PORT = 3000;

await syncSchema();
await seedDatabase();

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});