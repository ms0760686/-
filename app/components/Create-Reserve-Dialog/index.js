// @flow
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'react-dates/initialize';

import style from './index.css';

const hide = {
  ID: false,
  Name: true,
  WorkingDay: false,
  Pass: false,
  Postition: false,
  Description: false,
  Point: true,
  StartDate: false,
  EndDate: false
};

const change = {
  ID: '員工編號',
  Name: '名稱',
  WorkingDay: '到職日',
  Pass: '密碼',
  Postition: '單位',
  Description: '描述',
  Point: '點數',
  StartDate: '活動開始時間',
  EndDate: '活動截止時間',
};
export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: props.text,
      fomat: props.fomat,
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      text: nextProps.text,
      fomat: nextProps.fomat,
    });
  }
  crateData = () => {
    this.props.setShow(false);
    this.props.createFun(this.state.fomat, this.props.accInfo, '預約');
  }

  handleClose = () => {
    this.props.setShow(false);
  }

  updateValue = (e) => {
    this.setState({ fomat: { ...this.state.fomat, Num: e.target.value } });
  }
  createPanel = () => (
    <div className="panel panel-default">
      <div className="panel-heading">{this.state.fomat.Name}</div>
      <div className="panel-body">
        {this.createFrom(this.state.fomat)}
      </div>
    </div>
  )
  createFrom = (obj) => {
    let html = [];
    html = Object.keys(obj).map((objkey) => {
      if (hide[objkey]) {
        return (
          <label className="col-sm-12" htmlFor={objkey} key={objkey}>
            <div className="col-sm-6">
              {change[objkey]}:
            </div>
            <div className="col-sm-6">
              {obj[objkey]}
            </div>
          </label>
        );
      }
      return null;
    });
    html.push( // eslint-disable-line
      <label className="col-sm-12" htmlFor="num" key="num">
        <div className="col-sm-6">
          數量:
        </div>
        <input
          className="col-sm-3"
          type="text"
          onChange={this.updateValue}
          key="input"
        />
      </label>);
    return html;
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
              { this.createPanel() }
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
