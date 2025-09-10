describe('Modulo login exitoso', () => {

  // --------- Generadores de datos dinámicos ---------
  const generarEmail = (valido = true) => {
    const random = Math.random().toString(36).substring(7);
    return valido ? `${random}@gmail.com` : `${random}#correo.com`; // inválido
  };

  // --------- Antes de cada test ---------
  beforeEach(() => {
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/tickets/list'); // URL del formulario
  });

  // --------- Escenarios positivos ---------
  it.only('✅ Escenario login exitoso', () => {
   
    cy.get('[data-cy="input-email"]').type('admin@admin.com')
    cy.get('[data-cy="input-password"]').type('admin')
    cy.get ('[data-cy="btn-login"]').click()

    cy.wait(2000)
    cy.url().should('include', 'tickets/list')
  })

  it('✅ Registro del campo email', () => {
   
    const email = generarEmail(true);

    cy.get('[data-cy="input-email"]').type(email)
    cy.get('[data-cy="input-password"]').type('admin')
    cy.get ('[data-cy="btn-login"]').click()
    
  })

  it('✅ link olvido su contraseña', () => {
   
    cy.get ('[data-cy="btn-forgot-password"]').click()
    
  })

  it('✅ link No tienes cuenta, Registrate', () => {
   
    cy.get ('[data-cy="btn-register-user"]').click()
    
  })

   it('✅ link quieres crear tus eventos', () => {
   
    cy.get ('[data-cy="btn-register-client"]').click()
    
  })

   // --------- Escenarios negativos ---------
  it('❌ Email inválido muestra error', () => {
    const emailInvalido = generarEmail(false);

    cy.get('[data-cy="input-email"]').type(emailInvalido);
    cy.get('[data-cy="input-password"]').type('admin')
    cy.get ('[data-cy="btn-login"]').click()

    cy.get('[data-slot="error-message"').should('be.visible')
  });

  it('❌ Intentar enviar formulario con campos vacíos', () => {
    cy.get ('[data-cy="btn-login"]').click()
    cy.contains('Correo o contraseña incorrectos').should('be.visible');
  });


})