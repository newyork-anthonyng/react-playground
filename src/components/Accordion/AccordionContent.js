import React from 'react';
import T from 'prop-types';

const AccordionContent = ({
  id,
  ariaLabelledBy,
  isOpen,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <dd
      role="region"
      aria-labelledBy={ariaLabelledBy}
    >
      {children}
    </dd>

  );
};

AccordionContent.defaultProps = {
  isOpen: false,
};

AccordionContent.propTypes = {
  ariaLabelledBy: T.string.isRequired,
  id: T.string.isRequired,
  isOpen: T.bool.isRequired,
  children: T.node.isRequired,
};

export default AccordionContent;
