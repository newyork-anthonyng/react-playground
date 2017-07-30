import React from "react";
import { shallow, mount } from "enzyme";
import toJSON from "enzyme-to-json";
import AccordionContainer from "./AccordionContainer";
import Accordion from "./Accordion";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";
import * as KeyCodes from "./keyCodes";
import noop from "../../utility/noop";
jest.mock("../../utility/uuid");

it("should render correctly", () => {
  const wrapper = shallow(
    <AccordionContainer>
      <Accordion>
        <AccordionTitle>First</AccordionTitle>
        <AccordionContent>Gold Medal</AccordionContent>
      </Accordion>
    </AccordionContainer>
  );

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe("Opening Accordion", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>Gold Medal</AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
  });

  it("should open Accordion when clicking on title", () => {
    const title = wrapper.find(AccordionTitle);
    title.props().onClick();

    expect(wrapper.find(Accordion).props().isOpen).toEqual(true);
  });

  it("should open Accordion when pressing ENTER", () => {
    const title = wrapper.find(AccordionTitle);
    const event = {
      preventDefault: noop,
      keyCode: KeyCodes.ENTER
    };
    title.props().onKeyDown(event);

    expect(wrapper.find(Accordion).props().isOpen).toEqual(true);
  });

  it("should open Accordion when pressing SPACE", () => {
    const title = wrapper.find(AccordionTitle);
    const event = {
      preventDefault: noop,
      keyCode: KeyCodes.SPACE
    };
    title.props().onKeyDown(event);

    expect(wrapper.find(Accordion).props().isOpen).toEqual(true);
  });
});

describe("Closing Accordion", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>Gold Medal</AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
    wrapper.setState({
      buttons: [true]
    });
  });

  it("should close Accordion when clicking on title", () => {
    const title = wrapper.find(AccordionTitle);
    title.props().onClick();

    expect(wrapper.find(Accordion).props().isOpen).toEqual(false);
  });

  it("should close Accordion when pressing ENTER", () => {
    const title = wrapper.find(AccordionTitle);
    const event = {
      preventDefault: noop,
      keyCode: KeyCodes.ENTER
    };
    title.props().onKeyDown(event);

    expect(wrapper.find(Accordion).props().isOpen).toEqual(false);
  });

  it("should close Accordion when pressing SPACE", () => {
    const title = wrapper.find(AccordionTitle);
    const event = {
      preventDefault: noop,
      keyCode: KeyCodes.SPACE
    };
    title.props().onKeyDown(event);

    expect(wrapper.find(Accordion).props().isOpen).toEqual(false);
  });
});

describe("When pressing UP key", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>Gold Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Second</AccordionTitle>
          <AccordionContent>Silver Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Third</AccordionTitle>
          <AccordionContent>Bronze Medal</AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
  });

  it("should go to previous Accordion Title", () => {
    const secondAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(1)
      .find("button")
      .get(0);
    secondAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(secondAccordionTitleEl);

    const secondAccordionTitle = wrapper.find(AccordionTitle).at(1);
    secondAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.UP });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(0).find("button").get(0)
    );
  });

  it("should go to last Accordion Title, if focused on the first one", () => {
    const firstAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(0)
      .find("button")
      .get(0);
    firstAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(firstAccordionTitleEl);

    const firstAccordionTitle = wrapper.find(AccordionTitle).at(0);
    firstAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.UP });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(2).find("button").get(0)
    );
  });
});

describe("When pressing DOWN key", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>Gold Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Second</AccordionTitle>
          <AccordionContent>Silver Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Third</AccordionTitle>
          <AccordionContent>Bronze Medal</AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
  });

  it("should go to next Accordion Title", () => {
    const secondAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(1)
      .find("button")
      .get(0);
    secondAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(secondAccordionTitleEl);

    const secondAccordionTitle = wrapper.find(AccordionTitle).at(1);
    secondAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.DOWN });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(2).find("button").get(0)
    );
  });

  it("should go to first Accordion Title, if focused on the last one", () => {
    const thirdAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(2)
      .find("button")
      .get(0);
    thirdAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(thirdAccordionTitleEl);

    const thirdAccordionTitle = wrapper.find(AccordionTitle).at(2);
    thirdAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.DOWN });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(0).find("button").get(0)
    );
  });
});

describe("HOME/END keys", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>Gold Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Second</AccordionTitle>
          <AccordionContent>Silver Medal</AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Third</AccordionTitle>
          <AccordionContent>Bronze Medal</AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
  });

  it("should go to first Accordion Title when pressing HOME key", () => {
    const secondAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(1)
      .find("button")
      .get(0);
    secondAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(secondAccordionTitleEl);

    const secondAccordionTitle = wrapper.find(AccordionTitle).at(1);
    secondAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.HOME });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(0).find("button").get(0)
    );
  });

  it("should go to last Accordion Title when pressing END key", () => {
    const secondAccordionTitleEl = wrapper
      .find(AccordionTitle)
      .at(1)
      .find("button")
      .get(0);
    secondAccordionTitleEl.focus();
    expect(document.activeElement).toEqual(secondAccordionTitleEl);

    const secondAccordionTitle = wrapper.find(AccordionTitle).at(1);
    secondAccordionTitle.props().onKeyDown({ keyCode: KeyCodes.END });

    expect(document.activeElement).toEqual(
      wrapper.find(AccordionTitle).at(2).find("button").get(0)
    );
  });
});
