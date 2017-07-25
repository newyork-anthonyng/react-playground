import React from 'react';
import { shallow, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import RadioGroup from './';
import Radio from '../Radio';

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
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio>Regular Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
        <Radio>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 38 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(0);
  });

  it('should run callback when pressing left', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio>Regular Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
        <Radio>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 37 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(0);
  });

  it('should run callback when pressing up on first element', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio selected>Regular Cheese</Radio>
        <Radio>Pepperoni</Radio>
        <Radio>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 38 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(2);
  });

  it('should run callback when pressing down', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio>Regular Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
        <Radio>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 40 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(2);
  });

  it('should run callback when pressing right', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio>Regular Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
        <Radio>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 39 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(2);
  });

  it('should run callback when pressing down on last element', () => {
    const cb = jest.fn();
    const wrapper = shallow(
      <RadioGroup label="Pizza" onChange={cb}>
        <Radio>Regular Cheese</Radio>
        <Radio>Pepperoni</Radio>
        <Radio selected>Sausage</Radio>
      </RadioGroup>
    );

    wrapper.simulate('keydown', { keyCode: 40 });

    expect(cb).toHaveBeenCalledTimes(1);
    expect(cb.mock.calls[0][0]).toEqual(0);
  });
});

it('should run callback when clicking on Radio', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <RadioGroup label="Pizza" onChange={cb}>
      <Radio selected>Regular Cheese</Radio>
      <Radio>Pepperoni</Radio>
    </RadioGroup>
  );

  const radio = wrapper.find(Radio).at(1);
  radio.simulate('click');

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toEqual(1);
});

it('should focus on newly selected Radio', () => {
  const wrapper = mount(
    <RadioGroup label="Pizza">
      <Radio selected>Regular Cheese</Radio>
      <Radio>Pepperoni</Radio>
    </RadioGroup>
  );
  // spy on focus method
  const firstRadio = wrapper.find('[role="radio"]').get(0);
  jest.spyOn(firstRadio, 'focus');

  wrapper.update();

  expect(firstRadio.focus).toHaveBeenCalledTimes(1);
});
