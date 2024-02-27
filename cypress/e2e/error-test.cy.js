describe('Test error message when submitting without an email', () => {

    //Set date for bookong challenge
    let bookingDate = new Date().toJSON().slice(0, 10);

    it('try make a booking without & with a user email', () => {

        //cy.visit('http://127.0.0.1:5501/filter.htm')
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm')
        cy.contains('Book this room').click({ multiple: true })

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

        //set no email

        cy.get('[data-cy="time-slots"]')
            .select(['0'])
            .and('have.value', '0')
            .should('have.attr', 'required')

        cy.get('[data-cy="numb-participants"]')
            .select(1)
            .should('have.attr', 'required')

        //try submitting when invalid email
        cy.contains('Submit').click()

        //test that right validation message is shown when no email
        cy.get('[data-cy="e-mail"]')
            .should('have.prop', 'validationMessage')
            .should('equal', 'Fyll i det här fältet.')

        //then set a valid email
        cy.get('[data-cy="e-mail"]').clear()
            .type('inter@space.com')
            .should('have.attr', 'required')

        //submit
        cy.contains('Submit').click()
    })
})
