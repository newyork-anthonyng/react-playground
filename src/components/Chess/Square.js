import React from "react";
import T from "prop-types";

const Square = ({ black, children }) => {
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";

  return (
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: "100%",
        height: "100%"
      }}
    >
      {children}
    </div>
  );
};

Square.propTypes = {
  black: T.bool,
  children: T.node
};

export default Square;
