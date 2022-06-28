/// <reference types="cypress">

describe('Navigation', () => {
  it('should check application title', () => {
    // navigate to the homepage (base url is is in cypress.json)
    cy.visit('/')

    // check that the element is there
    expect(cy.get('h1')).to.exist

    // verify the result
    cy.get('h1').contains('Weather App')
  })

  it('should search by city name', () => {
    // navigate to the homepage (base url is is in cypress.json)
    cy.visit('/')

    // check that the element is there
    expect(cy.get('.search-bar')).to.exist

    // type and click on the element
    cy.get('.search-bar').type('london').type('{enter}')
    cy.wait(500)

    // verify the result
    cy.get('.location').contains('London, GB')
  })

  it('should redirect to week page', () => {
    // navigate to the homepage (base url is is in cypress.json)
    cy.visit('/')

    // check that the element is there
    expect(cy.get('.search-bar')).to.exist

    // type and click on the element
    cy.get('.search-bar').type('london').type('{enter}')
    cy.get('.weather-box').get('a').click()

    // verify the result
    cy.url().should('include', '/week')
  })

  it('should redirect to week page', () => {
    // navigate to the homepage (base url is is in cypress.json)
    cy.visit('/')
  })
})
