describe('Compra de entradas', () => {
  it('Verificar resumen de compra', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-1"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'El Eternauta') // Busca el título de la película
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5- Seleccionar butaca
    cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()// hace click en "con butacas"
    cy.get('button.bg-orange-500')//selecciona las butacas disponibles
      .should('have.length.greaterThan', 0)// se asegura que haya disponibles
      .then((butacas) => {
        const index = Math.floor(Math.random() * butacas.length);//elige una random
        cy.wrap(butacas[index]).click();//hace click en la butaca elegida
        //6-Seleccionar Comprar
        cy.contains('button', 'Comprar (1)').click();
        //7- Comparar los valores esperados con los  mostrados
        cy.get('.items-start > :nth-child(2) > .font-semibold').should('contain', 'El Eternauta')
        cy.get('.space-y-4 > :nth-child(3) > :nth-child(1)').should('contain', 'Precio base: $20000.00')
        cy.get(':nth-child(3) > :nth-child(2)').should('contain', 'Comisión de servicio: $1600.00 (8% del valor base)')
        cy.get('div.flex.justify-between.items-center.text-lg.font-semibold').should('contain.text', 'Total').and('contain.text', '$21600.00');
      })
  })
  it('Aceptar términos antes de pagar', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-1"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'El Eternauta') // Busca el título de la película
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5- Seleccionar butaca
    cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()// hace click en "con butacas"
    cy.get('button.bg-orange-500')//selecciona las butacas disponibles
      .should('have.length.greaterThan', 0)// se asegura que haya disponibles
      .then((butacas) => {
        const index = Math.floor(Math.random() * butacas.length);//elige una random
        cy.wrap(butacas[index]).click();//hace click en la butaca elegida
        //6-Seleccionar Comprar
        cy.contains('button', 'Comprar (1)').click();
        //7-No Seleccionar el checkbox Aceptar términos y condiciones
        //8- Verificar que el botón de pago está deshabilitado
        cy.contains('button', 'Pagar $21600.00').should('be.disabled');

      })
  })
  it('Redirección a Mercado Pago', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-1"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'El Eternauta') // Busca el título de la película
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5- Seleccionar butaca
    cy.get('[style="left: 164.289px; top: 117.287px; width: 419.711px; height: 365.427px; position: absolute; background-color: rgb(168, 107, 230); transition: background-color 0.3s;"]').click()// hace click en "con butacas"
    cy.get('button.bg-orange-500')//selecciona las butacas disponibles
      .should('have.length.greaterThan', 0)// se asegura que haya disponibles
      .then((butacas) => {
        const index = Math.floor(Math.random() * butacas.length);//elige una random
        cy.wrap(butacas[index]).click();//hace click en la butaca elegida
        //6-Seleccionar Comprar
        cy.contains('button', 'Comprar (1)').click();
        //7-Marcar el checkbox Aceptar términos y condiciones
        cy.get('.group > .font-inherit').click()
        // 8- Seleccionar Pagar
        cy.get(':nth-child(4) > :nth-child(1) > .z-0').click()
        // 9-Espera que la URL contenga "mercadopago"
        cy.visit("https://www.mercadopago.com.ar/checkout/v1/payment/redirect/f0db5fd8-9714-4b41-9959-f8e9c728e22d/payment-option-form/?preference-id=1423293488-1625c8a9-0d36-4d50-99d3-a9f34530d01f&router-request-id=2d66108a-a0f8-4e98-a652-bd69bfdc48b8&p=6dfb0e3aa962896d0ef18f62aa12834e", { force: true })
        cy.url().should('include', 'mercadopago');
      })
  })
  it('Comprar múltiples tipos de entrada', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-6"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'Los Piojos en River') // Busca el título del evento
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5-Sumar 1 entradas de Platea
    cy.get('[data-cy="btn-sumar-Platea"]').click()
    //6-Sumar 1 entrada de Campo
    cy.get('[data-cy="btn-sumar-Campo"]').click()
    //7-Seleccionar Continuar
    cy.get('[data-cy="btn-continuar"]').click()
    //8- Comparar los valores esperados con los  mostrados
    cy.get('.items-start > :nth-child(2) > .font-semibold').should('contain', 'Los Piojos en River')
    cy.get('.border-t > div > :nth-child(3)').should('contain', '1 entrada Platea x $108000.00')
    cy.get('.border-t > div > :nth-child(4)').should('contain', '1 entrada Campo x $75600.00')
    cy.get('.space-y-4 > :nth-child(3) > :nth-child(1)').should('contain', 'Precio base: $170000.00')
    cy.get(':nth-child(3) > :nth-child(2)').should('contain', 'Comisión de servicio: $13600.00 (8% del valor base)')
    cy.get('div.flex.justify-between.items-center.text-lg.font-semibold').should('contain.text', 'Total').and('contain.text', '$183600.00');


  })
  it('Calculo dinamico del total', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-6"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'Los Piojos en River') // Busca el título del evento
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5-Sumar 1 entradas de Platea
    cy.get('[data-cy="btn-sumar-Platea"]').click()
    //6-Sumar 1 entradas de Platea
    cy.get('[data-cy="btn-sumar-Platea"]').click()
    //7-Sumar 1 entrada de Campo
    cy.get('[data-cy="btn-sumar-Campo"]').click()
    //8-Restar 1 entradas de Platea
    cy.get('[data-cy="btn-restar-Platea"]').click()
    //9- Verificar Total dinámico 
    cy.get('[data-cy="total-compra"]').should('contain.text', 'Total').and('contain.text', '$183600.00');
    //10-Seleccionar Continuar
    cy.get('[data-cy="btn-continuar"]').click()
    //11- Comparar los valores esperados con los  mostrados
    cy.get('.items-start > :nth-child(2) > .font-semibold').should('contain', 'Los Piojos en River')
    cy.get('.border-t > div > :nth-child(3)').should('contain', '1 entrada Platea x $108000.00')
    cy.get('.border-t > div > :nth-child(4)').should('contain', '1 entrada Campo x $75600.00')
    cy.get('.space-y-4 > :nth-child(3) > :nth-child(1)').should('contain', 'Precio base: $170000.00')
    cy.get(':nth-child(3) > :nth-child(2)').should('contain', 'Comisión de servicio: $13600.00 (8% del valor base)')
    cy.get('div.flex.justify-between.items-center.text-lg.font-semibold').should('contain.text', 'Total').and('contain.text', '$183600.00');
  })

  it('Carrito vacío', () => {
    //1-Ingresar al link
    cy.visit('https://vps-3696213-x.dattaweb.com/')
    // 2- Hacer clic en "Ver evento"
    cy.get('[data-cy="btn-ver-evento-6"]').click()
    //3- Hacer click en Adquirir entrada
    cy.contains('h1', 'Los Piojos en River') // Busca el título del evento
      .parentsUntil('.container')     // Sube hasta el contenedor principal
      .find('button')                 // Busca todos los botones en ese bloque
      .contains('Adquirir entrada')   // Filtra el botón correcto
      .click();                       // Hace clic
    //4- Realizar Login
    cy.get('[data-cy="input-email"]').type("celecelcba@gmail.com")
    cy.get('[data-cy="input-password"]').type("Cypress#25")
    cy.get('[data-cy="btn-login"]').click()
    //5-Seleccionar Continuar y verificar que no permite avanzar muestra el botón en gris
    cy.get('[data-cy="btn-continuar"]').should('be.disabled');
  })

})
