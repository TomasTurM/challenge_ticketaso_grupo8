// caso positivo de cuenta de usuario comprador
const compradorEmail = 'ceferinomonier@gmail.com';
const compradorPassword = 'Fabian0453+';

//const compradorEmail = 'admin@admin.com';
//const compradorPassword = 'admin';

Cypress.Commands.add('loginCompradorPos', () => {
    cy.viewport(1400, 900); // Fuerza modo escritorio

  cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('a > .z-0').click({ force: true }); // Click on "Iniciar sesión"
  cy.get('[data-cy="input-email"]').type(compradorEmail);
  cy.get('[data-cy="input-password"]').type(compradorPassword);
  cy.get('[data-cy="btn-login"]').click({ force: true });
  cy.get('[data-cy="error-message"]').should('not.exist');
});

Cypress.Commands.add('loginCompradorEmailNeg', () => {
    cy.viewport(1400, 900); // Fuerza modo escritorio

  cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('a > .z-0').click({ force: true });
  cy.get('[data-cy="input-email"]').type(compradorEmail + 'incorrecto'); // Email incorrecto
  cy.get('[data-cy="input-password"]').type(compradorPassword);
  cy.get('[data-cy="btn-login"]').click({ force: true });
  cy.get('[data-cy="error-message"]').should('be.visible');
})

Cypress.Commands.add('loginCompradorPassNeg', () => {
    cy.viewport(1400, 900); // Fuerza modo escritorio

  cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('a > .z-0').click({ force: true });
  cy.get('[data-cy="input-email"]').type(compradorEmail);
  cy.get('[data-cy="input-password"]').type(compradorPassword + 'incorrecto'); // Contraseña incorrecta
  cy.get('[data-cy="btn-login"]').click();
  cy.get('[data-cy="error-message"]').should('be.visible');
});

Cypress.Commands.add('comprarEntradasConButacas', () => {
    cy.viewport(1400, 900); // Fuerza modo escritorio

   cy.visit('https://vps-3696213-x.dattaweb.com/');
  cy.get('[data-cy="btn-ver-evento-4"]').click({ force: true });
  cy.get('button').contains('Adquirir entrada').click({ force: true });
   cy.wait(4000);

cy.contains( 'Con Butacas', { timeout: 10000 }).should('be.visible').click();


  // elección de 4 butacas desocupadas
  cy.get('button[title^="Fila"]')
    .not('[disabled]')
    .then(($butacas) => {
      expect($butacas.length).to.be.at.least(4);

      for (let i = 0; i < 4; i++) {
        cy.wrap($butacas[i]).click({ force: true });
      }
    });

  cy.wait(4000)
    cy.contains( 'Comprar').click({ force: true });
    cy.contains(  'Generar Entrada Gratuita').click({ force: true });
     cy.wait(4000)

   cy.visit('https://vps-3696213-x.dattaweb.com/tickets/list');

   cy.get('[data-cy="titulo-mis-entradas"]', { timeout: 4000 }).should('be.visible').and('contain', 'Mis Entradas');
      cy.viewport(1400, 900); // Fuerza modo escritorio

   cy.get('[data-cy="btn-ver-entradas-4"]').should('be.visible').click({ force: true });
   
 cy.contains(  'Ver todas las entradas').click({ force: true });
   cy.viewport(1400, 900);
 cy.wait(5000);
 cy.get('[data-cy="btn-ver-ticket-2564"]').should('be.visible').click({ force: true });
 cy.wait(5000);
 cy.get('[data-cy="btn-cerrar-modal-tickets-grupo"]').click({ force: true });

  /*cy.contains('button', 'Comprar').click({ force: true });
  cy.contains('button', 'Generar Entrada Gratuita').click({ force: true });
  cy.get('[data-cy="titulo-mis-entradas"]')
    .should('be.visible')
    .and('contain', 'Mis Entradas');
    */
});