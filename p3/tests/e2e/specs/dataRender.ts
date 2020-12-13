// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

import { Pages } from '../../../src/router/pages';
const { Frameworks, Metrics, Timings } = Pages;

describe('Data Rendering', () => {
	it(`Visits the ${Frameworks.name}`, () => {
		cy.visit(Frameworks.path);
		cy.contains('h1', Frameworks.name);
	});

	it(`Visits the ${Metrics.name}`, () => {
		cy.visit(Metrics.path);
		cy.contains('h1', Metrics.name);
	});

	it(`Visits the ${Timings.name}`, () => {
		cy.visit(Timings.path);
		cy.contains('h1', Timings.name);
	});
});
