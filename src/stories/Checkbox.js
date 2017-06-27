import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';

import Checkbox from '../components/Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <Checkbox
        checked={boolean('Checked', false)}
        onChange={action('Checkbox changed')}
        label={text('Checkbox label', 'My awesome checkbox')}
      />
    );
  })
  .add('Example', () => {
    class CheckboxContainer extends React.Component {
      constructor() {
        super();

        this.state = {
          checked: false,
          label: '',
        };
      }

      handleTextChange = (e) => {
        this.setState({ label: e.target.value });
      }

      handleCheckboxChange = () => {
        this.setState({
          checked: !this.state.checked,
        });
      }

      render() {
        return (
          <div>
            <input
              type="text"
              value={this.state.label}
              onChange={this.handleTextChange}
              placeholder="Type label for the checkbox..."
              style={{ display: 'block' }}
            />
            <Checkbox
              label={this.state.label}
              onChange={this.handleCheckboxChange}
              checked={this.state.checked}
            />
          </div>
        );
      }
    }

    return (
      <CheckboxContainer />
    );
  });
