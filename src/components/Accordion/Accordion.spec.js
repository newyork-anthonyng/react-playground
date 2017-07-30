import React from "react";
import { shallow } from "enzyme";
import toJSON from "enzyme-to-json";
import Accordion from "./Accordion";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
import noop from "../../utility/noop";
jest.mock("../../utility/uuid");

const defaultProps = {
  onClick: noop,
  isOpen: true
};

it("should render correctly when open", () => {
  const wrapper = shallow(
    <Accordion {...defaultProps} isOpen>
      <AccordionTitle>
        <h1>First Title</h1>
      </AccordionTitle>
      <AccordionContent>
        <p>Useful Information goes here</p>
      </AccordionContent>
    </Accordion>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should render correctly when not open", () => {
  const wrapper = shallow(
    <Accordion {...defaultProps} isOpen={false}>
      <AccordionTitle>
        <h1>First Title</h1>
      </AccordionTitle>
      <AccordionContent>
        <p>Useful Information goes here</p>
      </AccordionContent>
    </Accordion>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

it("should throw error when include child that is not AccordionTitle or AccordionContent", () => {
  expect(() => {
    shallow(
      <Accordion {...defaultProps}>
        <h1>Invalid Element</h1>
      </Accordion>
    );
  }).toThrow(
    "Accordion expected children to be AccordionTitle or AccordionContent, but received h1"
  );
});
