import React, { Component } from 'react';
import T from 'prop-types';
import AccordionContent from './AccordionContent';
import AccordionTitle from './AccordionTitle';
import uuid from '../../utility/uuid';

class Accordion extends Component {
  constructor() {
    super();

    this.uniqueId = uuid();
  }

  renderAccordionContent = () => {
    const {
      isOpen,
      onClick,
      onKeyDown,
    } = this.props;

    const contentId = `${this.uniqueId}-content`;
    const titleId = `${this.uniqueId}-title`;

    return React.Children.map(this.props.children, (child) => {
      if (child.type === AccordionTitle) {
        return React.cloneElement(
          child,
          {
            isOpen,
            onClick,
            id: titleId,
            ariaControls: contentId,
            onKeyDown: onKeyDown,
            buttonRef: (button) => this.button = button,
          }
        );
      } else if (child.type === AccordionContent) {
        return React.cloneElement(
          child,
          {
            id: contentId,
            ariaLabelledby: titleId,
            isOpen,
          }
        );
      } else {
        throw new Error(`Accordion expected children to be AccordionTitle or AccordionContent, but received ${child.type}`);
      }
    });
  }

  render() {
    return (
      <div>
        {this.renderAccordionContent()}
      </div>
    );
  }
}

Accordion.propTypes = {
  children: T.node,
  onClick: T.func,
  isOpen: T.bool,
  onKeyDown: T.func,
};

export default Accordion;
