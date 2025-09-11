describe('Modulo compra de entradas', {testIsolation: false}, () => {
  // before(() => {
  //   // logeamos con el usuario admin para poder tener acceso a las entradas
  //   cy.visit('https://vps-3696213-x.dattaweb.com/auth/login'); // URL login entorno test 
  //   cy.get('[data-cy="input-email"]').type('admin@admin.com')
  //   cy.get('[data-cy="input-password"]').type('admin')
  //   cy.get ('[data-cy="btn-login"]').click()
  // })

  beforeEach(() => {
    // luego de logearnos, entramos a la compra de una entrada gratuita con mapa de sectores
    cy.visit('https://vps-3696213-x.dattaweb.com/compra/Tesis%20Cervantes?horario=27'); 
  });

  it('✅ Escenario compra entrada gratuita exitosa', () => {
    cy.wait(400)
    cy.get('.container > .bg-white').find('button').eq(0).click()
  })
})