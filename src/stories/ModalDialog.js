import React, { Component } from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import ModalDialog from '../components/ModalDialog';

storiesOf('ModalDialog', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    class Example extends Component {
      render() {
        return (
          <div>
            <button ref={(a) => { this.button = a; }}>Toggle Me</button>
            <ModalDialog
              onClose={action('modal closed')}
              focusElementAfterClose={this.button}
            >
              <h1>Hello World</h1>
              <button onClick={action('close button clicked')}>
                Close Dialog
              </button>
            </ModalDialog>
          </div>
        );
      }
    }

    return <Example />;
  })
  .add('Usable modal dialog', () => {
    class Container extends Component {
      constructor() {
        super();

        this.state = {
          isDialogOpen: false,
        };
      }

      handleToggleClick = () => {
        this.setState({
          isDialogOpen: !this.state.isDialogOpen,
        });
      }

      handleDialogButtonClick = () => {
        this.setState({
          isDialogOpen: false,
        });
      }

      render() {
        return (
          <div>
            <button
              ref={(a) => { this.button = a; }}
              onClick={this.handleToggleClick}
            >
              {
                this.state.isDialogOpen ?
                  'Close dialog' :
                  'Open dialog'
              }
            </button>
            {
              this.state.isDialogOpen &&
              <ModalDialog
                onClose={this.handleDialogClose}
                focusElementAfterClose={this.button}
              >
                <h1>This is a modal</h1>
                <button onClick={this.handleDialogButtonClick}>
                  Close Dialog
                </button>
              </ModalDialog>
            }
          </div>
        );
      }
    }

    return <Container />;
  })
