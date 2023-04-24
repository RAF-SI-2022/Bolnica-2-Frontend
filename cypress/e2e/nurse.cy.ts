describe('nurse add/update/delete patient', () => {
    beforeEach(() => {
        cy.login('medsestra', 'medsestra')
    })

    it('should create a new patient', () => {
        cy.visit('/new-patient')
        const uniqueNumber = `${Math.floor(Math.random() * 10000)}`
        cy.get('[data-testid="email"]').type(uniqueNumber + 'email@example.com')
        cy.get('[data-testid="name"]').type('Pera')
        cy.get('[data-testid="parent-name"]').type('Milos')
        cy.get('[data-testid="surname"]').type('Peric')
        cy.get('[data-testid="date"]').type('2001-01-25')
        cy.get('[data-testid="jmbg"]').type(uniqueNumber)
        cy.get('[data-testid="male"]').check()
        cy.get('[data-testid="place"]').type('Novi Sad')
        cy.get('[data-testid="address"]').type('Jevrejska')
        cy.get('[data-testid="country-of-origin"]').select('AFG')
        cy.get('[data-testid="country-of-living"]').select('AFG')
        cy.get('[data-testid="add-patient-button"]').click()
        cy.get('div').contains('Uspešno ste dodali novog pacijenta')
    })

    it('should edit the newly created patient', () => {
        cy.visit('/search-patients')
        cy.get('[data-testid="edit"]').eq(1).click()
        cy.get('[data-testid="name"]').clear().type('Zdravko')
        cy.get('[data-testid="edit-patient-button"]').click()
        cy.get('div').contains('Uspešno ste ažurirali pacijenta')
    })

    it('should delete the newly created patient', () => {
        cy.visit('/search-patients')
        cy.get('[data-testid="delete"]').eq(1).click()
        cy.get('[data-testid="confirm-delete"]').click()
        cy.get('div').contains('Pacijent uspešno obrisan')
    })
})