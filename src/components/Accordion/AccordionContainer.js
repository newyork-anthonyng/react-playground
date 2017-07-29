import React, { Component } from 'react';
import * as KeyCodes from './keyCodes';
import T from 'prop-types';


class AccordionContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      buttons: React.Children.map(props.children, child => false)
    };
  }

  handleKeyDown = index => {
    return e => {
      switch (e.keyCode) {
        case KeyCodes.UP:
          this.scrollUp(index);
          break;
        case KeyCodes.DOWN:
          this.scrollDown(index);
          break;
        case KeyCodes.HOME:
          this.refs[`accordion-child-0`].button.focus();
          break;
        case KeyCodes.END:
          this.refs[
              `accordion-child-${React.Children.count(this.props.children) - 1}`
          ].button.focus();
          break;
        case KeyCodes.ENTER:
        case KeyCodes.SPACE:
          e.preventDefault();
          this.toggleContent(index);
          break;
      }
    };
  };

  handleClick = index => {
    return _ => {
      this.toggleContent(index);
    };
  };

  scrollUp = index => {
    let previousIndex = index - 1;
    if (previousIndex < 0)
    previousIndex = React.Children.count(this.props.children) - 1;

    this.refs[`accordion-child-${previousIndex}`].button.focus();
  };

  scrollDown = index => {
    let nextIndex = index + 1;
    if (nextIndex >= React.Children.count(this.props.children)) nextIndex = 0;

    this.refs[`accordion-child-${nextIndex}`].button.focus();
  };

  toggleContent = index => {
    this.setState({
      buttons: this.state.buttons.map((button, i) => {
        if (index === i) return !button;
        return button;
      })
    });
  };

  render() {
    return (
      <div>
        {React.Children.map(this.props.children, (child, i) => {
          return React.cloneElement(child, {
            onKeyDown: this.handleKeyDown(i),
            onClick: this.handleClick(i),
            ref: `accordion-child-${i}`,
            isOpen: this.state.buttons[i]
          });
        })}
      </div>
    );
  }
}

AccordionContainer.propTypes = {
  children: T.node.isRequired,
};

export default AccordionContainer;
