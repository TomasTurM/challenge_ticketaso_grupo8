describe("Filtrar por nombre de evento", () => {
  beforeEach(() => {
          cy.viewport(1400, 900); // Fuerza modo escritorio

    cy.visit("https://vps-3696213-x.dattaweb.com/");
  });

  it("Filtra eventos al escribir un nombre en el campo de búsqueda", () => {
    cy.get('input[aria-label="Search"]').type("test{enter}").wait(5000).clear();
  });

  it("Filtra eventos al escribir un nombre en el campo de búsqueda", () => {
    cy.get('input[aria-label="Search"]')
      .type("El Eternauta{enter}")
      .wait(5000)
      .clear();
  });

  it("No encuentra eventos con un nombre inexistente", () => {
    cy.get('input[aria-label="Search"]')
      .type("evento que no existe{enter}")
      .wait(5000)
      .clear();
  });
});



//probamos pantalla celular
describe("Filtrar por nombre de evento", () => {
  beforeEach(() => {
    cy.visit("https://vps-3696213-x.dattaweb.com/");
    cy.viewport(375, 677);
  });

  it("Filtra eventos al escribir un nombre en el campo de búsqueda", () => {
    cy.get('input[aria-label="Search"]').type("test{enter}").wait(5000).clear();
  });

  it("Filtra eventos al escribir un nombre en el campo de búsqueda", () => {
    cy.get('input[aria-label="Search"]')
      .type("El Eternauta{enter}")
      .wait(5000)
      .clear();
  });

  it("No encuentra eventos con un nombre inexistente", () => {
    cy.get('input[aria-label="Search"]')
      .type("evento que no existe{enter}")
      .wait(5000)
      .clear();
  });
});