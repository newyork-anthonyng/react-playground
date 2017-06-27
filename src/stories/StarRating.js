import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import StarRating from '../components/StarRating';

storiesOf('StarRating', module)
  .addDecorator(withKnobs)
  .add('With knobs', () => {
    return (
      <StarRating
        value={number('Value', 0)}
        size={number('Size', 5)}
        disabled={boolean('Disabled')}
        onChange={action('clicked')}
        onMouseEnter={action('mouse entered')}
        onMouseLeave={action('mouse left')}
      />
    );
  })
  .add('Example', () => {
    class RatingContainer extends React.Component {
      constructor() {
        super();

        this.state = {
          rating: 0,
          prospectiveRating: null,
          disabled: false,
        };

        this.handleRatingChange = this.handleRatingChange.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.renderMessage = this.renderMessage.bind(this);
      }

      handleRatingChange(rating) {
        this.setState({ rating });
      }

      handleMouseEnter(prospectiveRating) {
        this.setState({ prospectiveRating });
      }

      handleMouseLeave() {
        this.setState({ prospectiveRating: null });
      }

      renderMessage() {
        const rating = this.state.prospectiveRating || this.state.rating;
        switch (rating) {
          case 1:
            return 'Eek! Methinks not.';
          case 2:
            return `Meh. I've experienced better.`;
          case 3:
            return 'A-OK.';
          case 4:
            return `Yay! I'm a fan.`;
          case 5:
            return 'Woohoo! As good as it gets!';
          default:
            return '';
        }
      }

      render() {
        const { prospectiveRating, rating } = this.state;

        return (
          <div>
            <button onClick={() => this.setState({ disabled: !this.state.disabled }) }>
              {this.state.disabled ? 'Undisable': 'Disable'}
            </button>
            <StarRating
              value={prospectiveRating || rating}
              onChange={this.handleRatingChange}
              onMouseEnter={this.handleMouseEnter}
              onMouseLeave={this.handleMouseLeave}
              disabled={this.state.disabled}
            />
            {this.renderMessage()}
          </div>
        );
      }
    }

    return <RatingContainer />
  })
