import React, { Component } from "react";
import T from "prop-types";

class HeadSpace extends Component {
  constructor() {
    super();

    // keep track of y-scroll positions
    this.previousScrollPosition = 0;
    this.currentScrollPosition = 0;

    // the height of our header container
    this.startOffset = 0;

    this.isTicking = false;

    this.state = {
      isHidden: false,
      isFixed: false
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    this.startOffset = this.container.offsetHeight;
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    this.currentScrollPosition = window.pageYOffset;

    this.requestTick();
  };

  requestTick = () => {
    // https://www.html5rocks.com/en/tutorials/speed/animations/
    // Use requestAnimationFrame to throttle scroll events
    if (!this.isTicking) {
      requestAnimationFrame(this.update);
    }
    this.isTicking = true;
  };

  update = () => {
    this.isTicking = false;

    if (this.currentScrollPosition <= 0) {
      this.resetHeader();
    } else if (this.props.showAtBottom && this.isAtEndOfPage()) {
      this.fixHeader();
    } else if (this.isScrolledGreaterThanTolerance()) {
      const isScrollingDown =
        this.currentScrollPosition > this.previousScrollPosition;

      if (isScrollingDown) {
        this.hideHeader();
      } else {
        this.fixHeader();
      }
    }

    this.previousScrollPosition = this.currentScrollPosition;
  };

  isScrolledGreaterThanTolerance = () => {
    return (
      this.currentScrollPosition > this.startOffset &&
      Math.abs(this.currentScrollPosition - this.previousScrollPosition) >=
        this.props.scrollTolerance
    );
  };

  isAtEndOfPage = () => {
    return (
      window.innerHeight + this.currentScrollPosition >=
      document.body.offsetHeight
    );
  };

  resetHeader = () => {
    this.setState({
      isHidden: false,
      isFixed: false
    });
  };

  hideHeader = () => {
    this.setState({ isHidden: true });
  };

  fixHeader = () => {
    this.setState({
      isFixed: true,
      isHidden: false
    });
  };

  render() {
    const containerStyle = {
      position: this.state.isFixed ? "fixed" : "absolute",
      transform: this.state.isHidden
        ? `translate3d(0, -${this.startOffset}px, 0)`
        : "translate3d(0, 0, 0)",
      top: 0,
      left: 0,
      right: 0,
      transition: "transform 0.3s"
    };
    const placeholderStyle = {
      height: `${this.startOffset}px`
    };

    return (
      <div style={placeholderStyle}>
        <div
          ref={container => {
            this.container = container;
          }}
          style={containerStyle}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

HeadSpace.defaultProps = {
  scrollTolerance: 5,
  showAtBottom: true
};

HeadSpace.propTypes = {
  children: T.node.isRequired,
  scrollTolerance: T.number.isRequired,
  showAtBottom: T.bool.isRequired
};

export default HeadSpace;
