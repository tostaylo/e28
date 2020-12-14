// https://docs.cypress.io/api/introduction/api.html
// Needs this next line to silence Cypress related TS errors.
// https://github.com/cypress-io/cypress/issues/1152
/// <reference types="cypress" />

// can't use array methods in cypress with my config for some reason.
// expect(metricNames.slice(0, 5).every((name) => name === metricNames[0])).to.be.true;

import { Pages } from '../../../src/router/pages';
const { Comparison } = Pages;
const slices = [
	[0, 5],
	[6, 11],
	[12, 17],
	[18, 23],
	[24, 29],
	[30, 35],
];

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

	it(`It sorts by total duration`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Total Duration');
		cy.get(`[data-cy=TotalDur]`)
			.then(getCells)
			.then(timingSortAssertions);
	});
	it(`It sorts by click duration`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Click Duration');
		cy.get(`[data-cy=ClickDur]`)
			.then(getCells)
			.then(timingSortAssertions);
	});

	it(`It sorts by render after click`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Render After Click');
		cy.get(`[data-cy=RenderAfterClick]`)
			.then(getCells)
			.then(timingSortAssertions);
	});

	it(`It sorts by render during click`, () => {
		cy.visit(Comparison.path);
		cy.get(`[data-cy=timingSelectType]`).select('Render During Click');
		cy.get(`[data-cy=RenderDuringClick]`)
			.then(getCells)
			.then(timingSortAssertions);
	});
});

function timingSortAssertions(timings: string[]) {
	for (let i = 0; i < slices.length; i++) {
		expect(helpItrTimings(slices[i][0], slices[i][1], timings)).to.be.true;
	}
}

function metricFrameworkSortAssertions(metricNames: string[]) {
	expect(metricNames).to.have.length(36);

	for (let i = 0; i < slices.length; i++) {
		expect(helpItrMetricFramework(slices[i][0], slices[i][1], metricNames)).to.be.true;
	}
}

function getCells(tableDataCells: JQuery<HTMLElement>) {
	const cells = [...tableDataCells];
	const names = [];
	for (let i = 0; i < cells.length; i++) {
		names.push(cells[i].innerHTML);
	}
	return names;
}

function helpItrMetricFramework(iterStart: number, iterEnd: number, arr: string[]) {
	for (let i = iterStart; i <= iterEnd; i++) {
		// Can I make a predicate here?
		if (arr[iterStart] !== arr[i]) {
			return false;
		}
	}
	return true;
}
function helpItrTimings(iterStart: number, iterEnd: number, arr: string[]) {
	for (let i = iterStart; i <= iterEnd; i++) {
		// Can I make a predicate here?
		if (i < iterEnd) {
			console.log(arr[i], arr[i + 1]);
			if (parseFloat(arr[i]) > parseFloat(arr[i + 1])) {
				return false;
			}
		}
	}
	return true;
}
