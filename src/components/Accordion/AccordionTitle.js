import React from 'react';
import T from 'prop-types';
import noop from '../../utility/noop';

const AccordionTitle = ({
  children,
  isOpen,
  ariaControls,
  onClick,
  id,
}) => (
  <dt role="heading" aria-level="3">
    <button
      aria-expanded={`${isOpen}`}
      aria-controls={ariaControls}
      onClick={onClick}
      id={id}
    >
      {children}
    </button>
  </dt>
);

AccordionTitle.defaultProps = {
  isOpen: false,
  onClick: noop,
};

AccordionTitle.propTypes = {
  children: T.node.isRequired,
  isOpen: T.bool.isRequired,
  ariaControls: T.string.isRequired,
  id: T.string.isRequired,
  onClick: T.func.isRequired,
};

export default AccordionTitle;
