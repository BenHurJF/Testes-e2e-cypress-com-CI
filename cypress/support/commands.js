/// <reference types="cypress" />

import locators from '../shared/locators';

Cypress.Commands.add('preencheSubmeteFormulario', (email, senha) => {
    cy.visit('/signup');
    cy.get(locators.login.email).type(email);
    cy.get(locators.login.senha).type(senha, { log: false });
    cy.get(locators.login.confirmarSenha).type(senha, { log: false });
    cy.contains('button', 'Signup').click();
    cy.get(locators.login.confirmarCodigo).should('be.visible');
});

Cypress.Commands.add('login', (
    email = Cypress.env('USER_EMAIL'),
    password = Cypress.env('USER_PASSWORD'),
    { cacheSession = true } = {}
) => {
    const login = () => {
        cy.visit('/login');
        cy.get(locators.login.email).type(email, { force: true });
        cy.get(locators.login.senha).type(password, { force: true, log: false });
        cy.contains('button', 'Login').click();
        cy.contains('h1', 'Your Notes', { timeout: 10000 }).should('be.visible');
    }

    if (cacheSession) {
        cy.session([email, password], login)
    } else {
        login();
    }
});

Cypress.Commands.add('criarNota', (descricao) => {
    cy.get(locators.criarNota.descricao).type(descricao);
    cy.get(locators.criarNota.upload).selectFile('./cypress/fixtures/example.json');
    cy.contains('button', 'Create').click()
    cy.contains('.list-group-item', descricao).should('be.visible')
});

Cypress.Commands.add('editarNota', () => {

});

Cypress.Commands.add('deletarNota', () => {

});