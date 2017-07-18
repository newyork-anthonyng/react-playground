import React, { Component, Children, cloneElement } from 'react';
import T from 'prop-types';
import glamorous from 'glamorous';

const CheckedRadio = glamorous.div(
  {
    '&::before': {
      border: '1px solid black',
      borderRadius: '100%',
      content: `''`,
      display: 'inline-block',
      height: '10px',
      marginRight: '5px',
      width: '10px',
    },
  },
  (props) => ({
    '&::before': {
      backgroundColor: props.selected ? 'tomato' : '',
    },
  })
);

export class Radio extends Component {
  render() {
    const { selected, children } = this.props;

    return (
      <CheckedRadio
        role="radio"
        tabIndex={selected ? '0' : '-1'}
        aria-checked={selected ? 'true' : 'false'}
        selected={selected}
      >
        {children}
      </CheckedRadio>
    );
  }
}

Radio.defaultProps = {
  selected: false,
  children: T.node.isRequired,
};

Radio.propTypes = {
  selected: T.bool.isRequired,
};

export class RadioGroup extends Component {
  constructor() {
    super();

    this.renderRadio = this.renderRadio.bind(this);
  }

  renderRadio() {
    // ensure that only one selected element is allowed
    const { children } = this.props;
    let isSelected = false;

    return (
      Children.map(children, radio => {
        if (radio.props.selected) {
          if (isSelected) {
            return cloneElement( radio, { selected: false });
          }

          isSelected = true;
        }
        return radio;
      })
    );
  }

  render() {
    const { label } = this.props;

    return (
      <div role="radiogroup" aria-label={label}>
        {this.renderRadio()}
      </div>
    );
  }
}

RadioGroup.defaultProps = {
  onChange: () => {},
};

RadioGroup.propTypes = {
  children: T.node.isRequired,
  label: T.string.isRequired,
  onChange: T.func.isRequired,
};
