describe('admin add/update/delete employee', () => {
    beforeEach(() => {
        cy.login('admin', 'admin')
    })

    it('should create a new employee', () => {
        cy.visit('/new-employee')
        const uniqueNumber = `${Math.floor(Math.random() * 10000)}`
        cy.get('[data-testid="email"]').type(uniqueNumber + 'email@example.com')
        cy.get('[data-testid="name"]').type('Pera')
        cy.get('[data-testid="surname"]').type('Peric')
        cy.get('[data-testid="date"]').type('2001-01-25')
        cy.get('[data-testid="jmbg"]').type('2501001810010')
        cy.get('[data-testid="male"]').check()
        cy.get('[data-testid="place"]').type('Novi Sad')
        cy.get('[data-testid="address"]').type('Jevrejska')
        cy.get('[data-testid="doctor-checkbox"]').check()
        cy.get('[data-testid="titula-dropdown"]').select('Prof. dr. med.')
        cy.get('[data-testid="odeljenje-dropdown"]').select('1')
        cy.get('[data-testid="zanimanje-dropdown"]').select('Spec. neurolog')
        cy.get('[data-testid="add-employee-button"]').click()
        cy.get('div').contains('Uspešno ste dodali novog zaposlenog')
    })

    it('should edit the newly created employee', () => {
        cy.visit('/search-employees')
        cy.get('[data-testid="edit"]').eq(1).click()
        cy.get('[data-testid="name"]').clear().type('Milos')
        cy.get('[data-testid="edit-employee-button"]').click()
        cy.get('div').contains('Uspešno ste ažurirali zaposlenog')
    })

    it('should delete the newly created employee', () => {
        cy.visit('/search-employees')
        cy.get('[data-testid="delete"]').eq(1).click()
        cy.get('[data-testid="confirm-delete"]').click()
        cy.get('div').contains('Korisnik uspešno obrisan')
    })
})