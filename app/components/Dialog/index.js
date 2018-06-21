import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      show: props.show,
      text: props.text,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show, text: nextProps.text });
  }

  handleClose = () => {
    this.setState({ show: false });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dialog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.state.text}
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
// Props 的型態，如果給錯型態，會跳warning。
table.props = {
  show: Boolean,
};
