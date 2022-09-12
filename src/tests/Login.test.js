import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'

describe('Testando componente Login', () => {
    const testName = 'Alessandro';
    const testEmail = 'Alessandro@test.com'
    it('1-Verifica se o history redireciona para a página correta', () => {
        renderWithRouterAndRedux(<App />);


        const { history } = renderWithRouterAndRedux(<App />);


        expect(history.location.pathname).toBe('/');
      });

    it('2- Os inputs "email" e "nome" São renderizados', () => {
        renderWithRouterAndRedux(<App />);


        const inputName = screen.getByPlaceholderText(/nome/i);
        const inputEmail =  screen.getByPlaceholderText(/email/i);

        expect(inputName).toBeDefined();
        expect(inputEmail).toBeDefined();
    });
    it('3- Ao renderizar o componente "login", o botão está desabilitado', () => {
        renderWithRouterAndRedux(<App />);


        const playBtn = screen.getByTestId('btn-play');


        expect(playBtn).toBeDisabled();
    });
    it('4- Ao digitar nos inputs corretamente, o botão "play" será habilitado', () => {
        renderWithRouterAndRedux(<App />)


        const inputName = screen.getByPlaceholderText(/nome/i);
        const inputEmail =  screen.getByPlaceholderText(/email/i);
        const playBtn = screen.getByTestId('btn-play');


        userEvent.type(inputEmail, '');
        userEvent.type(inputName, '');
        expect(playBtn).toBeDisabled();

        userEvent.type(inputEmail, testEmail);
        userEvent.type(inputName, testName);
        expect(playBtn).toBeEnabled();
    });
    it('5- Ao clicar no botão "play", o usuário será redirecionado para "/game"', async() => {
        const { history } = renderWithRouterAndRedux(<App />);

    
        const inputName = screen.getByPlaceholderText(/nome/i);
        const inputEmail =  screen.getByPlaceholderText(/email/i);
        const playBtn = screen.getByRole('button', { name: /play/i });
        

        userEvent.type(inputEmail, testEmail);
        userEvent.type(inputName, testName);
        userEvent.click(playBtn);

        // expect(history.location.pathname).toBe('/games');
    });
    it('6-O botão de configurações é renderizado na tela', () => {
        renderWithRouterAndRedux(<App />);


        const settingBtn = screen.getByTestId('btn-settings');

        expect(settingBtn).toBeDefined();
    });
    it('7- Ao clicar no botão "settings", o usuário será redirecionado para "/config"', () => {
        const { history } = renderWithRouterAndRedux(<App />);


        const settingBtn = screen.getByTestId('btn-settings');


        userEvent.click(settingBtn);

        const { location: { pathname } } = history;
        expect(pathname).toBe('/config');
    });
});