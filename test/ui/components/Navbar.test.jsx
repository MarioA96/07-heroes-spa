import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";

import { AuthContext, authReducer } from "../../../src/auth";
import { Navbar } from "../../../src/ui";


const mockedUseNavigate = jest.fn(); // Para que no se ejecute la funcion de useNavigate

// Podemos hacer mocks de librerias completas
jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'), // Para que no se pierda la funcionalidad de las funciones que no estamos mockeando
    useNavigate: () => mockedUseNavigate

}) );


describe('Pruebas en <Navbar />', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'Alberto'
        },
        logout: jest.fn()
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe  de mostrar el nombre', () => {
            
            render(
                <AuthContext.Provider value={ contextValue }>
                    <MemoryRouter>
                        <Navbar />
                    </MemoryRouter>
                </AuthContext.Provider>
            );
    
            // screen.debug();
            expect( screen.getByText('Alberto') ).toBeTruthy();
            
    });

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthContext.Provider>
        );

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith( "/login", {"replace": true} );

    })
    


});
