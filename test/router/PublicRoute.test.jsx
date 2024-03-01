import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { PublicRoute } from '../../src/router/PublicRoute';
import { AuthContext } from '../../src/auth';

describe('Pruebas en <PublicRoute />', () => {

    test('Debe de mostrar el children si no esta autenticado', () => {

        const contextValue = {
            logged: false
        };

        render( 
            <AuthContext.Provider value={ contextValue }>
                <PublicRoute>
                    <h1>Ruta publica</h1>
                </PublicRoute> 
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta publica') ).toBeTruthy();
        // screen.debug();

    });

    test('Debe de navegar si esta autenticado', () => {
           
        const contextValue = {
            logged: true,
            user: {
                name: 'Alberto',
                id: '123'
            }
        };

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/login']}>

                    <Routes>
                        <Route path='login' element={ 
                            <PublicRoute> 
                                <h1>Ruta Publica</h1> 
                            </PublicRoute> 
                        }/>
                        <Route path='marvel' element={ 
                            <h1>Pagina marvel</h1> 
                        }/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.queryByText('Pagina marvel') ).toBeTruthy();
            
    });

});


