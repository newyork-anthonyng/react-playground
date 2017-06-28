import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import glamorous from 'glamorous';

const ContainerPage = glamorous.div({
  height: '200vh',
  backgroundColor: 'aliceblue',
  position: 'relative',
});
const Footer = glamorous.div({
  position: 'absolute',
  bottom: 0,
  left: 0,
});

import SkipLink from '../components/SkipLink';

storiesOf('SkipLink', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <ContainerPage>
        <SkipLink
          href="#footer"
          onClick={() => console.log('Hello World')}
        />
        <Footer id="footer">
          I am a footer
        </Footer>
      </ContainerPage>
    );
  });
