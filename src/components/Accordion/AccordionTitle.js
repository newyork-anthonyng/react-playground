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
  children: T.node,
  isOpen: T.bool,
  ariaControls: T.string,
  id: T.string,
  onClick: T.func,
};

export default AccordionTitle;
