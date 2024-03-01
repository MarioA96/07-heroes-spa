import { authReducer, types } from "../../../src/auth";

describe('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {
        
        const state = authReducer({logged: false}, {});
        //console.log(state);
        expect(state).toEqual({logged: false});

    });

    test('Debe de (login) llamar el login autenticar y establecer el user', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Alberto',
                id: '123'
            }
        };

        //Al inicio el estado es logged: false y al final es logged: true
        //Lo cual asegura el cambio de estado
        const state = authReducer({logged: false}, action);
        //console.log(state);
        expect(state).toEqual({
            logged: true, 
            user: {
                name: 'Alberto',
                id: '123'
            } 
        });
        
    });

    test('Debe de (logout) llamar el logout y establecer logged en false', () => {
        
        const state = {
            logged: true, 
            user: {
                name: 'Alberto',
                id: '123'
            }
        };

        const action = {
            type: types.logout
        };

        const newState = authReducer( state, action );
        //console.log(state);
        expect(newState).toEqual({logged: false});
    });


});