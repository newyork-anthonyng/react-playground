import React, { Component } from "react";
import T from "prop-types";
import glamorous from "glamorous";

const CheckedRadio = glamorous.div(
  {
    "&::before": {
      border: "1px solid black",
      borderRadius: "100%",
      content: `''`,
      display: "inline-block",
      height: "10px",
      marginRight: "5px",
      width: "10px"
    }
  },
  props => ({
    "&::before": {
      backgroundColor: props.selected ? "tomato" : ""
    }
  })
);

class Radio extends Component {
  render() {
    const { selected, onClick, children } = this.props;

    return (
      <CheckedRadio
        role="radio"
        tabIndex={selected ? "0" : "-1"}
        aria-checked={selected ? "true" : "false"}
        selected={selected}
        onClick={onClick}
      >
        {children}
      </CheckedRadio>
    );
  }
}

Radio.defaultProps = {
  selected: false,
  onClick: () => {}
};

Radio.propTypes = {
  selected: T.bool.isRequired,
  children: T.node.isRequired,
  onClick: T.func.isRequired
};

export default Radio;
