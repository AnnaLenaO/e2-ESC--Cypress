
describe('Test several pages, error message, make a booking & find filter element', () => {

  //Set date for bookong challenge
  let bookingDate = new Date().toJSON().slice(0, 10);

  it('start & end at homepage after several interactions', () => {
    cy.visit('http://127.0.0.1:5501/index.html')
    /*.then(() => {
        cy.url().should('include', '/index.html')
    })*/

    //test to show home page & then go to Our Challenges
    cy.url().should('include', '/index.html')
    cy.contains('On-site')
    cy.contains('Online')
    cy.get('[data-cy="allChallenges"]').click()

    //test to show Our Challenges page & clicking for filter challenges
    cy.url().should('include', '/filter.htm')
    cy.get('[data-cy="filterChallenges"]').click()

    //test to show filter modal & existence of a filter element
    cy.contains('By Rating')
    cy.get('[data-cy="ratingMax"]')
      .should('have.attr', 'aria-valuemax')

    //test to close modal & still be at the same page
    cy.get('[data-cy="filterExitBtn"]').click()
    cy.url().should('include', '/filter.htm')

    //test to go back to home page
    cy.get('[data-cy="toHome"]').click()
    cy.url().should('include', '/index.html')
    cy.contains('On-site')
    cy.contains('Online')

    //test to go to Book Online Challenges
    cy.get('[data-cy="onlineChallenges"]').click()
    cy.url().should('include', '/filter.htm?online')

    //test to book an online challenge
    cy.contains('Take challenge online').click({ multiple: true })

    //step 1
    cy.get('[data-cy="booking-date"]')
      .type(`${bookingDate}`)
      .and('have.value', `${bookingDate}`)
      .should('have.attr', 'required')

    cy.contains('Search').click()

    //step 2
    cy.get('[data-cy="user-name"]')
      .type('your name')
      .and('have.value', 'your name')
      .should('have.attr', 'required')

   //test that right validation message is shown when no input
    cy.get('[data-cy="e-mail"]')
      .should('have.prop', 'validationMessage')
      .should('equal', 'Fyll i det här fältet.')

    //test that right validation message is shown when wrong input
    cy.get('[data-cy="e-mail"]')
      .type('email@.com')
      .should('have.prop', 'validationMessage')
      .should('equal', '. används på fel plats i .com.')

    //set a valid email
    cy.get('[data-cy="e-mail"]').clear()
      .type('email@host.com')
      .should('have.prop', 'validationMessage')
      .should('equal', '')

    cy.get('[data-cy="time-slots"]')
      .select(['0'])
      .and('have.value', '0')
      .should('have.attr', 'required')

    cy.get('[data-cy="numb-participants"]')
      .select(1)
      .should('have.attr', 'required')

    cy.contains('Submit').click()

    //step 3
    //test to go to all Our Challenges after submit OK
    cy.contains('Back to challenges').click()
 
     //test show Our Challenges page & go to on-site Challenges
     cy.url().should('include', '/filter.htm')
     cy.get('[data-cy="onSiteChallenges"]').click()
     cy.url().should('include', '/filter.htm?onsite')
    

    ////////////////////////////////////////////////////////////////////////////////
    //test status code when no content in Body for POST reguest
    cy.request({
       method: 'POST',
       url: 'https://lernia-sjj-assignments.vercel.app/api/booking/reservations',
       headers: { 'Content-Type': 'application/json' },
       body: '',
       failOnStatusCode: false
     }).as('booking')
     cy.get('@booking').its('status')
     .should('equal', 400)
  })
})
