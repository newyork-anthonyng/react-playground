import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import ModalDialog from "./";

const map = {};
window.addEventListener = (type, cb) => {
  map[type] = cb;
};
window.removeEventListener = (type, cb) => {
  map[type] = undefined;
};

const defaultProps = {
  onClose: () => {},
  focusElementAfterClose: React.createElement("button")
};

it('should render container with role="dialog"', () => {
  const wrapper = shallow(
    <ModalDialog {...defaultProps}>
      <h1>Hello World</h1>
    </ModalDialog>
  );

  const container = wrapper.find('[role="dialog"]');

  expect(container.length).toEqual(1);
});

it("should run callback when pressing ESC key", () => {
  const cb = jest.fn();
  const wrapper = mount(
    <ModalDialog {...defaultProps} onClose={cb}>
      <h1>Hello World</h1>
    </ModalDialog>
  );

  const ESCAPE_KEY = 27;
  map.keyup({ keyCode: ESCAPE_KEY });

  expect(cb).toHaveBeenCalledTimes(1);
});

it("should focus on first focusable element", () => {
  const wrapper = mount(
    <ModalDialog {...defaultProps}>
      <input type="text" />
      <input type="button" />
    </ModalDialog>
  );

  const firstFocusableElement = wrapper.find('input[type="text"]').get(0);
  expect(firstFocusableElement).toEqual(document.activeElement);
});

describe("Trap focus", () => {
  it("should bring you to first focusable element, if you are on the last focusable element", () => {
    const wrapper = mount(
      <ModalDialog {...defaultProps}>
        <input type="text" />
        <input type="button" />
      </ModalDialog>
    );

    const lastTrapFocusContainer = wrapper.find('div[tabIndex="0"]').at(1);
    lastTrapFocusContainer.simulate("focus");

    const firstFocusableElement = wrapper.find('input[type="text"]').get(0);
    expect(firstFocusableElement).toEqual(document.activeElement);
  });

  it("should bring you to last focusable element, if you SHIFT+TAB on the first focusable element", () => {
    const wrapper = mount(
      <ModalDialog {...defaultProps}>
        <input type="text" />
        <input type="button" />
      </ModalDialog>
    );

    const firstTrapFocusContainer = wrapper.find('div[tabIndex="0"]').at(0);
    firstTrapFocusContainer.simulate("focus");

    const lastFocusableElement = wrapper.find('input[type="button"]').get(0);
    expect(lastFocusableElement).toEqual(document.activeElement);
  });
});
