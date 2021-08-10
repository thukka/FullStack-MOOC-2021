describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = {
            'username': 'toni',
            'name': 'toni testaaja',
            'password': Cypress.env('testPW')
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.visit('http://localhost:3000');
    }
    );

    it('Login form is shown', function () {
        cy.contains('log in to application');
    });

    describe('Login', function () {
        it('User can log in succesfully', function () {
            cy.get('#username').type('toni');
            cy.get('#password').type(Cypress.env('testPW'));
            cy.get('#login-button').click();
            cy.contains('toni testaaja logged in');
        });

        it('login fails with wrong auth', function () {
            cy.get('#username').type('tobi');
            cy.get('#password').type('wrongwrong');
            cy.get('#login-button').click();
            cy.contains('Wrong username or password').should('have.css', 'color', 'rgb(255, 0, 0)');
        });

        describe('when logged in', function () {
            beforeEach(function () {
                cy.login({ username: 'toni', password: Cypress.env('testPW') });
            });

            it.only('A blog can be created', function () {
                cy.contains('create new blog').click();
                cy.get('#title').type('Cypress Blog');
                cy.get('#author').type('toni testaaja');
                cy.get('#URL').type('www.cypress.io');
                cy.get('#submit-blog').click();
                cy.contains('a new blog Cypress Blog was added');
                cy.get('.show-blog-list').should('contain', 'Cypress Blog');
            });
        });
    });

});