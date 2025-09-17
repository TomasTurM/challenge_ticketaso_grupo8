describe('Registro de un nuevo usuario organizador', () => {
  
  it('Registro correcto de organizador', () => {
    const email = `user${Date.now()}@testmail.com`; // Email único por prueba
    cy.registroOrganizador(email);
  });

  it('Registra organizador con mail nuevo y sale cartel de confirmar mail', () => {
    const email = `user${Date.now()}@testmail.com`; // Email único por prueba
    const password = 'Si12345678.';

    cy.crearOrganizadorViaAPI(email);
        cy.viewport(1400, 900); // Fuerza modo escritorio


    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login');

    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-password"]').type(password);
    cy.get('[data-cy="btn-login"]').click();

    cy.contains('Usuario no confirmado').should('exist');
  })
});

//OLAF DISCO	Particular	user1757809578746@testmail.com	3698521478	43475896	Chaco	Charata	Calle Cualquiera 0453	


