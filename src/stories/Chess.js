import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import { Board } from '../components/Chess';
import { observe } from '../components/Chess/Game';

storiesOf('Chess', module)
  .addDecorator(withKnobs)
  .add('Example', () => {
    class Container extends React.Component {
      constructor() {
        super();

        this.state = {
          knightPosition: [0, 0],
        };
      }

      componentDidMount() {
        observe(knightPosition => {
          this.setState({ knightPosition });
        });
      }

      render() {
        return (
          <div style={{ height: '100vh', width: '100vw' }}>
            <Board knightPosition={this.state.knightPosition} />
          </div>
        );
      }
    }

    return <Container />;
  })
