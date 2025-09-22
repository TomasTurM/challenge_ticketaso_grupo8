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


Cypress.Commands.add('fillInputsAndSubmit', (customData) => {
  cy.get('[data-cy="input-nombres"]').type(userData.nombres)
  cy.get('[data-cy="input-apellido"]').type(userData.apellido)
  cy.get('[data-cy="input-telefono"]').type(customData.telefono ?? userData.telefono)
  cy.get('[data-cy="input-dni"]').type(customData.dni ?? userData.dni)
  cy.get('[data-cy="select-provincia"]').click()
  cy.get('[data-cy="select-provincia"]').type(`${userData.provincia}{enter}`)
  cy.get('[data-cy="select-localidad"]').click()
  cy.get('[data-cy="select-localidad"]').type(`${userData.localidad}{enter}`)
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').type(customData.fechaNacimiento?.dd ?? userData.fechaNacimiento.dd);   
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').type(customData.fechaNacimiento?.mm ?? userData.fechaNacimiento.mm);   
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').type(customData.fechaNacimiento?.aaaa ?? userData.fechaNacimiento.aaaa);
  cy.get('[data-cy="input-email"]').type(customData.email ?? userData.email)
  cy.get('[data-cy="input-confirmar-email"]').type(customData.emailConfirm ?? userData.email)
  cy.get('[data-cy="input-password"]').type(customData.password ?? userData.password)
  cy.get('[data-cy="input-repetir-password"]').type(customData.password2 ?? userData.password2Correct)
  cy.get('[data-cy="btn-registrarse"]').click()
})


Cypress.Commands.add('clearAllInputs', () => {
  cy.get('[data-cy="input-nombres"]').clear();
  cy.get('[data-cy="input-apellido"]').clear();
  cy.get('[data-cy="input-telefono"]').clear();
  cy.get('[data-cy="input-dni"]').clear();
  cy.get('[data-cy="input-email"]').clear();
  cy.get('[data-cy="input-confirmar-email"]').clear();
  cy.get('[data-cy="select-provincia"]').click().type('{selectall}{backspace}');
  cy.get('[data-cy="select-localidad"]').click().type('{selectall}{backspace}');
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="day"]').clear();
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="month"]').clear();
  cy.get('[data-cy="input-fecha-nacimiento"] [data-type="year"]').clear();
  cy.get('[data-cy="input-password"]').clear();
  cy.get('[data-cy="input-repetir-password"]').clear();
});

Cypress.Commands.add('registrarUsuario', ({
  nombre,
  apellido,
  provincia,
  localidad,
  fechaNacimiento,
  dni,
  telefono,
  email,
  confirmarEmail,
  password,
  repetirPassword
}) => {
  cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/editProfile')
  cy.get('[data-cy="btn-register-user"]').click()
  cy.get('[data-cy="input-nombres"]').type(nombre)
  cy.get('[data-cy="input-apellido"]').clear().type(apellido)
  cy.get('[data-cy="input-telefono"]').clear().type(telefono)
  cy.get('[data-cy="input-dni"]').clear().type(dni)
  cy.get('[data-cy="select-provincia"]').click().type(provincia + '{enter}')
  cy.get('[data-cy="select-localidad"]').click().type(localidad + '{enter}')
  const { dd, mm, aaaa } = fechaNacimiento


  cy.get('[data-cy="input-fecha-nacimiento"]').click()
  cy.contains('dd').click().type(dd)
  cy.get('[data-cy="input-fecha-nacimiento"]').click()
  cy.contains('mm').click().type(mm)
  cy.get('[data-cy="input-fecha-nacimiento"]').click()
  cy.contains('aaaa').click().type(aaaa)
 


  cy.get('[data-cy="input-email"]').clear().type(email)
  cy.get('[data-cy="input-confirmar-email"]').clear().type(confirmarEmail || email)
  cy.get('[data-cy="input-password"]').clear().type(password)
  cy.get('[data-cy="input-repetir-password"]').clear().type(repetirPassword || password)


  cy.get('[data-cy="btn-registrarse"]').click()
})
