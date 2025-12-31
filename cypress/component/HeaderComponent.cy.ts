import HeaderComponent from '../../src/components/HeaderComponent.vue'

describe('HeaderComponent', () => {
  beforeEach(() => {
    // Mount the component before each test
    cy.mount(HeaderComponent)
  })

  it('should render the header component', () => {
    // Test for the actual header element with id
    cy.get('#header').should('exist')
    cy.get('header').should('have.class', 'header')
  })

  it('should have navigation elements', () => {
    // Test navigation structure
    cy.get('#navbar').should('exist')
    cy.get('nav.navbar').should('exist')
  })

  it('should have logo elements', () => {
    // Test logo structure
    cy.get('.logo').should('exist')
    cy.get('.unir-logo').should('exist')
  })

  it('should be accessible', () => {
    // Basic accessibility test
    cy.get('header').should('exist')
    cy.get('nav').should('exist')
  })
})