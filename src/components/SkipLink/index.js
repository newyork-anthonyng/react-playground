import React, { Component } from 'react';
import T from 'prop-types';
import glamorous from 'glamorous';

const HiddenLink = glamorous.a({
  backgroundColor: 'black',
  color: 'white',
  padding: '25px',
  position: 'absolute',
  textDecoration: 'none',
  top: '-9999px',
  ':focus': {
    top: 0,
  },
});

class SkipLink extends Component {
  render() {
    const { href, ...rest } = this.props;

    return (
      <HiddenLink
        href={href}
        {...rest}
      >
        Skip to Navigation
      </HiddenLink>
    );
  }
}

SkipLink.propTypes = {
  href: T.string.isRequired,
  '*': T.any,
};

export default SkipLink;
