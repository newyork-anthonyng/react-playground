import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Radio from "./";

const defaultProps = {
  selected: false,
  onClick: () => {}
};

it("should render correctly when selected", () => {
  const wrapper = shallow(
    <Radio {...defaultProps} selected>
      <h1>Hello</h1>
    </Radio>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when not selected", () => {
  const wrapper = shallow(
    <Radio {...defaultProps} selected={false}>
      <h1>Hello</h1>
    </Radio>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should run callback when clicked", () => {
  const cb = jest.fn();
  const wrapper = shallow(
    <Radio {...defaultProps} onClick={cb}>
      <h1>Hello</h1>
    </Radio>
  );

  wrapper.simulate("click");

  expect(cb).toHaveBeenCalledTimes(1);
});
