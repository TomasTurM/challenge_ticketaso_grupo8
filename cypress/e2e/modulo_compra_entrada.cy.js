describe('Modulo compra de entradas', {testIsolation: false}, () => {
  // TODO: poner login como un command
  beforeEach(() => {
    // logeamos con el usuario admin para poder tener acceso a las entradas
    cy.visit('https://vps-3696213-x.dattaweb.com/auth/login'); // URL login entorno QA 
    // cy.visit('https://ticketazo.com.ar/auth/login'); // URL login entorno QA 
    cy.get('[data-cy="input-email"]').type('admin@admin.com')
    cy.get('[data-cy="input-password"]').type('admin{enter}')
    cy.wait(400)
    // luego de logearnos, entramos a la compra de una entrada gratuita con mapa de sectores
    cy.visit('https://vps-3696213-x.dattaweb.com/compra/Tesis%20Cervantes?horario=27'); // url QA
    // cy.visit('https://ticketazo.com.ar/compra/Tesis%20Cervantes?horario=27'); // url prod
  });

  it('✅ Escenario compra entrada gratuita exitosa', () => {
    cy.wait(1000)
    // en el mapa de secciones, seleccionamos la primera seccion disponible
    cy.get('.container > .bg-white').find('button').eq(0).click()
    // seleccionamos algun asiento disponible
    cy.get('.bg-orange-500').eq(1).click()
    cy.contains('Comprar').click()
    cy.contains('Generar Entrada Gratuita').click()

    cy.wait(1000)
    // checkeamos si llegamos a la pagina de entradas
    cy.get('[data-cy="titulo-mis-entradas"]').should('be.visible')

    // TODO: checkear que la entrada que se desea, aparece en la lista
  })
})