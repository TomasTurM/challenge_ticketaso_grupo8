import { userDataWithCorrectPassword,userDataWithWrongPassword, userDataWithEmptyDNI, userDataWithWrongFormatDni, userDataWithRepeatEmail, userDataWithRepeatedDni, userDataWithWrongAge, userDataWithDiferentDni, userDataWithShortPassword, userDataWithWrongFormatPassword, userDataWithWrongLengthDni, userDataWithWrongPhone, userDataWithWrongLengthPhone, userDataWithWrongFormatPhone, userDataWithDiferentEmail } from "./Data/UserData";


describe("Modulo registro exitoso", () => {

 
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
    });


    it("Registro exitoso", () => { // Plan de pruebas 1
       cy.intercept('POST', '/api/backend/register/register-user').as('registerRequest');
       cy.fillInputsAndSubmit({ ...userDataWithCorrectPassword });
       cy.wait('@registerRequest').its('response.statusCode').should('eq', 201);
       cy.url().should('include', '/auth/login');
    });

    it("Contraseña no coincide", () => { // Plan de pruebas 2
        cy.fillInputsAndSubmit({...userDataWithWrongPassword});
        cy.contains("Las contraseñas no coinciden").should('be.visible')
    })

    it("Campo sin completar", () => { // Plan de pruebas 3
        cy.fillInputsAndSubmit({...userDataWithEmptyDNI});
        cy.get('[data-invalid="true"]').should('be.visible')
    });


    it("Email ya registrado", () => { // Plan de pruebas 4
        cy.fillInputsAndSubmit({...userDataWithRepeatEmail});
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

    it("Dni ya registrado", () => { // Plan de pruebas 5
        cy.fillInputsAndSubmit({...userDataWithRepeatedDni});
        cy.contains("Ya existe un usuario registrado con ese DNI").should('be.visible')
    });

    it("Edad mínima no cumplida (<18)", () => { // Plan de pruebas 6
        cy.fillInputsAndSubmit({...userDataWithWrongAge});
        cy.wait(5000)
        cy.url().should('include', '/auth/registerUser');
    });

    it("Correos electronicos distintos", () => { // Plan de pruebas 7
        cy.fillInputsAndSubmit({...userDataWithDiferentEmail});
        cy.contains("Los correos electrónicos no coinciden").should('be.visible')
    });

    it("Contraseña erronea con menos de 8 digitos", () => { // Plan de pruebas 8
        cy.fillInputsAndSubmit({...userDataWithShortPassword});
        cy.contains("La contraseña debe tener al menos 6 caracteres").should('be.visible')
    });

    it("Contraseña erronea sin caracterer especial y numero", () => { // Plan de pruebas 9
        cy.fillInputsAndSubmit({...userDataWithWrongFormatPassword});
        cy.contains("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.").should('be.visible')
    });

    it.only("DNI solo numérico", () => { // Plan de pruebas 30
        cy.fillInputsAndSubmit({...userDataWithWrongFormatDni});
        cy.get('[data-cy="input-dni"]').should('have.value', '1234');
        cy.get('[data-filled="true"][data-invalid="true"]').should('be.visible')
    });

    
    /*
    
    it("DNI Invalido", () => { // Plan de pruebas 10
        cy.fillInputsAndSubmit({...userDataWithWrongLengthDni});
    });

    it("Telefono Invalido", () => { // Plan de pruebas 11
        cy.fillInputsAndSubmit({...userDataWithWrongFormatPhone});
        cy.contains("Utiliza un formato que coincida con el solicitado").should('be.visible')
        cy.get('[data-cy="input-telefono"]').should('have.value', '12345');
    });

    */

})