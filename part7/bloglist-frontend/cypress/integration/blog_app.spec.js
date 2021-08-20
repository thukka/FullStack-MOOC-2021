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
            cy.login({ username: 'toni', password: Cypress.env('testPW') });
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

            it('A blog can be created', function () {
                cy.contains('create new blog').click();
                cy.get('#title').type('Cypress Blog');
                cy.get('#author').type('toni testaaja');
                cy.get('#URL').type('www.cypress.io');
                cy.get('#submit-blog').click();
                cy.contains('a new blog Cypress Blog was added');
                cy.get('.show-blog-list').should('contain', 'Cypress Blog');
            });

            it('a blog can be liked', function () {
                cy.newBlog('hello cypress', 'toni cypresstest', 'cypress.io');
                cy.contains('view').click();
                cy.contains('like').click();
                cy.contains('likes 1');
            });

            it('a blog can be deleted', function () {
                cy.newBlog('delete this', 'toni cypresstest', 'cypress.io');
                cy.contains('view').click();
                cy.contains('remove').click();
                cy.on('window:confirm', () => true);
                cy.get('.show-blog-list').should('not.contain', 'delete this');
            });

            it.only('most liked blog is first in the list', function () {
                cy.newBlog('blog 2', 'toni cypresstest', 'cypress.io');
                cy.newBlog('blog 3', 'toni cypresstest', 'cypress.io');
                cy.contains('blog 3').contains('view').click();
                cy.contains('blog 3').parent().contains('like').click();
                cy.contains('blog 3').parent().contains('like').click();
                cy.visit('http://localhost:3000');
                cy.get('.blog').then(blogs => {
                    console.log('blogit:', blogs);
                    if (blogs[0].innerText === 'blog 3 toni cypresstest view') {
                        console.log('OK - no errors');
                    } else {
                        throw new Error('most liked blog is NOT at the top');
                    }
                });
            });
        });
    });

});