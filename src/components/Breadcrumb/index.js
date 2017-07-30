import React, { Component, Children } from "react";
import T from "prop-types";
import glamorous from "glamorous";

const List = glamorous.ol({
  display: "flex",
  listStyle: "none",
  padding: 0
});

const Crumb = glamorous.li({
  "&::after": {
    content: `''`,
    borderRight: "2px solid black",
    display: "inline-block",
    height: "16px",
    marginRight: "10px",
    paddingRight: "5px",
    transform: "rotate(13deg)",
    width: "3px"
  }
});

class Breadcrumb extends Component {
  constructor() {
    super();

    this.renderList = this.renderList.bind(this);
  }

  renderList() {
    const { children } = this.props;
    const childrenCount = Children.count(children);

    return Children.map(children, (link, i) => {
      if (i === childrenCount - 1) {
        return (
          <li>
            {React.cloneElement(link, { "aria-current": "page" })}
          </li>
        );
      }

      return (
        <Crumb>
          {link}
        </Crumb>
      );
    });
  }

  render() {
    const { children } = this.props;

    return (
      <nav aria-label="Breadcrumb">
        <List>
          {this.renderList()}
        </List>
      </nav>
    );
  }
}

Breadcrumb.propTypes = {
  children: T.node
};

export default Breadcrumb;
