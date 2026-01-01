// https://on.cypress.io/api

describe('My First Test', () => {
  it('visits the app root url', () => {
    cy.visit('/')
    // The root URL redirects to /home which contains Homecoming component
    // We check for the secondary header since it's the main content title
    cy.contains('h1', 'Cursos destacados')
  })
})
