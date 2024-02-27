describe('Test indexs links to challange page', () => {

    it('Clicking all the onsite-challange buttons', () => {
        //cy.visit('http://127.0.0.1:5501/index.html')
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/');
        cy.contains('Online challenges').click({ multiple: true, force: true })
        cy.url().should('include', '/filter.htm?online')
    });

    it('Clicking all the online-challange buttons', () => {
        //cy.visit('http://127.0.0.1:5501/index.html')
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/');
        cy.contains('On-site challenges').click({ multiple: true, force: true })
        cy.url().should('include', '/filter.htm?onsite')
    });
    it('Clicking the "See all challanges" button', () => {
        //cy.visit('http://127.0.0.1:5501/index.html')
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/');
        cy.contains('See all challenges').click();
        cy.url().should('include', '/filter.htm')
    })
})

describe('Test the filter functions', () => {

    it('Clicking the filter challange button', () => {
        //cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm');
        cy.contains('Filter challenges').click();
        cy.contains('By Type');
    })

    it('Testing on-site check buttons', () => {
        //cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm');
        cy.get('#online').uncheck({ force: true });
        cy.get('#testbox').contains('Book this room')
        cy.get('#testbox').not('Take challenge online');
    })

    it('Testing online/ check buttons', () => {
        //cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm');
        cy.get('#on-site').uncheck({ force: true });
        cy.get('#testbox').not('Book this room')
        cy.get('#testbox').contains('Take challenge online');
    })
})

describe('Test the rating-filter', () => {
    it('Testing low ratings', () => {
        //cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm');
        cy.get('#cbMin-1').click({ force: true })
        cy.get('#cbMax-2').click({ force: true })
        cy.get('.main__sliderBox--info').each((item, index, list) => {
            cy.wrap(item).invoke('attr', 'aria-valuenow')
                .then((value) => +value)
                .should('be.lte', 2)
        })
    })

    it('Testing high ratings', () => {
        //cy.visit('http://127.0.0.1:5501/filter.htm');
        cy.visit('https://annalenao.github.io/e2-ESC--Cypress/filter.htm');
        cy.get('#cbMin-3').click({ force: true })
        cy.get('#cbMax-5').click({ force: true })
        cy.get('.main__sliderBox--info').each((item, index, list) => {
            cy.wrap(item).invoke('attr', 'aria-valuenow')
                .then((value) => +value)
                .should('be.gte', 3)
        })
    })
})