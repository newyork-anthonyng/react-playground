import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import glamorous from 'glamorous';

import HeadSpace from '../components/HeadSpace';

const Container = glamorous.div({
  height: '3000vh',
});
const MyHeader = glamorous.h1({
  backgroundColor: 'tomato',
  textAlign: 'center',
  margin: '0',
});

storiesOf('HeadSpace', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <Container>
        <HeadSpace>
          <MyHeader>Hello World</MyHeader>
        </HeadSpace>
        <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam et fringilla urna, ut scelerisque tellus. Proin aliquet nisi nunc. Fusce ac mauris non ligula posuere molestie id non magna. Cras congue nunc dui. Mauris mattis efficitur leo nec interdum. Phasellus sem leo, egestas sit amet molestie id, scelerisque id mi. Nam nec pellentesque diam. Vestibulum nulla libero, dignissim sed lectus at, pulvinar rutrum tellus. Etiam vehicula suscipit aliquet. Nullam ac porttitor ex. Donec ultricies bibendum nibh a pharetra. Donec eget orci id justo pellentesque viverra nec vitae metus. Curabitur eget viverra felis, vel mollis sem. Praesent venenatis magna vitae elit dignissim scelerisque. Suspendisse ut purus purus. Integer vel orci cursus, pretium elit eget, iaculis quam.</p>
      </Container>
    );
  })
