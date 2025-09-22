import * as userData from "./Data/UserData";


describe("Modulo registro de usuario Parte 1", () => {

 
    beforeEach(() => {
        cy.visit('https://ticketazo.com.ar/auth/registerUser')
    });


    it("Registro exitoso", () => { // Plan de pruebas 1
       cy.intercept('POST', '/api/backend/register/register-user').as('registerRequest');
       cy.fillInputsAndSubmit({ ...userData.userDataWithCorrectPassword });
       cy.wait('@registerRequest').its('response.statusCode').should('eq', 201);
       cy.url().should('include', '/auth/login');
    });

    it("Contraseña no coincide", () => { // Plan de pruebas 2
        cy.fillInputsAndSubmit({...userData.userDataWithWrongPassword});
        cy.contains("Las contraseñas no coinciden").should('be.visible')
    })

    it("Campo sin completar", () => { // Plan de pruebas 3
        cy.fillInputsAndSubmit({...userData.userDataWithEmptyDNI});
        cy.get('[data-invalid="true"]').should('be.visible')
    });


    it("Email ya registrado", () => { // Plan de pruebas 4
        cy.fillInputsAndSubmit({...userData.userDataWithRepeatEmail});
        cy.contains("Ya existe un usuario registrado con ese correo electrónico").should('be.visible')
    });

    it("Dni ya registrado", () => { // Plan de pruebas 5
        cy.fillInputsAndSubmit({...userData.userDataWithRepeatedDni});
        cy.contains("Ya existe un usuario registrado con ese DNI").should('be.visible')
    });

    it("Edad mínima no cumplida (<18)", () => { // Plan de pruebas 6
        cy.fillInputsAndSubmit({...userData.userDataWithWrongAge});
        cy.wait(5000)
        cy.url().should('include', '/auth/registerUser');
    });

    it("Correos electronicos distintos", () => { // Plan de pruebas 7
        cy.fillInputsAndSubmit({...userData.userDataWithDiferentEmail});
        cy.contains("Los correos electrónicos no coinciden").should('be.visible')
    });

    it("Contraseña erronea con menos de 8 digitos", () => { // Plan de pruebas 8
        cy.fillInputsAndSubmit({...userData.userDataWithShortPassword});
        cy.contains("La contraseña debe tener al menos 6 caracteres").should('be.visible')
    });

    it("Contraseña erronea sin caracterer especial y numero", () => { // Plan de pruebas 9
        cy.fillInputsAndSubmit({...userData.userDataWithWrongFormatPassword});
        cy.contains("La contraseña debe tener al menos 8 caracteres, incluyendo mayúsculas, minúsculas, números y símbolos.").should('be.visible')
    });

    it("DNI Invalido", () => { // Plan de pruebas 10
        cy.fillInputsAndSubmit({...userData.userDataWithWrongLengthDni});
    });

    it("Telefono Invalido", () => { // Plan de pruebas 11
        cy.fillInputsAndSubmit({...userData.userDataWithWrongFormatPhone});
        cy.contains("Utiliza un formato que coincida con el solicitado").should('be.visible')
        cy.get('[data-cy="input-telefono"]').should('have.value', '12345');
    });

    it("DNI solo numérico", () => { // Plan de pruebas 30
        cy.fillInputsAndSubmit({...userData.userDataWithWrongFormatDni});
        cy.get('[data-cy="input-dni"]').should('have.value', '1234');
        cy.get('[data-filled="true"][data-invalid="true"]').should('be.visible')
    });
})


    
describe('Modulo registro de usuario Parte 2', () => {

    beforeEach(() => {
        cy.fixture('example.json').as('userData')
    })

    it('DNI < 8 dígitos', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniInvalidoCorto,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailValido,
            password: this.userData.passwordValida
        })
        cy.contains('Utiliza un formato que coincida con el solicitado', { timeout: 10000 }).should('be.visible')
    }) 
    it('DNI > 8 dígitos', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniInvalidoLargo,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailValido,
            password: this.userData.passwordValida
        })
    })
    it('Telefono con letras', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoConLetras,
            email: this.userData.emailValido,
            password: this.userData.passwordValida
        })
    })
    it('Telefono valido', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailValido,
            password: this.userData.passwordValida
        })
    })
    it('Telefono con Exceso', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoExceso,
            email: this.userData.emailValido,
            password: this.userData.passwordValida
        })
    })
    it('Email sin ARROBA', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailInvalido,
            password: this.userData.passwordValida
        })
    })
    it('PASSWORD MINIMA', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailValido,
            password: this.userData.passwordCorta
        })
    })
    it('PASSWORD COMPLEJA', function() {
        cy.registrarUsuario({
            nombre: this.userData.nombre,
            apellido: this.userData.apellido,
            provincia: this.userData.provincia,
            localidad: this.userData.localidad,
            fechaNacimiento: this.userData.fechaNacimiento,
            dni: this.userData.dniValido,
            telefono: this.userData.telefonoValido,
            email: this.userData.emailValido,
            password: this.userData.passwordSinSimbolo
            })
    })
})