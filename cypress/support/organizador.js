const organizadorEmail1 = 'ceferinomonier@hotmail.com';
const organizadorPassword1= 'Si12345678.'
//const organizadorEmail = 'admin@admin.com';
//const organizadorPassword = 'admin';





Cypress.Commands.add('registroOrganizador', (email = 'ceferinomonier@gmail.com') => {
   cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://vps-3696213-x.dattaweb.com/');
    cy.get('a > .z-0').click({ force: true }); // Click en "Iniciar sesión"
    cy.get('[data-cy="btn-register-client"]').click(); // Click en "Registrarse como organizador"

    cy.get('[data-cy="input-razon-social"]').type('Metallica');
    cy.get('[data-cy="input-telefono"]').type('3698521478');
    cy.get('[data-cy="input-email"]').type(email);
    cy.get('[data-cy="input-confirmar-email"]').type(email);
    cy.get('[data-cy="input-password"]').type('Fabian0453+');
    cy.get('[data-cy="input-repetir-password"]').type('Fabian0453+');
    cy.get('[data-cy="input-cuit"]').type('43475896');
    cy.get('[data-cy="input-direccion"]').type('Calle Cualquiera 0453');
    cy.get('[data-cy="select-provincia"]').click();
    cy.contains('.cursor-pointer', 'Córdoba').click();
    cy.get('[data-cy="select-localidad"]').click().type('La Calera');
    cy.contains('.cursor-pointer', 'La Calera').click();

    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('[data-cy="error-message"]').should('not.exist');
});


Cypress.Commands.add('crearOrganizadorViaAPI', (email = 'ceferinomonier@gmail.com') => {
    const payload = {
        nombre: "OLAF DISCO",
        dni: "",
        numeroTelefono: "3698521478",
        email,
        confirmarEmail: email,
        password: "Fabian0453+",
        repetirPassword: "Fabian0453+",
        cuit: "43475896",
        provincia: 22,
        localidad: 22028010,
        direccion: "Calle Cualquiera 0453",
        tipo: 0
    };
   




    cy.request({
        method: 'POST',
        url: 'https://vps-3696213-x.dattaweb.com/api/backend/register/register-client',
        body: payload,
        failOnStatusCode: false
    }).then((response) => {
        expect(response.status).to.eq(201);
    });
});

Cypress.Commands.add('loginOrganizadorPos', () => {
       cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://vps-3696213-x.dattaweb.com/');

    cy.get('.loader').should('not.exist');

    ///cy.get('a > .z-0').should('be.visible').click();
       cy.get('a > .z-0').click({ force: true }); // Click on "Iniciar sesión"
    cy.get('[data-cy="input-email"]').type(organizadorEmail1);
    cy.get('[data-cy="input-password"]').type(organizadorPassword1);
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('not.exist');
});

Cypress.Commands.add('loginOrganizadorEmailNeg', () => {
       cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://vps-3696213-x.dattaweb.com/');


    cy.get('a > .z-0').click({ force: true });
    cy.get('[data-cy="input-email"]').type('incorrecto'); // Email incorrecto
    cy.get('[data-cy="input-password"]').type(organizadorPassword1);
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
})

Cypress.Commands.add('loginOrganizadorPassNeg', () => {
        cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://vps-3696213-x.dattaweb.com/');
    cy.get('a > .z-0').click({ force: true });
    cy.get('[data-cy="input-email"]').type(organizadorEmail1);
    cy.get('[data-cy="input-password"]').type('incorrecto'); // Contraseña incorrecta
    cy.get('[data-cy="btn-login"]').click();
    cy.get('[data-cy="error-message"]').should('be.visible');
});

Cypress.Commands.add('crearEventoPositivo', () => {
   



     cy.viewport(1400, 900); // Fuerza modo escritorio
    cy.get('a[href="/newEvent"]').click({ force: true })
    cy.contains('Cargar Función').should('be.visible')
    cy.get('[data-cy="input-titulo"]').type('Metallica Black Album Tributo');

    cy.get('[aria-label="día, "]').type('01')
    cy.get('[aria-label="mes, "]').type('01')
    cy.get('[aria-label="año, "]').type('2027')
    cy.get('[data-cy="select-edad"]').click()
    cy.get('[data-cy="option-edad-ATP"]').click()
    cy.get('[data-cy="select-genero"]').click()
    cy.get('[data-cy="option-genero-Recital"]').click()
    cy.get('[data-cy="input-horario"] [aria-label="hora, "]').type('21')
    cy.get('[data-cy="input-horario"] [aria-label="minuto, "]').type('00')
    cy.get('[data-cy="input-duracion"] [aria-label="hora, "]').type('03')
    cy.get('[data-cy="input-duracion"] [aria-label="minuto, "]').type('30')

    cy.get('[data-cy="select-lugar-evento"]').click();
    cy.get('[data-cy="option-lugar-7"]').click();
   

    cy.get('[data-cy="input-nombre-lugar"]').type('Ceferino Events');
    cy.get('[data-cy="input-calle-lugar"]').type('Cordoba');
    cy.get('[data-cy="input-altura-lugar"]').type('0453');
    cy.get('[data-cy="input-codigo-postal-lugar"]').type('5800');
    cy.get('input[placeholder="Seleccione una provincia"]').click();
    cy.contains('span', 'Córdoba').click();
    cy.get('input[placeholder="Seleccione una localidad"]', { timeout: 10000 })
    .type('Córdoba').type('{enter}').click();

   // cy.contains('span', '/C[oó]rdoba/i').should('be.visible').type('{enter}').click();
    cy.get('[data-cy="input-info"]').type('Concierto tributo METALLICA');

    cy.contains('button', 'Siguiente').click();

    // Elección de entradas
    cy.contains('span', 'Seleccionar entrada').click();
    cy.contains('span', 'Campo').click();
    cy.get('input[aria-label="Capacidad"]').type('3000');
    cy.get('input[aria-label="Precio Entrada"]').type('0');
    cy.contains('button', 'Agregar Entrada').click();

    cy.contains('span', 'Seleccionar entrada').click();
    cy.contains('span', 'Palco').click();
    cy.get('input[name="capacidadEntrada1"]').type('500');
    cy.get('input[name="precioEntrada1"]').type('50');

    cy.contains('button', 'Siguiente').click()

    // Agregar imagen evento
    cy.contains('button', 'Cargar Imagen Evento').find('input[type="file"]').selectFile('cypress/fixtures/image.jpg', { force: true });
    cy.contains('button', 'Siguiente').click()

    cy.contains('button', 'Confirmar').click()

    // Verifica mensaje de éxito en la web
    cy.contains('Tu evento fue guardado y está pendiente de aprobación.').should('be.visible');
})