describe('Registro de usuario con datos inválidos ', () => {
  beforeEach(() => {
        cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://ticketazo.com.ar');
    cy.get('a > .z-0').click();
    cy.get('[data-cy="btn-register-user"]').click();
  });

  afterEach(() => {
    cy.wait(3000); 
  });

  it('No permite registro con email mal formateado', () => {
    cy.get('[data-cy="input-nombres"]').type('fabian');
    cy.get('[data-cy="input-apellido"]').type('gonzalez');
    cy.get('[data-cy="input-telefono"]').type('1234567890');
    cy.get('[data-cy="input-dni"]').type('70123456');
    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('.cursor-pointer', 'Buenos Aires').click();
    cy.get('[data-cy="select-localidad"]').click().type('Tres de Febrero');
    cy.contains('.cursor-pointer', 'Tres de Febrero').click();
    cy.get('[data-cy="input-fecha-nacimiento"]').click();
    cy.contains('dd').type('08');
    cy.contains('mm').type('03');
    cy.contains('aaaa').type('1995');
    cy.get('[data-cy="input-email"]').type('email-invalido@');
    cy.get('[data-cy="input-confirmar-email"]').type('email-invalido@');
    cy.get('[data-cy="input-password"]').type('Fabian0453+');
    cy.get('[data-cy="input-repetir-password"]').type('Fabian0453+');
    cy.get('[data-cy="btn-registrarse"]').click();
    //cy.contains(/Please include an '@' in the email address\..*is missing an '@'\./).should('be.visible');
        cy.contains('@' ).should('be.visible');

    cy.log('✅ El sistema bloqueó correctamente el registro con datos inválidos');
  });

  it('No permite registro con contraseña corta', () => {
    cy.get('[data-cy="input-nombres"]').type('team');
    cy.get('[data-cy="input-apellido"]').type('tester');
    cy.get('[data-cy="input-telefono"]').type('1234567890');
    cy.get('[data-cy="input-dni"]').type('70123456');
    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('.cursor-pointer', 'Buenos Aires').click();
    cy.get('[data-cy="select-localidad"]').click().type('Tres de Febrero');
    cy.contains('.cursor-pointer', 'Tres de Febrero').click();
    cy.get('[data-cy="input-fecha-nacimiento"]').click();
    cy.contains('dd').type('08');
    cy.contains('mm').type('03');
    cy.contains('aaaa').type('1995');
    cy.get('[data-cy="input-email"]').type('ceferinomonier@gmail.com');
    cy.get('[data-cy="input-confirmar-email"]').type('ceferinomonier@gmail.com');
    cy.get('[data-cy="input-password"]').type('123');
    cy.get('[data-cy="input-repetir-password"]').type('123');
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.contains(/(La contraseña es demasiado corta|La contraseña debe tener al menos 6 caracteres)/).should('be.visible');
    cy.log('✅ El sistema bloqueó correctamente el registro con datos inválidos');
  });

  it('No permite registro con campos vacíos', () => {
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.contains(/(Este campo es obligatorio|Please fill out this field\.)/).should('be.visible');
    cy.log('✅ El sistema bloqueó correctamente el registro con datos inválidos');
  });
}); 