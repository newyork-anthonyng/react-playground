import React, { Component } from 'react';
import T from 'prop-types';
import glamorous from 'glamorous';

const Container = glamorous.div({
  backgroundColor: '#D3E8F8',
  border: '2px solid #3395E1',
  borderRadius: '4px',
  padding: '10px',
});

const Alert = ({ children }) => (
  <Container
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    {children}
  </Container>
);

Alert.propTypes = {
  children: T.node.isRequired,
};

export default Alert;
