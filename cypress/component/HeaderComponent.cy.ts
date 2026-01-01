import HeaderComponent from '../../src/components/HeaderComponent.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

describe('HeaderComponent', () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/home', name: 'home', component: { template: '<div>Home</div>' } }
    ]
  })

  it('renders correctly', () => {
    localStorage.removeItem('token')
    cy.mount(HeaderComponent, { global: { plugins: [router] } })
    cy.get('[data-cy=header]').should('exist')
  })

  it('shows logged in menu when token exists', () => {
    // Set token BEFORE mounting
    localStorage.setItem('token', 'mock-token')
    cy.mount(HeaderComponent, { global: { plugins: [router] } })

    // Check for the dropdown class which appears if token is present
    cy.get('.dropdown').should('exist')

    // cleanup
    localStorage.removeItem('token')
  })

  it('navigates through the menu', () => {
    localStorage.removeItem('token')
    cy.mount(HeaderComponent, { global: { plugins: [router] } })
    cy.get('[data-cy=navbar]').should('exist')
    cy.contains('Home').should('exist')
  })
})