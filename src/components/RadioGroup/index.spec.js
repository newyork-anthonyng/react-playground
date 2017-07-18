import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import {
  RadioGroup,
  Radio,
} from './';

it('should render correctly', () => {
  const wrapper = shallow(
    <RadioGroup label="Pizza">
      <Radio selected>Regular Cheese</Radio>
      <Radio>Pepperoni</Radio>
    </RadioGroup>
  );
});

it('should only allow one selected Radio', () => {
  const wrapper = mount(
    <RadioGroup label="Pizza">
      <Radio selected>Regular Cheese</Radio>
      <Radio selected>Pepperoni</Radio>
    </RadioGroup>
  );

  const selectedElements = wrapper.find('[aria-checked="true"]');

  expect(selectedElements.length).toEqual(1);
});

describe('Keyboard events', () => {
  it('should run callback when pressing up', () => {
    
  });
  it('should run callback when pressing down');
  it('should run callback when pressing spacebar');
});
