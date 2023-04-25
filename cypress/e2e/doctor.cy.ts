describe('doctor workflow', () => {
    beforeEach(() => {
        cy.login('dborovac10520rn', 'dborovac10520rn')
    })

    it('should create a new referral', () => {
        cy.visit('/search-patients')
        cy.get('[data-testid="create-referral"]').eq(1).click()
        cy.get('[data-testid="tip-uputa-dropdown"]').select('Laboratorija')
        cy.get('[data-testid="lab-ustanova"]').select(2)
        cy.get('[data-testid="glukoza"]').check()
        cy.get('[data-testid="submit-referral"]').click()
        cy.get('[data-testid="confirm-submit-referral"]').click()
    })

    it('should see the referral history', () => {
        cy.visit('/search-patients')
        cy.get('[data-testid="health-record"]').eq(1).click()
        cy.get('[data-testid="referral-history"]').click()
        cy.get('[data-testid="referral-history-title"]').contains('Istorija uputa')
    })

    it('should see the lab work order history', () => {
        cy.visit('/search-patients')
        cy.get('[data-testid="health-record"]').eq(1).click()
        cy.get('[data-testid="lab-work-order-history"]').click()
    })
})