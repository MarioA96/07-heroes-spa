import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useNavigate } from "react-router-dom"
import { SearchPage } from "../../../src/heroes/pages/SearchPage";


const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({

    ...jest.requireActual('react-router-dom'), // Para que no se pierda la funcionalidad de las funciones que no estamos mockeando
    useNavigate: () => mockedUseNavigate

}) );


describe('Pruebas en <SearchPage />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de mostrarse correctamente con valores por defecto', () => {
      
        const { container } = render( 
            <MemoryRouter>
                <SearchPage />
            </MemoryRouter>
         );

         expect( container ).toMatchSnapshot();
        //  screen.debug();

    });

    test('Debe de mostrar a Batman y el input con el valor del queryString', () => {
      
        render( 
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <SearchPage />
            </MemoryRouter>
         );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman');
        
        const img = screen.getByRole('img');
        expect( img.src ).toContain('/heroes/dc-batman.jpg');

        const alertError = screen.getByLabelText('search-error');
        expect( alertError.style.display ).toBe('none');

    });

    test('Debe de mostrar un error si no se muestra el hero (batman123)', () => {
    
        render(
            <MemoryRouter initialEntries={['/search?q=batman123']}>
                <SearchPage />
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        expect( input.value ).toBe('batman123');
        
        const alertError = screen.getByLabelText('search-error');
        expect( alertError.style.display ).toBe(''); // nos indica que el elemento esta en el DOM

    });

    test('Debe de llamar el navigate a la pantalla nueva', () => {
        
        const inputValue = 'batman';

        render(
            <MemoryRouter initialEntries={['/search']}>
                <SearchPage/>
            </MemoryRouter>
        );

        const input = screen.getByRole('textbox');
        fireEvent.change( input, { target: { name: 'searchText', value: 'batman' } } );

        //* La razon de que mejor use el submit del form es porque el boton no tiene un type="submit" y no se puede hacer el submit con el boton
        //*Por alguna razon no funciona el detectar el form si NO le coloco aria-label (incluso se menciona en el video)
        const form = screen.getByRole('form');
        fireEvent.submit( form );

        expect( mockedUseNavigate ).toHaveBeenCalledWith(`?q=${ inputValue }`);

    });
    

})

