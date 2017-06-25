import React, { Component } from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';

class StarRating extends Component {
  constructor() {
    super();

    this.filledStar = '★';
    this.emptyStar = '☆';
  }

  handleClick = (value) => {
    if (this.props.disabled) return noop;

    return () => this.props.onChange(value);
  }

  handleMouseEnter = (value) => {
    if (this.props.disabled) return noop;

    return () => this.props.onMouseEnter(value);
  }

  handleMouseLeave = (value) => {
    if (this.props.disabled) return noop;

    return () => this.props.onMouseLeave(value);
  }

  renderStars = () => {
    const stars = [];
    for(let i = 0; i < this.props.size; i++) {
      const key = `${i + 1} rating`;
      stars.push(
        <li key={i}>
          <label
            htmlFor={key}
            aria-label={key}
          >
          <input
            type="radio"
            id={key}
            value={key}
            style={{ '-webkit-appearance': 'none' }}
            name="StarRating"
            onClick={this.handleClick(i + 1)}
            onMouseEnter={this.handleMouseEnter(i + 1)}
            onMouseLeave={this.handleMouseLeave(i + i)}
            checked={(i + 1) === this.props.value}
          />
            {i < this.props.value ? this.filledStar : this.emptyStar}
          </label>
        </li>
      );
    }

    return stars
  }

  render() {
    return (
      <ul
        style={{ display: 'flex', listStyle: 'none', padding: 0 }}
        role="radiogroup"
        aria-label={`${this.props.value + 1} rating`}
      >
        {this.renderStars()}
      </ul>
    );
  }
}

StarRating.defaultProps = {
  value: 0,
  size: 5,
  disabled: false,
  onChange: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
};

StarRating.propTypes = {
  value: T.number.isRequired,
  size: T.number.isRequired,
  disabled: T.bool.isRequired,
  onChange: T.func.isRequired,
  onMouseEnter: T.func.isRequired,
  onMouseLeave: T.func.isRequired,
};

export default StarRating;
