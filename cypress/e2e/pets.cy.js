describe('The Pets Page', () => {
  beforeEach(() => {
    cy.exec('npm run start');
  });

  it('Should render pets page successfully', () => {
    cy.login('username', 'password');
    // We should be redirected to /pets after login
    cy.url().should('include', '/pets');
    cy.contains('Cat 1').should('be.visible');
    cy.contains('Cat 2').should('be.visible');
    cy.contains('Cat 3').should('be.visible');
    cy.contains('Dog 1').should('be.visible');
    cy.contains('Dog 2').should('be.visible');
    cy.contains('Dog 3').should('be.visible');
    cy.contains('Lion 1').should('be.visible');
    cy.contains('Lion 2').should('be.visible');
    cy.contains('Lion 3').should('be.visible');
    cy.contains('Rabbit 1').should('be.visible');
  });

  it('Pet status filter should work correctly', () => {
    cy.login('username', 'password');
    // We should be redirected to /pets after login
    cy.url().should('include', '/pets');
    cy.contains('All').click();
    cy.contains('Sold').click();
    cy.contains('Dog 2').should('be.visible');
    // The following pets should be filtered out
    cy.contains('Cat 1').should('not.exist');
    cy.contains('Cat 2').should('not.exist');
    cy.contains('Cat 3').should('not.exist');
    cy.contains('Dog 1').should('not.exist');
    cy.contains('Dog 3').should('not.exist');
    cy.contains('Lion 1').should('not.exist');
    cy.contains('Lion 2').should('not.exist');
    cy.contains('Lion 3').should('not.exist');
    cy.contains('Rabbit 1').should('not.exist');
  });
});