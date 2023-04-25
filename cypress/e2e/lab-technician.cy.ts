describe('lab technician workflow', () => {
    beforeEach(() => {
        cy.login('ipejin8420rn', 'ipejin8420rn')
    })

    it('should create a new lab visit', () => {
        cy.get('[data-testid="hp-new-lab-visit"]').click()
        cy.get('[data-testid="patient-input"]').type('Nemanja')
        cy.get('[data-testid="patient-result"]').click()
        cy.get('[data-testid="date"]').type('2023-08-25')
        cy.get('[data-testid="time"]').type('12:00')
        cy.get('[data-testid="confirm"]').click()
        cy.get('div').contains('Uspešno ste zakazali posetu laboratoriji')
    })

    it('should see the newly scheduled lab visit', () => {
        cy.get('[data-testid="hp-view-lab-visits"]').click()
        cy.get('[data-testid="lab-visits-table"]').contains('td', '25.08.2023, 12:00')
    })
})