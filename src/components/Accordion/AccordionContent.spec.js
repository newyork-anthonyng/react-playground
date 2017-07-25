import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import AccordionContent from './AccordionContent';

const defaultProps = {
  ariaLabelledBy: 'some-element-id',
  id: 'my-element-id',
  isOpen: true,
};

it('should render correctly when open', () => {
  const wrapper = shallow(
    <AccordionContent
      {...defaultProps}
      isOpen
    >
      <h1>I am content</h1>
    </AccordionContent>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('should render correctly when not open', () => {
  const wrapper = shallow(
    <AccordionContent
      {...defaultProps}
      isOpen={false}
    >
      <h1>I am content</h1>
    </AccordionContent>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
