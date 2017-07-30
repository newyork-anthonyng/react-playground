import React from "react";
import { mount, shallow } from "enzyme";
import noop from "../../utility/noop";
import Slider, { Knob } from "./";

const defaultProps = {
  onChange: noop
};

const map = {};
window.addEventListener = jest.fn((type, cb) => {
  map[type] = cb;
});
window.removeEventListener = jest.fn(type => {
  map[type] = undefined;
});

beforeEach(() => {
  window.addEventListener.mockClear();
  window.removeEventListener.mockClear();
});

it("should add event listeners on mount", () => {
  const wrapper = mount(<Slider {...defaultProps} />);

  // TODO: Why is there a "scroll" event listener?
  expect(window.addEventListener).toHaveBeenCalledTimes(3);
  expect(window.addEventListener.mock.calls).toMatchSnapshot();
});

it("should remove event listeners on unmount", () => {
  const wrapper = mount(<Slider {...defaultProps} />);

  wrapper.unmount();

  expect(window.removeEventListener).toHaveBeenCalledTimes(2);
  expect(window.removeEventListener.mock.calls).toMatchSnapshot();
});

it("should do nothing if mouse is moving, and not dragging", () => {
  const wrapper = mount(<Slider {...defaultProps} />);

  map.mousemove({ clientX: 100 });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

it("should move the slider when dragging", () => {
  const wrapper = mount(<Slider {...defaultProps} />);
  wrapper.instance().railWidth = 300;
  const knob = wrapper.find(Knob);

  knob.simulate("mousedown", { clientX: 100 });
  map.mousemove({ clientX: 150 });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

it("should move the slider on touch", () => {
  const wrapper = shallow(<Slider {...defaultProps} />);
  wrapper.instance().railWidth = 300;
  const knob = wrapper.find(Knob);

  knob.simulate("touchstart", {
    touches: [{ clientX: 100 }]
  });
  knob.simulate("touchmove", {
    touches: [{ clientX: 150 }]
  });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

it("should stop moving the slider on mouse up", () => {
  const wrapper = mount(<Slider {...defaultProps} />);
  wrapper.instance().railWidth = 300;
  const knob = wrapper.find(Knob);

  knob.simulate("mousedown", { clientX: 100 });
  map.mousemove({ clientX: 150 });

  map.mouseup();
  map.mousemove({ clientX: 300 });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

it("should have a minimum value of 0 when dragging slider", () => {
  const wrapper = mount(<Slider {...defaultProps} />);
  wrapper.instance().railWidth = 300;
  const knob = wrapper.find(Knob);

  knob.simulate("mousedown", { clientX: 100 });
  map.mousemove({ clientX: 0 });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

it("should have a maximum value when dragging slider", () => {
  const wrapper = mount(<Slider {...defaultProps} />);
  wrapper.instance().railWidth = 300;
  const knob = wrapper.find(Knob);

  knob.simulate("mousedown", { clientX: 0 });
  map.mousemove({ clientX: 400 });

  expect(wrapper.find(Knob).props().style).toMatchSnapshot();
});

describe("Key press", () => {
  it("should move the slider when pressing UP", () => {
    const wrapper = mount(<Slider {...defaultProps} />);
    wrapper.instance().railWidth = 300;
    const knob = wrapper.find(Knob);

    knob.simulate("keydown", { keyCode: 38 });

    expect(knob.props().style).toMatchSnapshot();
  });

  it("should move the slider when pressing RIGHT", () => {
    const wrapper = mount(<Slider {...defaultProps} />);
    wrapper.instance().railWidth = 300;
    const knob = wrapper.find(Knob);

    knob.simulate("keydown", { keyCode: 39 });

    expect(knob.props().style).toMatchSnapshot();
  });

  it("should move the slider when pressing DOWN", () => {
    const wrapper = mount(<Slider {...defaultProps} />);
    wrapper.instance().railWidth = 300;
    wrapper.setState({ offset: 10 });
    const knob = wrapper.find(Knob);

    knob.simulate("keydown", { keyCode: 37 });

    expect(knob.props().style).toMatchSnapshot();
  });

  it("should move the slider when pressing LEFT", () => {
    const wrapper = mount(<Slider {...defaultProps} />);
    wrapper.instance().railWidth = 300;
    wrapper.setState({ offset: 10 });
    const knob = wrapper.find(Knob);

    knob.simulate("keydown", { keyCode: 40 });

    expect(knob.props().style).toMatchSnapshot();
  });
});
