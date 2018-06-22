// @flow
import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import Toggle from 'react-bootstrap-toggle';
import { Button } from 'react-bootstrap';

import customCss from './index.css';
import CreateDialog from '../Create-Dialog/index';
import PasswordDialog from '../Password-Dialog/index';

const LogInit = {
  show: false,
};

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      createLog: {
        show: false,
        text: '',
        fomat: {},
      },
      passLog: {
        show: false,
        text: '修改密碼',
        editFun: props.editFun,
        id: '',
      },
      toggleActive: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data, createLog: LogInit });
  }

  onToggle = () => {
    this.setState({ toggleActive: !this.state.toggleActive, createLog: LogInit, passLog: LogInit });
  }

  onInsert = () => {
    const Employeefomat = {
      ID: '',
      Name: '',
      Pass: '',
      Postition: '',
      Point: '130',
      WorkingDay: moment().format('YYYY/MM/DD'),
    };
    const createLogInit = {
      show: true,
      text: '新增員工資料',
      fomat: Employeefomat,
      createFun: this.props.createFun
    };
    this.setState({ createLog: createLogInit });
  }
  onCellDelete = (ID) => {
    this.props.deleteFun(ID);
  }
  onCellEdit = (row, fieldName, val) => {
    this.props.editFun({ item: fieldName, value: val }, row.ID);
  }

  createCustomInsertButton = () => (
    <button onClick={this.onInsert} type="button" className="btn btn-info react-bs-table-add-btn">
      <span>
        <i className="fa glyphicon glyphicon-plus fa-plus" /> New
      </span>
    </button>
  );

  setCreateShow = (b) => (
    this.setState({ createLog: { ...this.state.createLog, show: b } })
  )
  setPassShow = (b) => (
    this.setState({ passLog: { ...this.state.passLog, show: b } })
  )

  buttonFormatter = (cell, row) => (
    <Button className="col-xs-12" bsStyle="primary" bsSize="large" onClick={() => this.setState({ passLog: { ...this.state.passLog, id: row.ID, show: true } })}>
      更改密碼
    </Button>
  )

  render() {
    function customConfirm(next, dropRowKeys) {
      dropRowKeys.join(',');
      next();
    }
    const options = {
      handleConfirmDeleteRow: customConfirm,
      onDeleteRow: this.onCellDelete,
      insertBtn: this.createCustomInsertButton,
      onCellEdit: this.onCellEdit
    };
    const selectRowProp = {
      mode: 'checkbox'
    };
    const cellEditProp = {
      mode: 'click'
    };
    return (
      <div>
        <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          size="xs"
          offstyle="danger"
          active={this.state.toggleActive}
        />
        <BootstrapTable
          className={customCss.table}
          data={this.state.data}
          exportCSV
          search
          multiColumnSearch
          deleteRow={this.state.toggleActive}
          pagination
          insertRow
          cellEdit={cellEditProp}
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn dataField="ID" isKey searchable={false} dataSort>編號</TableHeaderColumn>
          <TableHeaderColumn dataField="Name" dataSort>名稱</TableHeaderColumn>
          <TableHeaderColumn dataField="Postition" dataSort>單位</TableHeaderColumn>
          <TableHeaderColumn dataField="Point" dataSort>剩餘點數</TableHeaderColumn>
          <TableHeaderColumn dataField="WorkingDay" dataSort>到職日</TableHeaderColumn>
          <TableHeaderColumn dataField="action" dataFormat={this.buttonFormatter} editable={false} export={false} />
        </BootstrapTable>
        <CreateDialog
          show={this.state.createLog.show}
          setShow={this.setCreateShow}
          text={this.state.createLog.text}
          fomat={this.state.createLog.fomat}
          createFun={this.state.createLog.createFun}
        />
        <PasswordDialog
          show={this.state.passLog.show}
          setShow={this.setPassShow}
          text={this.state.passLog.text}
          editFun={this.state.passLog.editFun}
          id={this.state.passLog.id}
        />
      </div>
    );
  }
}
