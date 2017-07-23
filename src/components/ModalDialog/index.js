import React, { Component } from 'react';
import T from 'prop-types';
import glamorous from 'glamorous';

const ModalOverlay = glamorous.div({
  position: 'fixed',
  top: '0',
  bottom: '0',
  left: '0',
  right: '0',
  zIndex: '100',
  backgroundColor: 'black',
  opacity: '0.6',
});

const ModalContainer = glamorous.div({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: '101',
  backgroundColor: 'white',
  padding: '50px',
});

class ModalDialog extends Component {
  componentDidMount() {
    window.addEventListener('keyup', this.handleKeyUp);

    this.focusFirstDescendant();
  }

  focusFirstDescendant = () => {
    const childrenCount = React.Children.count(this.props.children);

    for (let i = 0; i < childrenCount; i++) {
      const currentChild = this.refs[`child-${i}`];

      if (this.attemptToFocus(currentChild)) {
        return true;
      }
    }
    return false;
  };

  focusLastDescendant = () => {
    const childrenCount = React.Children.count(this.props.children);
    for (let i = childrenCount - 1; i >= 0; i--) {
      const currentChild = this.refs[`child-${i}`];

      if (this.attemptToFocus(currentChild)) {
        return true;
      }
    }
    return false;
  };

  attemptToFocus = element => {
    try {
      element.focus();
    } catch (e) {}

    return document.activeElement === element;
  };

  componentWillUnmount() {
    window.removeEventListener('keyup', this.handleKeyUp);

    if (
      this.props.focusElementAfterClose &&
      typeof this.props.focusElementAfterClose.focus === 'function'
    ) {
      this.props.focusElementAfterClose.focus();
    }
  }

  handleKeyUp = e => {
    if (e.keyCode === 27) {
      this.props.onClose();
    }
  };

  handleBeginningFocus = () => {
    // focus back to the last element in the dialog
    console.log('handle beginning focus');
    this.focusLastDescendant();
  };

  handleEndFocus = () => {
    // focus back to the first element in the dialog
    this.focusFirstDescendant();
  };

  render() {
    // add a reference to each child
    const children = React.Children.map(this.props.children, function(
      child,
      index,
    ) {
      return React.cloneElement(child, {
        ref: `child-${index}`,
      });
    });

    return (
      <div>
        <ModalOverlay />
        <div tabIndex="0" onFocus={this.handleBeginningFocus} />
        <ModalContainer role="dialog">
          {children}
        </ModalContainer>
        <div tabIndex="0" onFocus={this.handleEndFocus} />
      </div>
    );
  }
}

ModalDialog.defaultProps = {};

ModalDialog.propTypes = {
  children: T.node.isRequired,
  onClose: T.func.isRequired,
  focusElementAfterClose: T.element.isRequired,
};

export default ModalDialog;
