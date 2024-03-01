import { render, screen } from '@testing-library/react';

import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { AuthContext } from '../../src/auth';
import { PrivateRoute } from '../../src/router/PrivateRoute';

describe('Pruebas en <PrivateRoute />', () => {

    test('Debe de mostrar el children si esta autenticado y que se escriba en el local storage el ultimo path', () => {

        // La razon del porque debemos usar Storage.prototype.setItem 
        //es porque localStorage.setItem no es una funcion que se pueda espiar
        //por lo que debemos hacer un mock de la funcion setItem
        Storage.prototype.setItem = jest.fn();

        const contextValue = {
            logged: true,
            user: {
                name: 'Alberto',
                id: '123'
            }
        };

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/search?q=batman']}>
                    <PrivateRoute>
                        <h1>Ruta privada</h1>
                    </PrivateRoute> 
                </MemoryRouter>
            </AuthContext.Provider>
        );

        expect( screen.getByText('Ruta privada') ).toBeTruthy();
        expect( localStorage.setItem ).toHaveBeenCalledWith('lastPath', '/search?q=batman');
        
    });


    test('Debe de dirigir al "login" si no esta autenticado', () => {
           
        const contextValue = {
            logged: false,
        };

        render( 
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter initialEntries={['/marvel']}>

                    <Routes>
                        <Route path='marvel' element={ 
                            <PrivateRoute> 
                                <h1>Ruta Privada</h1> 
                            </PrivateRoute> 
                        }/>
                        <Route path='login' element={ 
                            <h1>Pagina login</h1> 
                        }/>
                    </Routes>

                </MemoryRouter>
            </AuthContext.Provider>
        );

        //screen.debug();
        expect( screen.queryByText('Pagina login') ).toBeTruthy();
            
    });

    
});
