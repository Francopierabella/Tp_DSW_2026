import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../app.js';
import dotenv from 'dotenv';

dotenv.config();

describe('POST /api/auth/login', () => {

    // TEST 1: Login exitoso
    it('debe retornar 200 y un token cuando las credenciales son válidas', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                e_mail: process.env.EMAIL_ADDRESS_TEST,
                password: process.env.PASSWORD_TEST
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('role');
    });

    // TEST 2: Login fallido
    it('debe retornar 401 cuando las credenciales son incorrectas', async () => {
        const response = await request(app)
            .post('/api/auth/login')
            .send({
                e_mail: 'noexiste@test.com',
                password: 'passwordincorrecta'
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Invalid email or password');
    });

    // TEST 3: Ruta protegida sin token
    it('debe retornar 401 al acceder a una ruta protegida sin token', async () => {
        const response = await request(app)
            .get('/api/sales');

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Access token required');
    });

});