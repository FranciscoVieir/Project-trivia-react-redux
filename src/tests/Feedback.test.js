import React from "react";
import renderWithRouterAndRedux from "./helpers/renderWithRouterAndRedux";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from '../App'
import Feedback from "../pages/Feedback";

const INITIAL_STATE = {
  player: {
    name: 'Edson',
    assertions: 1,
    score: 39,
    gravatarEmail: 'teste@trybe.com'
  },
}

describe('Testando a página de Feedback', () => {
  it('Testa se os elementos da tela são renderizados corretamente', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const image = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const score = screen.getByTestId('header-score');

    expect(image).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    
    
  });

  it('Testa se o botão Play Again redireciona para a página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, "/feedback");
    const playAgainButton = screen.getByTestId('btn-play-again')

    userEvent.click(playAgainButton)

    expect(history.location.pathname).toBe('/');
  });

  it('Testa se o botão Ranking redireciona para a página Ranking', () => {
    const { history } = renderWithRouterAndRedux(<App />, INITIAL_STATE, "/feedback");
    const rankingButton = screen.getByTestId('btn-ranking')

    userEvent.click(rankingButton)

    expect(history.location.pathname).toBe('/ranking');
  });
  it('Testa se a mensagem "Could be better..." é renderizada na tela', () => {
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE);

    const message = screen.getByText(/could be better\.\.\./i)
    expect(message).toBeInTheDocument()
  });
  it('Testa se a mensagem "Well Done!" é renderizada na tela', () => {
    const INITIAL_STATE_2 = {
      player: {
        name: 'Edson',
        assertions: 4,
        score: 39,
        gravatarEmail: 'teste@trybe.com'
      },
    }
    renderWithRouterAndRedux(<Feedback />, INITIAL_STATE_2);

    const message = screen.getByText(/Well Done!/i);
    expect(message).toBeInTheDocument()
  });
})
  
