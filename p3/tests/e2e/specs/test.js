// https://docs.cypress.io/api/introduction/api.html

describe('Pages Rendering', () => {
	it('Visits the app root url', () => {
		cy.visit('/');
		cy.contains('h1', 'Front-End Framework Bench');
	});
});
