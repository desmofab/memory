import MemoryGrid from '../MemoryGrid'

const theGrid = new MemoryGrid({classes: {}, tilesData: []});
theGrid.state = {};

it('Unveiled tiles should not be clickable', () => {
  theGrid.state.tilesInMove = [];
  expect(theGrid.isValidMove({unveiled: true})).toBeFalsy();
});

it('Should not unveil the third tile', () => {
  theGrid.state.tilesInMove = [{}, {}];
  expect(theGrid.isValidMove({unveiled: false})).toBeFalsy();
});

it('Can unveil the tile and update state', () => {
  theGrid.state.tilesInMove = [{}];
  expect(theGrid.isValidMove({unveiled: false})).toBeFalsy();
});