import React from 'react';
import { render, screen } from '@testing-library/react';
import Formulario from '../components/Formulario';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

const crearCita = jest.fn();

test('<Formulario /> Cargar el formulario y revisar que todo sea correcto', () => {
    // const wrapper = render(<Formulario />);
    // wrapper.debug();

    render(
        <Formulario 
            crearCita={crearCita}
        />
    );
    
    // Heading
    const titulo = screen.getByTestId('titulo');
    expect( titulo.tagName ).toBe('H2');
    expect( titulo.tagName ).not.toBe('H1');
    expect( titulo.textContent).toBe('Crear Cita');

    // Bottom de submit
    expect( screen.getByTestId('btn-submit').tagName).toBe('BUTTON');

});

test('<Formulario /> Validación de formulario', () => {
    render(
        <Formulario 
            crearCita={crearCita}
        />
    );
    
    // click en el botón
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // revisar por alerta
    const alerta = screen.getByTestId('alerta');
    expect( alerta ).toBeInTheDocument();
    expect( alerta.textContent ).toBe('Todos los campos son obligatorios');
    expect( alerta.tagName ).toBe('P');
    
    
});

test('<Formulario /> Validación de formulario', () => {
    render(
        <Formulario 
            crearCita={crearCita}
        />
    );

    userEvent.type( screen.getByTestId('mascota'), 'Hook');
    userEvent.type( screen.getByTestId('propietario'), 'Liam');
    userEvent.type( screen.getByTestId('fecha'), '2021-05-25');
    userEvent.type( screen.getByTestId('hora'), '10:00');
    userEvent.type( screen.getByTestId('sintomas'), 'Solo duerme');

    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // revisar por alerta
    const alerta = screen.queryByTestId('alerta');
    expect( alerta ).not.toBeInTheDocument();

    // crear cita y comprobar que la función se haya llamado
    expect( crearCita ).toHaveBeenCalled();
    expect( crearCita ).toHaveBeenCalledTimes(1);
    

});