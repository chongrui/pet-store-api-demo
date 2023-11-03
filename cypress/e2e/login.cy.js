describe('The Home Page', () => {
  beforeEach(() => {
    cy.exec('npm run start');
  });

  it('Should render login page successfully', () => {
    cy.visit('/')
    // We should be redirected to /login after login
    cy.url().should('include', '/login');
    cy.get('h3').should('contain', 'Swagger Pet Store');
  });

  it('Should login successfully', () => {
    cy.login('username', 'password');
    // We should be redirected to /pets after login
    cy.url().should('include', '/pets');
  });
});