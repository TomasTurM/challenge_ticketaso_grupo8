// pageObjects/LoginPage.js

class LoginPage {
    get emailInput() {
        return cy.get('[data-cy=input-email]');
    }

    get passwordInput() {
        return cy.get('[data-cy=input-password]');
    }

    get loginButton() {
        return cy.get('[data-cy=btn-login]');
    }

    get forgotPasswordButton() {
        return cy.get('[data-cy=btn-forgot-password]');
    }

    get registerUserButton() {
        return cy.get('[data-cy=btn-register-user]');
    }

    
    get registerClientButton() {
        return cy.get('[data-cy=btn-register-client]');
    }

    enterEmail(email) {
        this.emailInput.clear().type(email);
    }

    enterPassword(password) {
        this.passwordInput.clear().type(password);
    }

    clickLogin() {
        this.loginButton.click();
    }

    clickForgotPassword() {
        this.forgotPasswordButton.click();
    }

    clickRegisterUser() {
        this.registerUserButton.click();
    }

    clickRegisterClient() {
        this.registerClientButton.click();
    }
        
}

// 
/*

 TC30	Registro de usuario	DNI solo numérico
 TC31	Registro de usuario	DNI < 8 dígitos
 TC32	Registro de usuario	DNI > 8 dígitos
 TC33	Registro de usuario	Teléfono solo numérico
 TC34	Registro de usuario	Teléfono con 10 dígitos
 TC35	Registro de usuario	Teléfono > 10 dígitos
 TC36	Registro de usuario	Email sin @ (formato inválido)
 TC37	Registro de usuario	Password mínima
 TC38	Registro de usuario	Password compleja
 TC39	Login	Sesión expirada
 */

const REGISTER_URL = 'https://ticketazo.com.ar/auth/registerUser';
// Ajustá este patrón para tu API real (ej: '**///api/**/register*' o '**/auth/**/register*')

const REGISTER_API_PATTERN = 'api/backend/register/register-user';

const selectAutocomplete = (selector, text) => {
  cy.get(selector).clear().type(text);

  cy.get('body').then(($body) => {
    const hasListbox = $body.find('[role="listbox"] [role="option"]').length > 0;
    if (hasListbox) {
      cy.get('[role="listbox"] [role="option"]').first().click();
    } else {
      cy.get(selector).type('{enter}');
    }
  });
};

const setDate = (rootSelector, { d, m, y }) => {
  cy.get(rootSelector).within(() => {
    cy.get('[data-type="day"]').click().type(String(d).padStart(2, '0'));
    cy.get('[data-type="month"]').click().type(String(m).padStart(2, '0'));
    cy.get('[data-type="year"]').click().type(String(y));
  });
};

const fillAllValid = (overrides = {}) => {
      const randomDni = () => String(Math.floor(10000000 + Math.random() * 90000000));
  const data = {
    nombres: 'Facundo',
    apellido: 'Pasqua',
    telefono: '1234567890', // 10 dígitos
    dni: randomDni(),       // 8 dígitos
    provincia: 'Córdoba',
    localidad: 'Córdoba',
    fechaNac: { d: 5, m: 11, y: 1996 },
    email: `facu.qa+${Date.now()}@example.com`,
    confirmarEmail: null, // si es null, usa el mismo que email
    password: 'Qa!12345',
    repetirPassword: null // si es null, usa el mismo que password
  };

  Object.assign(data, overrides);
  if (!data.confirmarEmail) data.confirmarEmail = data.email;
  if (!data.repetirPassword) data.repetirPassword = data.password;

  cy.get('[data-cy="input-nombres"]').clear().type(data.nombres);
  cy.get('[data-cy="input-apellido"]').clear().type(data.apellido);

  cy.get('[data-cy="input-telefono"]').clear().type(data.telefono);
  cy.get('[data-cy="input-dni"]').clear().type(data.dni);

  selectAutocomplete('[data-cy="select-provincia"]', data.provincia);
  selectAutocomplete('[data-cy="select-localidad"]', data.localidad);

  // fechaNac: si es false, la dejamos incompleta (negativo)
  if (data.fechaNac) setDate('[data-cy="input-fecha-nacimiento"]', data.fechaNac);

  cy.get('[data-cy="input-email"]').clear().type(data.email);
  cy.get('[data-cy="input-confirmar-email"]').clear().type(data.confirmarEmail);

  cy.get('[data-cy="input-password"]').clear().type(data.password, { log: false });
  cy.get('[data-cy="input-repetir-password"]').clear().type(data.repetirPassword, { log: false });

  return data;
};

