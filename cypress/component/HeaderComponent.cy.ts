import HeaderComponent from '../../src/components/HeaderComponent.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

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
    cy.get('#header').should('exist')
  })

  it('should have logo text', () => {
    // Check if the text exists anywhere in the header
    cy.get('#header').should('contain', 'TFG')
    cy.get('#header').should('contain', 'FFJ')
    cy.get('#header').should('contain', 'AEP')
  })

  it('should have navigation', () => {
    // Look for the navbar by ID
    cy.get('#navbar').should('exist')
    // Check for a specific menu item
    cy.contains('a', 'Home').should('exist')
  })
})