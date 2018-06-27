import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';

export default class table extends Component<Props> {

  handleClose = () => {
    this.props.setDialog(false, '');
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Dialog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              {this.props.text}
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
