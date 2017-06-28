import React from 'react';
import { mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import SkipLink from './';

const defaultProps = {
  href: '#footer',
};

it('should render correctly', () => {
  const wrapper = mount(
    <SkipLink {...defaultProps} />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});
