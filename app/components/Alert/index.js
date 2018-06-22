// @flow
import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';

type Props = {
    show: boolean,
    title: string,
    text: string
};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    const {
      show, title, text
    } = this.props;
    if (show) {
      return (
        <Alert bsStyle="danger" onDismiss={this.handleDismiss}>
          <strong>{title}</strong>
          {text}
        </Alert>
      );
    }
    return null;
  }
}
