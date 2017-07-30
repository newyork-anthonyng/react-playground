import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import noop from '../../utility/noop';
import AccordionTitle from './AccordionTitle';

const defaultProps = {
  isOpen: false,
  ariaControls: 'some-element-id',
  id: 'my-element-id',
  onClick: noop,
  onKeyDown: noop,
  buttonRef: noop,
};

it('should render correctly', () => {
  const wrapper = shallow(
    <AccordionTitle {...defaultProps}>
      <h1>Accordion Title</h1>
    </AccordionTitle>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('should run callback when clicked', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <AccordionTitle
      {...defaultProps}
      onClick={cb}
    >
      <h1>Accordion Title</h1>
    </AccordionTitle>
  );

  const button = wrapper.find('button');
  button.simulate('click');

  expect(cb).toHaveBeenCalledTimes(1);
});

it('should run callback when pressing a key', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <AccordionTitle
      {...defaultProps}
      onKeyDown={cb}
    >
      <h1>Accordion Title</h1>
    </AccordionTitle>
  );

  const button = wrapper.find('button');
  button.simulate('keydown', { keyCode: 38 });

  expect(cb).toHaveBeenCalledTimes(1);
});
