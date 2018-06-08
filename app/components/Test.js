// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {};

export default class Test extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div data-tid="container">
          <h2>Tesdfgdfdgfdgdgdfgt</h2>
          <Link to="/counter">to Counter</Link>
          <Link to="/test">to Test</Link>
        </div>
      </div>
    );
  }
}
