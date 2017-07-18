import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import glamorous from 'glamorous';

import { RadioGroup, Radio } from '../components/RadioGroup';

storiesOf('RadioGroup', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <RadioGroup label="Pizza">
        <Radio>Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
      </RadioGroup>
    );
  })
