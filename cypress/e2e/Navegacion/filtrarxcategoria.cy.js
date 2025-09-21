describe("Filtrar por 3 categorías", () => {
  const categorias = ["Fiesta", "Teatro", "StandUp"];
   let url1 = "https://ticketazo.com.ar"
let  urlapi="https://vps-3696213-x.dattaweb.com/" 
 
  it("Selecciona 3 categorías específicas desde el dropdown y verifica los resultados", () => {
    categorias.forEach((categoria) => {
      
     // cy.visit("https://vps-3696213-x.dattaweb.com/");
           cy.viewport(1400, 900); // Fuerza modo escritorio

           cy.visit(urlapi);

      cy.contains('[data-slot="innerWrapper"]', "Categoría").click();
                  cy.wait(300);


            

      cy.get('[data-slot="listbox"]').contains(categoria).scrollIntoView().should('be.visible').click();
      
      
      cy.get('[data-cy="evento-titulo"]', { timeout: 5000 }).should("exist");
    });
  });
});

