import React from 'react';
import { shallow } from 'enzyme';
import Accordion from './Accordion';
import AccordionTitle from './AccordionTitle';
import AccordionContent from './AccordionContent';
import noop from '../../utility/noop';

const defaultProps = {
  onClick: noop,
  isOpen: true,
};

it('should render correctly', () => {
  const wrapper = shallow(
    <Accordion {...defaultProps}>
      <AccordionTitle>
        <h1>First Title</h1>
      </AccordionTitle>
      <AccordionContent>
        <p>Useful Information goes here</p>
      </AccordionContent>
    </Accordion>
  );
  console.log(wrapper.html());
});
