// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

// can't use array methods in cypress with my config for some reason.
// expect(metricNames.slice(0, 5).every((name) => name === metricNames[0])).to.be.true;

import { Pages } from '../../../src/router/pages';
const { Comparison } = Pages;

describe('Sorting and Filtering', () => {
	it(`It sorts by metrics`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=metricFrameworkSelectType]`).select('Metric');
		cy.get(`[data-cy=TimingType]`)
			.then(getCells)
			.then(metricFrameworkSortAssertions);
	});

	it(`It sorts by frameworks`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=metricFrameworkSelectType]`).select('Framework');
		cy.get(`[data-cy=TimingFramework]`)
			.then(getCells)
			.then(metricFrameworkSortAssertions);
	});
});

function metricFrameworkSortAssertions(metricNames: string[]) {
	expect(metricNames).to.have.length(36);

	expect(helpItr(0, 5, metricNames)).to.be.true;
	expect(helpItr(6, 11, metricNames)).to.be.true;
	expect(helpItr(12, 17, metricNames)).to.be.true;
	expect(helpItr(18, 23, metricNames)).to.be.true;
	expect(helpItr(24, 29, metricNames)).to.be.true;
	expect(helpItr(30, 35, metricNames)).to.be.true;
}

function getCells(tableDataCells: JQuery<HTMLElement>) {
	const cells = [...tableDataCells];
	const names = [];
	for (let i = 0; i < cells.length; i++) {
		names.push(cells[i].innerHTML);
	}
	return names;
}

function helpItr(iterStart: number, iterEnd: number, arr: string[]) {
	for (let i = iterStart; i <= iterEnd; i++) {
		if (arr[iterStart] !== arr[i]) {
			return false;
		}
	}
	return true;
}
