import { test, expect } from '@playwright/test';
import dotenv from 'dotenv'
dotenv.config();

test('Flujo de login completo', async ({ page }) => {

    // 1. Abre la página de login
    await page.goto('http://localhost:5173/login');

    // 2. Completa el formulario
    await page.getByLabel('Email').fill(process.env.TEST_USER_EMAIL!);
    await page.getByLabel('Contraseña').fill(process.env.TEST_USER_PASSWORD!);

    // 3. Hace click en el botón
    await page.getByRole('button', { name: 'Iniciar sesión' }).click();

    // 4. Verifica que redirigió al Home
    await expect(page).toHaveURL('http://localhost:5173/');
});