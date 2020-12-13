// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

import { Pages } from '../../../src/router/pages';
const { Comparison } = Pages;

describe('Data Rendering', () => {
	it(`Visits the ${Comparison.name}`, () => {
		cy.visit(Comparison.path);
		// cy.get(`[data-cy=metricFrameworkSelectType]`);
		cy.get(`[data-cy=TimingType]`)
			.then(($tableDataCells) => {
				const cells = [...$tableDataCells];
				const names = [];
				for (let i = 0; i < cells.length; i++) {
					names.push(cells[i].innerHTML);
				}
				return names;
			})
			.then((metricNames) => {
				expect(metricNames).to.have.length(36);
				// can't use array methods in cypress with my config for some reason.
				// expect(metricNames.slice(0, 5).every((name) => name === metricNames[0])).to.be.true;
				helpItr(0, 5, metricNames, 'update-k');
				helpItr(6, 11, metricNames, 'clear-k');
				helpItr(12, 17, metricNames, 'k');
				helpItr(18, 23, metricNames, 'update-ten-k');
				helpItr(24, 29, metricNames, 'clear-ten-k');
				helpItr(30, 35, metricNames, 'ten-k');
			});
	});
});

function helpItr(iterStart: number, iterEnd: number, arr: string[], name: string) {
	for (let i = iterStart; i <= iterEnd; i++) {
		expect(arr[i]).to.equal(name);
	}
}
