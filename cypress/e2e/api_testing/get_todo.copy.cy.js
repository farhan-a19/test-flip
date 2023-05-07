describe('Testing Get', function(){


    it('Get To Do', function(){
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/todos',

        }).then(function(response){
            expect(response.status).to.eq(200);

            cy.writeFile('cypress/fixtures/todos.json', response.body)
            
            cy.fixture('todos').then((todos) => {
                expect(todos).to.have.length(10);

                cy.get(todos).each((item) => {
                    cy.wrap(item).should('have.property','id');
                })
            });
        });
    }); 

    it('Get Inactive Users', function(){
        cy.request({
            method : 'GET',
            url : 'https://gorest.co.in/public/v2/users?status=inactive',

        }).then(function(response){
            expect(response.status).to.eq(200);

            cy.writeFile('cypress/fixtures/users.json', response.body)
            
            cy.fixture('users').then((users) => {
                cy.get(users).each((item) => {
                    cy.wrap(item).should('have.property', 'status', 'inactive');
                })
            })
        });
    }); 
});