import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'react-dates/initialize';

import style from './index.css';

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: props.text,
      accInfo: props.accInfo,
      pass: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ text: nextProps.text, accInfo: nextProps.accInfo });
  }

  handleClose = () => {
    this.props.setShow(false);
  }

  editPass = () => {
    this.props.setShow(false);
    this.props.editFun({ item: 'Pass', value: this.state.pass }, this.state.accInfo);
  }
  updateValue = (e) => {
    this.setState({ pass: e.target.value });
  }

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="col-sm-12">
            <div className={style.body}>
              <label className="col-sm-12" htmlFor="pass" key="pass">
                <div className="col-sm-6">
                    密碼
                </div>
                <input
                  className="col-sm-6"
                  defaultValue=""
                  type="text"
                  name="pass"
                  onChange={this.updateValue}
                />
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.editPass}>OK</Button>
            <Button bsStyle="primary" onClick={this.handleClose}>Close</Button>
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
