describe('Filtrar por provincia y localidad', () => {
  
  beforeEach(() => {
          cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit('https://vps-3696213-x.dattaweb.com/');

  });
  
  it('Filtra eventos por Córdoba y luego una localidad', () => {
    // Seleccionar provincia
    cy.contains('[data-slot="mainWrapper"]', 'Provincia').click();
    cy.get('[data-slot="listbox"]').contains('Córdoba').click()
    .wait(3000);
    // Seleccionar localidad
    cy.contains('[data-slot="mainWrapper"]', 'Localidad').click()
    .wait(3000);
    cy.get('[data-slot="listbox"]').contains('Córdoba').click()
    .wait(3000);


    cy.get('[data-cy="evento-titulo"]').should('exist');
  });

  it('Checkear por localidades sin eventos', () => {
    const provincias = [
      "Catamarca", 
      "Chaco", 
      "Chubut", 
      "Ciudad Autónoma de Buenos Aires",
      "Córdoba",
      "Corrientes"
    ]

    cy.wait(3000)
    // Seleccionar provincias
    for(const p of provincias) {
      cy.get('[data-slot="mainWrapper"]').eq(1).click();
      cy.get('[data-slot="listbox"]').contains(p).click().wait(3000);

      cy.get('[data-cy="evento-titulo"]').should('exist');
    }
  });
});
