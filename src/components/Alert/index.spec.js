import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Alert from "./";

it("should render children correctly", () => {
  const wrapper = shallow(
    <Alert>
      <h1>Hello</h1>
      <h2>Yo Yo Yo</h2>
    </Alert>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});
