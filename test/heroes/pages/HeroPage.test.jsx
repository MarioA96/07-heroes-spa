
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HeroPage } from '../../../src/heroes/pages/HeroPage';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'), // Para que no se pierda la funcionalidad de las funciones que no estamos mockeando
    useNavigate: () => mockedUseNavigate

}) );


describe('Pruebas en <HeroPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('DEMO', () => {

        

    });
    

    // test('Debe de mostrarse correctamente con valores por defecto', () => {
      
    //     render( 
    //         <MemoryRouter initialEntries={['/hero/dc-batman']}>
    //             <HeroPage />
    //         </MemoryRouter>
    //      );

    //      screen.debug();

    //     //expect( container ).toMatchSnapshot();

    // });

    // test('Debe de mostrar el hero con el queryString', () => {
      
    //     render( 
    //         <MemoryRouter initialEntries={['/hero?q=batman']}>
    //             <HeroPage />
    //         </MemoryRouter>
    //      );

    //     const img = screen.getByRole('img');
    //     expect( img.src ).toContain('/heroes/dc-batman.jpg');

    // });

    // test('Debe de mostrar un error si no se muestra el hero (batman123)', () => {
    
    //     render(
    //         <MemoryRouter initialEntries={['/hero?q=batman123']}>
    //             <HeroPage />
    //         </MemoryRouter>
    //     );

    //     const alertError = screen.getByLabelText('hero-error');
    //     expect( alertError.style.display ).toBe(''); // nos indica que el elemento esta en el DOM

    // });

    // test('Debe de llamar el navigate a la pantalla nueva', () => {
        
    //     const history = {
    //         push: jest.fn()
    //     };

    //     render(
    //         <MemoryRouter initialEntries={['/hero?q=batman123']}>
    //             <HeroPage history={ history } />
    //         </MemoryRouter>
    //     );

    //     const alertError = screen.getByLabelText('hero-error');
    //     expect( alertError.style.display ).toBe(''); // nos indica que el elemento esta en el DOM

    //     expect( history.push ).toHaveBeenCalledWith('/');

    // });

});

