import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import noop from "../../utility/noop";
import Checkbox from "./";

const defaultProps = {
  checked: false,
  onChange: noop,
  label: "Unlabelled checkbox"
};

it("should render correctly when checked", () => {
  const wrapper = shallow(<Checkbox {...defaultProps} checked />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when unchecked", () => {
  const wrapper = shallow(<Checkbox {...defaultProps} checked={false} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should run callback when ENTER is pressed", () => {
  const cb = jest.fn();
  const wrapper = shallow(<Checkbox {...defaultProps} onChange={cb} />);

  wrapper.simulate("keypress", { charCode: 13 });

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should run callback when SPACEBAR is pressed", () => {
  const cb = jest.fn();
  const wrapper = shallow(<Checkbox {...defaultProps} onChange={cb} />);

  wrapper.simulate("keypress", { charCode: 32 });

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should run callback when clicked", () => {
  const cb = jest.fn();
  const wrapper = shallow(<Checkbox {...defaultProps} onChange={cb} />);

  wrapper.simulate("click");

  expect(cb).toHaveBeenCalledTimes(1);
});
