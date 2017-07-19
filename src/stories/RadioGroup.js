import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean, text } from '@storybook/addon-knobs';
import glamorous from 'glamorous';

import RadioGroup from '../components/RadioGroup';
import Radio from '../components/Radio';

storiesOf('RadioGroup', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <RadioGroup
        label="Pizza"
        onChange={action('RadioGroup changed')}
      >
        <Radio>Cheese</Radio>
        <Radio selected>Pepperoni</Radio>
      </RadioGroup>
    );
  })
  .add('With Container Component', () => {
    class Container extends React.Component {
      constructor() {
        super();

        this.state = {
          pizza: [
            { name: 'Cheese', selected: true },
            { name: 'Pepperoni', selected: false },
            { name: 'Onions', selected: false },
          ],
        };

        this.handleRadioChange = this.handleRadioChange.bind(this);
      }

      handleRadioChange(index) {
        const newPizzas = this.state.pizza.map((za, i) => {
          if (index === i) {
            return Object.assign({}, za, { selected: true });
          }
          return Object.assign({}, za, { selected: false });
        });

        this.setState({ pizza: newPizzas });
      }

      render() {
        return (
          <RadioGroup
            label="Pizza"
            onChange={this.handleRadioChange}
          >
            {
              this.state.pizza.map((za, i) => (
                <Radio
                  selected={za.selected}
                  key={i}
                >
                  {za.name}
                </Radio>
              ))
            }
          </RadioGroup>
        );
      }
    }

    return (<Container />);
  })
