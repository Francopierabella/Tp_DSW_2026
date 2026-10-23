import request from 'supertest';
import { describe, it, expect } from 'vitest';
import { app } from '../app.js';
import dotenv from 'dotenv';

dotenv.config();

describe('POST /api/customers', () => {

    it('debe retornar 400 cuando falta el email', async () => {
        const response = await request(app)
            .post('/api/customers')
            .send({
                firstName: 'Juan',
                lastName: 'Pérez',
                password: 'test1234',
                dni: '12345678'
            });

        expect(response.status).toBe(400);
    });

});