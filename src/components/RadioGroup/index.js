import React, { Component, Children, cloneElement } from 'react';
import Radio from '../Radio';
import T from 'prop-types';
import glamorous from 'glamorous';

class RadioGroup extends Component {
  constructor() {
    super();

    this.renderRadio = this.renderRadio.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidUpdate() {
    var selectedRadio = this.container.querySelector('[aria-checked="true"]');
    selectedRadio.focus();
  }

  handleKeyDown(e) {
    const { onChange } = this.props;
    let selectedIndex;
    React.Children.forEach(this.props.children, (radio, i) => {
      if (radio.props.selected && selectedIndex === undefined) {
        selectedIndex = i;
      }
    });

    switch (e.keyCode) {
      case 37: // LEFT
      case 38: // UP
      {
        let newIndex = selectedIndex - 1;
        if (newIndex < 0) newIndex = React.Children.count(this.props.children) - 1;
        onChange(newIndex);
        break;
      }
      case 39: // RIGHT
      case 40: // DOWN
      {
        let newIndex = selectedIndex + 1;
        if (newIndex >= React.Children.count(this.props.children)) newIndex = 0;
        onChange(newIndex);
        break;
      }
    }
  }

  handleRadioClick(index) {
    return () => this.props.onChange(index);
  }

  renderRadio() {
    // ensure that only one selected element is allowed
    const { children } = this.props;
    let isSelected = false;

    return (
      Children.map(children, (radio, i) => {
        if (radio.props.selected) {
          if (isSelected) {
            return cloneElement(radio, {
              selected: false,
              onClick: this.handleRadioClick(i),
            });
          }

          isSelected = true;
        }
        return cloneElement(radio, {
          onClick: this.handleRadioClick(i),
        });
      })
    );
  }

  render() {
    const { label } = this.props;

    return (
      <div
        role="radiogroup"
        aria-label={label}
        onKeyDown={this.handleKeyDown}
        ref={(container) => { this.container = container; }}
      >
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

export default RadioGroup;
