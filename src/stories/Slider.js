import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Slider from '../components/Slider';
import glamorous from 'glamorous';

const Container = glamorous.div({
  margin: '50px',
});

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <Container>
        <Slider label="Anthony" />
      </Container>
    );
  });
