describe('Test booking', () => {

  it('clicking first "button" and later submit form', () => {
    //cy.visit('http://127.0.0.1:5501/index.html')
    //cy.contains('Take challenge').click({ multiple: true })
    cy.visit('http://127.0.0.1:5501/filter.htm')
    cy.contains('Book this room').click({ multiple: true })
    
    //step 1
    cy.get('[data-cy="booking-date"]')
      .type('2024-12-10')
      .and('have.value', '2024-12-10')
      .should('have.attr', 'required')

    cy.contains('Search').click()

    //step 2
    cy.get('[data-cy="user-name"]')
      .type('your name')
      .and('have.value', 'your name')
      .should('have.attr', 'required')

    cy.get('[data-cy="e-mail"]')
      .type('email@.com')

    cy.get('[data-cy="time-slots"]')
      .select(['0'])
      .and('have.value', '0')
      .should('have.attr', 'required')

    cy.get('[data-cy="numb-participants"]')
      .select(1)
      .should('have.attr', 'required')

    //test no submitting when invalid email
    cy.contains('Submit').click()

    cy.get('[data-cy="e-mail"]').clear()
      .type('inter@space.com')
      .should('have.attr', 'required')

    cy.contains('Submit').click()

    //step 3
    cy.contains('Back to challenges').click()
  })
})