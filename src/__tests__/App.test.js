import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';


test('<App /> La aplicacion funciona bien la primera vez', () => {
    render(<App />);

    expect( screen.getByText('Administrador de Pacientes') ).toBeInTheDocument();
    expect( screen.getByTestId('nombre-app').tagName ).toBe('H1');

    expect( screen.getByText('Crear Cita') ).toBeInTheDocument();
    expect( screen.getByText('No hay citas') ).toBeInTheDocument();

    
});

test('<App /> Agregar una cita y verificar el heading', () => {
    render(<App />);

    // llenar los campos
    userEvent.type( screen.getByTestId('mascota'), 'Hook');
    userEvent.type( screen.getByTestId('propietario'), 'Liam');
    userEvent.type( screen.getByTestId('fecha'), '2021-05-25');
    userEvent.type( screen.getByTestId('hora'), '10:00');
    userEvent.type( screen.getByTestId('sintomas'), 'Solo duerme');

    // click en el botón de submit 
    const btnSubmit = screen.getByTestId('btn-submit');
    userEvent.click(btnSubmit);

    // revisar por alerta
    const alerta = screen.queryByTestId('alerta');
    expect( alerta ).not.toBeInTheDocument();


    // revisar por el titulo dinamico...
    expect( screen.getByTestId('titulo-dinamico').textContent).toBe('Administra tus Citas');
    expect( screen.getByTestId('titulo-dinamico').textContent).not.toBe('No hay citas');  

    
});

test('<App /> verificar las citas en el DOM', async () => {
    render(<App />);

    const cita = await screen.findAllByTestId('cita');


    // snapshot crea un archivo para verificar su contenido
    // expect(cita).toMatchSnapshot();

    expect( screen.getByTestId('btn-eliminar').tagName ).toBe('BUTTON');
    expect( screen.getByTestId('btn-eliminar') ).toBeInTheDocument();

    // verificar alguna cita
    expect(screen.getByText('Hook')).toBeInTheDocument();
});

test('<App /> Eliminar la cita', () => {
    render(<App />);

    const btnEliminar = screen.getByTestId('btn-eliminar');
    expect( btnEliminar.tagName ).toBe('BUTTON');
    expect( btnEliminar ).toBeInTheDocument();

    // simular el click
    userEvent.click(btnEliminar);

    // El botón elminar ya no debe estar
    expect( btnEliminar ).not.toBeInTheDocument();
    
    // la cita ya no debe estar
    expect( screen.queryByText('Hook')).not.toBeInTheDocument();

});