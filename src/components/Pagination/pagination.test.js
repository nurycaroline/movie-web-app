import React from 'react';
import renderer from 'react-test-renderer';
import Pagination from '.';

test('Pagination', () => {
  const component = renderer.create(<Pagination />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
