import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Breadcrumb from './';

it('should render correctly', () => {
  const wrapper = shallow(
    <Breadcrumb>
      <a href="#one">One</a>
      <a href="#two">Two</a>
      <a href="#three">Three</a>
    </Breadcrumb>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('should render the last item with correct aria label', () => {
  const wrapper = shallow(
    <Breadcrumb>
      <a href="#one">One</a>
      <a href="#two">Two</a>
      <a href="#three">Three</a>
    </Breadcrumb>
  );
  const lastLink = wrapper.find('a').last();

  expect(lastLink.props()['aria-current']).toEqual('page');
});
