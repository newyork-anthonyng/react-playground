import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import {
  AccordionContainer,
  Accordion,
  AccordionTitle,
  AccordionContent,
} from '../components/Accordion';

storiesOf('Accordion', module)
  .addDecorator(withKnobs)
  .add('Example', () => {
    return (
      <AccordionContainer>
        <Accordion>
          <AccordionTitle>First</AccordionTitle>
          <AccordionContent>
            <h1>I won Gold</h1>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Second</AccordionTitle>
          <AccordionContent>
            <h1>I won Silver</h1>
            <fieldset>
              <label>
                First Name
                <input type="text" placeholder="First name" />
              </label>
              <label>
                Last Name
                <input type="text" placeholder="Last name" />
              </label>
            </fieldset>
          </AccordionContent>
        </Accordion>
        <Accordion>
          <AccordionTitle>Third</AccordionTitle>
          <AccordionContent>
            <h1>I won Bronze</h1>
          </AccordionContent>
        </Accordion>
      </AccordionContainer>
    );
  });
