describe('Registro de un nuevo usuario', () => {
  it('TC001 - Debería registrar un nuevo usuario', () => {
        cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://ticketazo.com.ar');
    cy.get('a > .z-0').click({ force: true }); //*******/ Paso 1 : Hacer clcik on log in 
    cy.get('[data-cy="btn-register-user"]').click(); // ******Paso 2 : Hacer click en No tienes cuenta Regsitrate 
    // *********Paso 3 : Completar el formulario de registro
    cy.get('[data-cy="input-nombres"]').type('Fabian');
    cy.get('[data-cy="input-apellido"]').type('Gonzalez');
    cy.get('[data-cy="input-telefono"]').type('1234567890');
    const randomDni = Math.floor(60000000 + Math.random() * 30000000); // Ejemplo: entre 60.000.000 y 89.999.999
    cy.get('[data-cy="input-dni"]').type(randomDni.toString());
   // cy.get('[data-cy="input-dni"]').type('70123456');

    // Seleccionar la provincia
    cy.get('[data-cy="select-provincia"]').click({ force: true }); // Abre el dropdown
    cy.contains('.cursor-pointer', 'Buenos Aires').click(); // Selecciona la opción
    // Seleccionar la localidad
    cy.get('[data-cy="select-localidad"]').click().type('Tres de Febrero');
    cy.contains('.cursor-pointer', 'Tres de Febrero').click();
    // Seleccionar la fecha de nacimiento
    cy.get('[data-cy="input-fecha-nacimiento"]').click(); 
    cy.contains('dd').type('08'); // Seleccionar el dia
    cy.contains('mm').type('03'); // Seleccionar el mes.
    cy.contains('aaaa').type('1995'); // Seleccionar el anio
    // Completar el email

        const randomEmail = `testuser${Date.now()}@mailinator.com`;
    cy.get('[data-cy="input-email"]').type(randomEmail);
    cy.get('[data-cy="input-confirmar-email"]').type(randomEmail);
   // cy.get('[data-cy="input-email"]').type('ceferinomonier@gmail.com');  se prueba la primera vez
    //cy.get('[data-cy="input-confirmar-email"]').type('ceferinomonier@gmail.com');
    // Completar la contraseña
    cy.get('[data-cy="input-password"]').type('Fabian0453+');
    cy.get('[data-cy="input-repetir-password"]').type('Fabian0453+');
    //******* */ Paso 4 Hacer click en el botón de registro
    cy.get('[data-cy="btn-registrarse"]').click({ force: true });
    
  });
});