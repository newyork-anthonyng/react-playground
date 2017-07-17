import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import Breadcrumb from '../components/Breadcrumb';

storiesOf('Breadcrumb ', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <Breadcrumb>
        <a href="#1">First</a>
        <a href="#2">Second</a>
        <a href="#3">Third</a>
        <a href="#4">Fourth</a>
      </Breadcrumb>
    );
  })
