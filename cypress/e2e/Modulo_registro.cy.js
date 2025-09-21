import { userDataWithCorrectPassword,userDataWithWrongPassword, userDataWithEmptyDNI, userDataWithWrongFormatDni, userDataWithRepeatEmail, userDataWithRepeatedDni, userDataWithWrongAge, userDataWithDiferentDni } from "./Data/UserData";


describe("Modulo registro exitoso", () => {

 
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
    });


    it.skip("Registro exitoso", () => { // Plan de pruebas 1
        cy.fillInputs({...userDataWithCorrectPassword});
        cy.clickRegisterButton();
        cy.url().should('include', '/auth/login')
    })
    
    
    it.skip("Contraseña no coincide", () => { // Plan de pruebas 2
        cy.fillInputs({...userDataWithWrongPassword});
        cy.clickRegisterButton();
        cy.contains("Las contraseñas no coinciden").should('be.visible')
    })
    
    
    it.skip("Campo sin completar", () => { // Plan de pruebas 3
        cy.fillInputs({...userDataWithEmptyDNI});
        cy.clickRegisterButton();
        cy.get('[data-invalid="true"]').should('be.visible')
    });


    it.skip("Email ya registrado", () => { // Plan de pruebas 4
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

    it.skip("Dni ya registrado", () => { // Plan de pruebas 5
        cy.fillInputs({...userDataWithRepeatedDni});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese DNI").should('be.visible')
    });

    it.skip("Edad mínima no cumplida (<18)", () => { // Plan de pruebas 6
        cy.fillInputs({...userDataWithWrongAge});
        cy.clickRegisterButton();
        //cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

    it.skip("Registro de email erroneo", () => { // Plan de pruebas 7
        cy.fillInputs({...userDataWithDiferentDni});
        cy.clickRegisterButton();
        cy.contains("Los correos electrónicos no coinciden").should('be.visible')
    });


     it.only("Contraseña erronea con menos de 8 digitos", () => { // Plan de pruebas 8
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });


    /*


     it.only("Contraseña erronea sin caracterer especial y numero", () => { // Plan de pruebas 9
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

     it.only("DNI Invalido", () => { // Plan de pruebas 10
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });


    it.only("Telefono Invalido", () => { // Plan de pruebas 11
        cy.fillInputs({...userDataWithRepeatEmail});
        cy.clickRegisterButton();
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

    */










    it("DNI solo numérico", () => { // Plan de pruebas 30
        cy.fillInputs({...userDataWithWrongFormatDni});
        cy.clickRegisterButton();
        cy.get('[data-cy="input-dni"]').should('have.value', '1234');
        cy.get('[data-filled="true"][data-invalid="true"]').should('be.visible')
    });



})