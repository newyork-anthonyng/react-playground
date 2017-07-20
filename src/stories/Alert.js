import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import Alert from '../components/Alert';

storiesOf('Alert', module)
  .addDecorator(withKnobs)
  .add('Example', () => {
    return (
      <Alert>
        <h1>Alert</h1>
      </Alert>
    );
  })
  .add('With toggle button', () => {
    class Container extends React.Component {
      constructor() {
        super();
        this.state = {
          isOpen: false,
        };

        this.handleButtonClick = this.handleButtonClick.bind(this);
      }

      handleButtonClick() {
        this.setState({ isOpen: !this.state.isOpen });
      }

      render() {
        return (
          <div>
            <button onClick={this.handleButtonClick}>
              {this.state.isOpen ? 'Hide alert' : 'Show alert'}
            </button>
            {
              this.state.isOpen &&
              <Alert>
                <h1>Hey. This is an important message.</h1>
                <h2>You might want to check out your password</h2>
              </Alert>
            }
          </div>
        );
      }
    }

    return <Container />
  })
