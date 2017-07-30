import React from "react";
import T from "prop-types";

const AccordionContent = ({ id, ariaLabelledBy, isOpen, children }) => {
  if (!isOpen) return null;

  return (
    <dd role="region" aria-labelledby={ariaLabelledBy}>
      {children}
    </dd>
  );
};

AccordionContent.defaultProps = {
  isOpen: false
};

AccordionContent.propTypes = {
  ariaLabelledBy: T.string,
  id: T.string,
  isOpen: T.bool,
  children: T.node
};

export default AccordionContent;
