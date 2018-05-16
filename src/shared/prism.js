import React, { Component, Fragment } from 'react';
const Prism = ({ children }) => (
  <pre>
    <code dangerouslySetInnerHTML={{ __html: window.Prism.highlight(children, window.Prism.languages.js) }} />
  </pre>
);

export default Prism;
