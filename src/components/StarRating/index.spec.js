import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import noop from '../../utility/noop';
import StarRating from './';

const defaultProps = {
  value: 0,
  size: 5,
  disabled: false,
  onChange: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
};

it('should render stars depending on its size', () => {
  const wrapper = shallow(
    <StarRating
      {...defaultProps}
      size={10}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('should render its value correctly', () => {
  const wrapper = shallow(
    <StarRating
      {...defaultProps}
      value={3}
    />
  );
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it('should run callback when clicking on star', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <StarRating
      {...defaultProps}
      onChange={cb}
    />
  );
  const secondStar = wrapper.find('input[type="radio"]').at(1);

  secondStar.simulate('click');

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toEqual(2);
});

it('should run callback when mouse enters a star', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <StarRating
      {...defaultProps}
      onMouseEnter={cb}
    />
  );
  const secondStar = wrapper.find('input[type="radio"]').at(1);

  secondStar.simulate('mouseenter');

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toEqual(2);
});

it('should run callback when mouse leaves a star', () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <StarRating
      {...defaultProps}
      onMouseLeave={cb}
    />
  );
  const secondStar = wrapper.find('input[type="radio"]').at(1);

  secondStar.simulate('mouseleave');

  expect(cb).toHaveBeenCalledTimes(1);
  expect(cb.mock.calls[0][0]).toEqual(2);
});
