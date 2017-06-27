import React, { Component } from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';

class Checkbox extends Component {
  handleKeyPress = (e) => {
    // check for ENTER (13) or SPACEBAR (32)
    const isSelected = /^(13|32)/.test(e.charCode);

    if (isSelected) {
      this.props.onChange();
    }
  }

  handleClick = () => {
    this.props.onChange();
  }

  render() {
    const { checked, label } = this.props;

    return (
      <div
        role="checkbox"
        tabIndex="0"
        aria-checked={`${checked}`}
        aria-label={label}
        onKeyPress={this.handleKeyPress}
        onClick={this.handleClick}
        style={{
          border: '1px solid black',
          display: 'inline-block',
          height: '25px',
          width: '25px',
          position: 'relative',
          cursor: 'pointer',
          userSelect: 'none',
          borderRadius: '6px',
        }}
      >
        <span style={{
          position: 'absolute',
          top: '3px',
          left: '6px',
        }}>{checked && '✓'}</span>
      </div>
    );
  }
}

Checkbox.defaultProps = {
  checked: false,
  onChange: noop,
  label: 'Unlabelled checkbox',
};

Checkbox.propTypes = {
  checked: T.bool.isRequired,
  onChange: T.func.isRequired,
  label: T.string.isRequired,
};

export default Checkbox;
