import { userDataWithCorrectPassword,userDataWithWrongPassword, userDataWithEmptyDNI, userDataWithWrongFormatDni, userDataWithRepeatEmail } from "./Data/UserData";


describe("Modulo registro exitoso", () => {

 
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
    });


    it("Registro exitoso", () => {
        cy.fillInputs({...userDataWithCorrectPassword});
        cy.clickRegisterButton();
        cy.url().should('include', '/auth/login')
    })
    
    
    it("Contraseña no coincide", () => {
        cy.fillInputs({...userDataWithWrongPassword});
        cy.clickRegisterButton();
        cy.contains("Las contraseñas no coinciden").should('be.visible')
    })
    
    
    it("Campo sin completar", () => {
        cy.fillInputs({...userDataWithEmptyDNI});
        cy.clickRegisterButton();
        cy.contains("Completa este campo").should('be.visible')
    });


    it("Email ya registrado", () => {
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });


    it("DNI solo numérico", () => {
        cy.fillInputs({...userDataWithWrongFormatDni});
        cy.clickRegisterButton();
        cy.get('[data-cy="input-dni"]').should('have.value', '1234');
        cy.contains("Utiliza un formato que coincida con el solicitado").should('be.visible')
    });



})