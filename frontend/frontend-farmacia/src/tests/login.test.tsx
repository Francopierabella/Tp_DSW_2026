import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import { AuthProvider } from '../context/AuthContext';

// memoryRouter es necesario porque Login usa useNavigate() internamente
describe('Componente Login', () => {

    it('debe renderizar el formulario con los campos de email, contraseña y el botón', () => {

        render(
            <MemoryRouter>
                <AuthProvider>
                    <Login />
                </AuthProvider>
            </MemoryRouter>
        );

        // Verifica que el input de email existe
        expect(screen.getByLabelText('Email')).toBeInTheDocument();

        // Verifica que el input de contraseña existe
        expect(screen.getByLabelText('Contraseña')).toBeInTheDocument();

        // Verifica que el botón de submit existe
        expect(screen.getByRole('button', { name: 'Iniciar sesión' })).toBeInTheDocument();
    });

});