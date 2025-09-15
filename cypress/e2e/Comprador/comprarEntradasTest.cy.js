describe('Usuario compra entradas de evento', () => {

 

    it('Compra exitosa de entradas con usuario ingresado', () => {
           cy.viewport(1400, 900); // Fuerza modo escritorio
        cy.loginCompradorPos();
        cy.comprarEntradasConButacas();
    })

    it('Redirige a login si no está autenticado', () => {
            cy.viewport(1400, 900); // Fuerza modo escritorio

        cy.visit('https://vps-3696213-x.dattaweb.com/');
        cy.comprarEntradasConButacas();
        cy.url().should('include', '/auth/login');
    })
   
})