describe('Modulo login exitoso', () => {
  it('passes', () => {
    cy.visit('https://ticketazo.com.ar/auth/login?callbackUrl=/tickets/list')
    cy.get('[data-cy="input-email"]').type('admin@admin.com')
    cy.get('[data-cy="input-password"]').type('admin')
    cy.get ('[data-cy="btn-login"]').click()
  })
})