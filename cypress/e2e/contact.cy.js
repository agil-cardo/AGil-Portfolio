describe('Formulaire de Contact', () => {
  beforeEach(() => {
    cy.visit('https://agil-cardo.github.io/AGil-Portfolio/')
    cy.get('[data-cy="contact-name"]', { timeout: 5000 }).should('be.visible');
  })
})

it('Vérifier le titre de la page', () => {
  cy.get('[data-cy="contact-name"]').type('Pepito');
  cy.get('[data-cy="contact-email"]').type('pepito@aol.com');
  cy.get('[data-cy="contact-message"]').type('Ceci est un message de test');
  cy.get('[data-cy="contact-send-btn"]').click();
});