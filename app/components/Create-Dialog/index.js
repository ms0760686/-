// @flow
import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';
import moment from 'moment';

import style from './index.css';

const datePlugin = {
  WorkingDay: true,
  StartDate: true,
  EndDate: true,
};
const change = {
  員工編號: 'ID',
  名稱: 'Name',
  到職日: 'WorkingDay',
  密碼: 'Pass',
  單位: 'Postition',
  描述: 'Description',
  點數: 'Point',
  活動開始時間: 'StartDate',
  活動截止時間: 'EndDate',
};

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: props.text,
      fomat: props.fomat,
      focused: {},
      date: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    const init = this.init(nextProps);
    this.setState(Object.assign(
      {
        show: nextProps.show,
        text: nextProps.text,
        fomat: nextProps.fomat,
      },
      init
    ));
  }
  init = (nextProps) => {
    let temp = { focused: {}, date: {} };// eslint-disable-line
    Object.entries(this.replace(nextProps.fomat, change)).forEach((key) => {
      if (datePlugin[change[key[0]]]) {
        temp.focused = Object.assign(
          temp.focused,
          { [`${change[key[0]]}`]: false }
        );
        temp.date = Object.assign(
          temp.date,
          { [`${change[key[0]]}`]: moment() }
        );
      }
    });
    return temp;
  }

  crateData = () => {
    this.props.setShow(false);
    this.props.createFun(this.state.fomat);
  }

  handleClose = () => {
    this.props.setShow(false);
  }

  // if (Object.prototype.hasOwnProperty.call(change, key)) {
  replace = (target, changeArr) => {
    const obj = Object.assign({}, target);
    Object.keys(obj).forEach((key) => {
      Object.keys(changeArr).forEach((ckey) => {
        if (key === change[ckey]) {
          obj[ckey] = obj[key];
          delete obj[key];
        }
      });
    });
    return obj;
  }

  updateDate = (item, value) => {
    const temp = Object.assign({}, this.state.fomat); // creating copy of object
    temp[item] = value === null ? '' : value.format('YYYY/MM/DD');// updating value
    const dateT = Object.assign({}, this.state.date);
    dateT[`${item}`] = value;
    this.setState({ fomat: temp, date: dateT });
  }

  updateValue = (e) => {
    const temp = Object.assign({}, this.state.fomat); // creating copy of object
    temp[e.target.name] = e.target.value; // updating value
    this.setState({ fomat: temp });
  }

  createFrom = () => (
    Object.entries(this.replace(this.state.fomat, change)).map((key) => {
      let temp = false;
      Object.entries(datePlugin).map(() => {
        if (datePlugin[change[key[0]]]) {
          temp = true;
          return null;
        }
        return null;
      });
      return (
        <label className="col-sm-12" htmlFor={key[0]} key={change[key[0]]}>
          <div className="col-sm-6">
            {key[0]}
          </div>
          {
            (temp) ?
              <SingleDatePicker
                isOutsideRange={() => false}
                date={this.state.date[change[key[0]]]} // momentPropTypes.momentObj or null
                onDateChange={date => this.updateDate([`${change[key[0]]}`], date)} // PropTypes.func.isRequired
                focused={this.state.focused[change[key[0]]]} // PropTypes.bool
                onFocusChange={({ focused }) => this.setState({ focused: { [`${change[key[0]]}`]: focused } })}
                id={change[key[0]]} // PropTypes.string.isRequired,
              /> :
              <input
                className="col-sm-6"
                defaultValue={key[1]}
                type="text"
                name={change[key[0]]}
                onChange={this.updateValue}
              />
        }
        </label>
      );
    })
  );
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.text}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="col-sm-12">
            <div className={style.body}>
              { this.createFrom() }
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
