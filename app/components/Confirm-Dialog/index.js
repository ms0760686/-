// @flow
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import style from './index.css';

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: props.text,
      focused: false,
      date: moment(`${moment().format('YYYY')}/12/31 00:00:00`, 'YYYY/MM/DD hh:mm:ss')
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
    });
  }

  crateData = () => {
    this.props.setShow(false);
    this.props.exeFun(this.state.date.format('YYYY/MM/DD'));
  }

  handleClose = () => {
    this.props.setShow(false);
  }
  onFocusChange = (b) => {
    this.setState({ focused: b });
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
              <div className={style.text}>
              結算日:
              </div>
              <SingleDatePicker
                isOutsideRange={() => false}
                date={this.state.date} // momentPropTypes.momentObj or null
                onDateChange={cdate => this.setState({ date: cdate })} // PropTypes.func.isRequired
                focused={this.state.focused} // PropTypes.bool
                onFocusChange={({ focused }) => this.onFocusChange(focused)}
                id="date" // PropTypes.string.isRequired,
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="danger" onClick={this.crateData}>OK</Button>
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
