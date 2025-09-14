// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { userData } from "../e2e/Data/UserData"


Cypress.Commands.add('fillInputs', (dni) => {
  cy.get('[data-cy="input-nombres"]').type(userData.nombres)
  cy.get('[data-cy="input-apellido"]').type(userData.apellido)
  cy.get('[data-cy="input-telefono"]').type(userData.telefono)
  cy.get('[data-cy="input-dni"]').type(dni)
  cy.get('[data-cy="select-provincia"]').click()
  cy.get('[data-cy="select-provincia"]').type(`${userData.provincia}{enter}`)
  cy.get('[data-cy="select-localidad"]').click()
  cy.get('[data-cy="select-localidad"]').type(`${userData.localidad}{enter}`)
  cy.contains('dd').type(userData.fechaNacimiento.dd)
  cy.contains('mm').type(userData.fechaNacimiento.mm)
  cy.contains('aaaa').type(userData.fechaNacimiento.aaaa)
  cy.get('[data-cy="input-email"]').type(userData.email)
  cy.get('[data-cy="input-confirmar-email"]').type(userData.email)
  cy.get('[data-cy="input-password"]').type(userData.password)
  cy.get('[data-cy="input-repetir-password"]').type(userData.password)
})

Cypress.Commands.add('clickRegisterButton', () => {
  cy.get('[data-cy="btn-registrarse"]').click()
})