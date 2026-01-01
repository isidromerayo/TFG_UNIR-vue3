import HeaderComponent from '../../src/components/HeaderComponent.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

// Test for HeaderComponent using best practices (data-cy)
describe('HeaderComponent', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/home', name: 'home', component: { template: '<div>Home</div>' } }
    ]
  })

  beforeEach(() => {
    cy.mount(HeaderComponent, {
      global: {
        plugins: [router]
      }
    })
  })

  it('should render the header component', () => {
    cy.get('[data-cy=header]').should('exist')
  })

  it('should have logo text', () => {
    // Check if the text exists within the logo link
    cy.get('[data-cy=logo-link]').should('contain', 'TFG')
    cy.get('[data-cy=logo-link]').should('contain', 'FFJ')
    cy.get('[data-cy=logo-link]').should('contain', 'AEP')
  })

  it('should have navigation', () => {
    // Look for the navbar by data-cy attribute
    cy.get('[data-cy=navbar]').should('exist')
    // Check for a specific menu item
    cy.contains('a', 'Home').should('exist')
  })
})