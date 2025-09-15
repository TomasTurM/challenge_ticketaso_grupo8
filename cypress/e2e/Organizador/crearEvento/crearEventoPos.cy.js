describe('Crear evento desde POS', () => {
    beforeEach(() => {
        cy.loginOrganizadorPos();
    });

    it('Crear evento con datos válidos', () => {
        cy.crearEventoPositivo();
    });
})