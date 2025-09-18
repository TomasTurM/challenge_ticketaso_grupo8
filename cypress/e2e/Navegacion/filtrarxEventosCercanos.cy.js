describe("Filtrar por Eventos Cercanos", () => {
  const eventocercano = false;
   let url1 = "https://ticketazo.com.ar"
let  urlapi="https://vps-3696213-x.dattaweb.com/" 
 
  it("click en eventos cercanos", () => {
   
      
     // cy.visit("https://vps-3696213-x.dattaweb.com/");
           cy.viewport(1400, 900); // Fuerza modo escritorio

           cy.visit(urlapi);
           cy.wait(1000);
           

      //cy.contains('locationFilter').first().click();
       cy.get('[data-slot="input"]').last().click()
       //cy.get('[aria-label=" "]').contains('locationFilter').first().click();
                  cy.wait(1000);


          
      
   
});
  });