const assertNoRegisterRequest = () => {
  // Damos un respiro a la UI para intentar enviar
  cy.wait(400);
  // En Cypress se puede inspeccionar la cantidad de intercepciones con .all
  cy.get('@register.all').should('have.length', 0);
};

describe('Registro de cuenta', () => {
  beforeEach(() => {
    cy.intercept('POST', REGISTER_API_PATTERN).as('register'); // spy (no stub)
    cy.visit(REGISTER_URL);
  });

  it('registra correctamente y devuelve 200/201', () => {
    fillAllValid();

    // Antes de enviar, no debería haber inputs inválidos
    cy.get('input:invalid').should('have.length', 0);

    cy.get('[data-cy="btn-registrarse"]').click();

    // Asertamos respuesta 200/201 de la request real
    cy.wait('@register').its('response.statusCode').should('be.oneOf', [200, 201]);

    // Opcional: assert de redirección o mensaje de éxito
    // cy.url().should('include', '/auth/login');
    // cy.contains(/registro (exitoso|completado)/i).should('be.visible');
  });

  it('no envía si hay campos requeridos vacíos', () => {
    // Click directo sin completar nada
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('input:invalid').its('length').should('be.greaterThan', 0);
    assertNoRegisterRequest();
  });

  
  it('no envía con teléfono inválido (<10 dígitos)', () => {
    fillAllValid({ telefono: '351123' }); // inválido por pattern/maxlength
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-telefono"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });


  //----------TELEFONO SOLO NUMERICO pruebo fallo  telefono con letras ------------------------
 
  
   it(' TC30	Registro de usuario	DNI solo numérico', () => {
    fillAllValid({ dni: '1234PP78' });
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-dni"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });


  it('TC31	Registro de usuario	DNI < 8 dígitos-No envia (<8 dígitos)', () => {
    fillAllValid({ dni: '1234' });
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-dni"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });



    it(' TC32	Registro de usuario	DNI > 8 dígitos', () => {
    fillAllValid({ dni: '1234' });
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-dni"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });

  it('TC33	Registro de usuario	Teléfono solo numérico', () => {
    fillAllValid({ telefono: '35112ABC67' });
    cy.get('[data-cy="btn-registrarse"]').click();
   // cy.get('[data-cy="input-telefono"]').should('have.class', 'error');
     cy.get('[data-cy="input-telefono"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });




    it('TC34	Registro de usuario	Teléfono con 10 dígitos', () => {
    fillAllValid({ telefono: '1234567' });
    cy.get('[data-cy="btn-registrarse"]').click();
   // cy.get('[data-cy="input-telefono"]').should('have.class', 'error');
     cy.get('[data-cy="input-telefono"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });


  it('TC35	Registro de usuario	Teléfono > 10 dígitos', () => {
    fillAllValid({ telefono: '12345678901' });
    cy.get('[data-cy="btn-registrarse"]').click();
   // cy.get('[data-cy="input-telefono"]').should('have.class', 'error');
 // cy.get('[data-cy="input-telefono"]').invoke('val').should('have.length', 11);
     cy.get('[data-cy="input-telefono"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
   });
    assertNoRegisterRequest();

it('TC35 Registro de usuario - Teléfono > 10 dígitos', () => {
  fillAllValid({ telefono: '123456789012' }); // 11 dígitos
  cy.get('[data-cy="btn-registrarse"]').click();

  // Verifica que el campo sea inválido
  cy.get('[data-cy="input-telefono"]').then(($i) => {
    expect($i[0].checkValidity()).to.equal(false);
  });

  // Verifica que no se haya enviado la solicitud
  assertNoRegisterRequest();

});

  });

  it('TC36	Registro de usuario	Email sin @ (formato inválido)', () => {
    fillAllValid({ email: 'facu@', confirmarEmail: 'facu@' }); // inválido HTML5
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-email"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });


    it(' TC37	Registro de usuario	Password mínima', () => {
    fillAllValid({
      password: '12345',
      repetirPassword: '12345' });
    cy.get('[data-cy="btn-registrarse"]').click();
    
    cy.get('[data-cy="input-password"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });//.should('have.class', 'error');
    assertNoRegisterRequest();
  });

 it(' TC38	Registro de usuario	Password compleja SIN (CARACTER ESPECIAL', () => {
    fillAllValid({
      password: '123qqq',
      repetirPassword: '123qqq'
    });
    cy.get('[data-cy="btn-registrarse"]').click();

    cy.get('[data-cy="input-password"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(true);
    });
    assertRegisterRequest();
  });

    /*
   
  // --------pruebo fallo DNI ---------------------------------------
 
    it('falla con DNI que contiene caracteres especiales', () => {
    fillAllValid({ dni: '123#4567' });
    cy.get('[data-cy="btn-registrarse"]').click();
   // cy.get('[data-cy="input-dni"]').should('have.class', 'error');
     cy.get('[data-cy="input-dni"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });
    assertNoRegisterRequest();
  });

  */

 //------------pruebo fallo correos  malformados -------------------
/*
   it('falla con emails malformados', () => {
    const invalidEmails = [
      'test@.com',
      '@domain.com',
      'testdomain.com',
      'test@domain.',
      'test@@domain.com'
    ];

    invalidEmails.forEach(email => {
      fillAllValid({
        email: email,
        confirmarEmail: email
      });
      cy.get('[data-cy="btn-registrarse"]').click();
 cy.get('[data-cy="input-email"]').then(($i) => {
      expect($i[0].checkValidity()).to.equal(false);
    });

    //  cy.get('[data-cy="input-email"]').should('have.class', 'error');
      assertNoRegisterRequest();
    });
  });


  //---------------pruebo el fallo de nombres muy largos -------------------
 
    it('falla con nombres extremadamente largos', () => {
    const longName = 'a'.repeat(256);
    fillAllValid({
      nombres: longName
    });
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('[data-cy="input-nombres"]').should('have.class', 'error');
    assertNoRegisterRequest();
  });



  //--------------pruebo fallo  Fecha Nacimiento futura---------------------------
 
    it('falla con fecha de nacimiento futura', () => {
    fillAllValid({
      fechaNac: { d: 1, m: 1, y: 2025 }
    });
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('[data-cy="input-fecha-nacimiento"]').should('have.class', 'error');
    assertNoRegisterRequest();
  });


  it('no envía si los emails NO coinciden (si tu UI lo valida)', () => {
    // Si la app no valida en front esta regla, este test fallará: ajustalo según comportamiento real.
    fillAllValid({
      email: `facu.qa+${Date.now()}@example.com`,
      confirmarEmail: 'otro+correo@example.com'
    });

    cy.get('[data-cy="btn-registrarse"]').click();

    // Esperamos que el front evite enviar al backend
    assertNoRegisterRequest();

    // (Opcional) si hay mensaje de error
    // cy.contains(/emails? no coinciden/i).should('be.visible');
  });



  //-----------------------pruebo fallo   si registro usuario ya existente ---------------------
 
    it('falla al intentar registrar un usuario ya existente', () => {
    cy.intercept('POST', 'api/backend/register/register-user', {
      statusCode: 409,
      body: {
        error: 'el Usuario ya esta registrado'
      }
    }).as('registerExisting');

    fillAllValid({
      email: 'existing@example.com',
      confirmarEmail: 'existing@example.com'
    });

    cy.get('[data-cy="btn-registrarse"]').click();
    cy.wait('@registerExisting');
    cy.contains('Usuario ya registrado').should('be.visible');
  });

  //-------------------------fallo  prueba  si el servidor no responde -----------------------
 
  it('falla cuando el servidor no responde', () => {
    cy.intercept('POST', 'api/backend/register/register-user', {
      forceNetworkError: true
    }).as('registerError');

    fillAllValid();
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.contains('Error de conexión').should('be.visible');
  });

  //-------------------pruebo fallo  si envio caracteres especiales en todos los campos -------------
 
   it('falla al intentar enviar caracteres especiales en todos los campos', () => {
    fillAllValid({
      nombres: '!@#$%^&*()',
      apellido: '!@#$%^&*()',
      telefono: '!@#$%^&*()',
      dni: '!@#$%^&*()',
    });
    
    cy.get('[data-cy="btn-registrarse"]').click();
    cy.get('input:invalid').its('length').should('be.greaterThan', 0);
    assertNoRegisterRequest();
  });


  it('no envía si la fecha está incompleta', () => {
    // Pasamos fechaNac = false para dejar "dd/mm/aaaa"
    fillAllValid({ fechaNac: false });

    cy.get('[data-cy="btn-registrarse"]').click();

    // El DateField incluye un input hidden required -> debe invalidar el form
    cy.get('input:invalid').its('length').should('be.greaterThan', 0);
    assertNoRegisterRequest();
  });

  it('permite ir al login desde el link', () => {
    cy.get('[data-cy="btn-login-link"]').click();
    cy.url().should('include', '/auth/login');
  });

  */
});


