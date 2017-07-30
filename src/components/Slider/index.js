import React, { Component } from "react";
import T from "prop-types";
import noop from "../../utility/noop";
import glamorous from "glamorous";

export const Rail = glamorous.div({
  backgroundColor: "#eee",
  border: "1px solid #888",
  height: "4px",
  position: "relative",
  width: "300px"
});

export const Knob = glamorous.div({
  backgroundColor: "#DDD",
  border: "1px solid #888",
  cursor: "pointer",
  height: "28px",
  position: "absolute",
  top: "-14px",
  width: "8px"
});

class Slider extends Component {
  constructor() {
    super();

    this.state = {
      offset: 0
    };

    this.isDragging = false;
    this.x = null;
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.handleDragMove);
    window.addEventListener("mouseup", this.handleDragEnd);

    this.railWidth = this.rail.getBoundingClientRect().width;
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleDragMove);
    window.removeEventListener("mouseup", this.handleDragEnd);
  }

  handleDragStart = e => {
    this.isDragging = true;

    const event = (e.touches && e.touches[0]) || e;
    const clientX = event.clientX;

    this.x = event.clientX;
  };

  handleDragMove = e => {
    if (!this.isDragging) return;

    const event = (e.touches && e.touches[0]) || e;
    const clientX = event.clientX;

    const offset = Math.min(
      this.railWidth,
      Math.max(0, this.state.offset + (clientX - this.x))
    );
    this.setState({ offset });

    this.x = clientX;
  };

  handleDragEnd = () => {
    if (!this.isDragging) return;

    this.isDragging = false;
    this.x = null;
  };

  handleKeyDown = e => {
    // pressed UP or RIGHT arrows
    if (/(38|39)/.test(e.keyCode)) {
      this.setState({
        offset: Math.min(this.railWidth, this.state.offset + 1)
      });
      // pressed DOWN or LEFT arrows
    } else if (/(37|40)/.test(e.keyCode)) {
      this.setState({
        offset: Math.max(0, this.state.offset - 1)
      });
    }
  };

  render() {
    return (
      <Rail
        innerRef={rail => {
          this.rail = rail;
        }}
      >
        <Knob
          tabIndex="0"
          role="slider"
          aria-label={this.props.label}
          aria-valuemax={this.railWidth}
          aria-valuemin="0"
          aria-valuenow={this.state.offset}
          style={{
            transform: `translateX(${this.state.offset}px)`
          }}
          onMouseDown={this.handleDragStart}
          onTouchStart={this.handleDragStart}
          onTouchMove={this.handleDragMove}
          onKeyDown={this.handleKeyDown}
        />
      </Rail>
    );
  }
}

Slider.defaultProps = {
  onChange: noop
};

Slider.propTypes = {
  onChange: T.func.isRequired,
  "*": T.any
};

export default Slider;
