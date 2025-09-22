describe('Login de usuario organizador casos negativos', () => {
    it('No permite login con email incorrecto', () => {
        cy.loginOrganizadorEmailNeg();
    })
    it('No permite login con contraseña incorrecta', () => {
        cy.loginOrganizadorPassNeg();
    })
})