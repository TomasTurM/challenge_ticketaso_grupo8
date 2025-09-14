


describe("Modulo registro exitoso", () => {

 
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
    });




    it("DNI solo numérico", () => {
       
        cy.fillInputs('ABCD1234');
        cy.clickRegisterButton();

        cy.get('[data-cy="input-dni"]').should('have.value', '1234');
        cy.contains("Utiliza un formato que coincida con el solicitado").should('be.visible')
    });





})