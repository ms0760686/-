import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import Toggle from 'react-bootstrap-toggle';

import customCss from './index.css';
import CreateDialog from '../Create-Dialog/index';


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
      toggleActive: false
    };
  }
  componentWillReceiveProps(nextProps) {
    const LogInit = {
      show: false,
    };
    this.setState({ data: nextProps.data, createLog: LogInit });
  }

  onInsert = () => {
    const Welfarefomat = {
      Name: '',
      Description: '',
      Point: '',
      StartDate: moment().format('YYYY/MM/DD'),
      EndDate: moment().format('YYYY/MM/DD'),
    };
    const LogInit = {
      show: true,
      text: '新增活動資料',
      fomat: Welfarefomat,
      createFun: this.props.createFun
    };
    this.setState({ createLog: LogInit });
  }
  onCellDelete = (Name) => {
    this.props.deleteFun(Name);
  }
  onCellEdit = (row, fieldName, val) => {
    this.props.editFun({ item: fieldName, value: val }, row.Name);
  }

  createCustomInsertButton = () => (
    <button onClick={this.onInsert} type="button" className="btn btn-info react-bs-table-add-btn">
      <span>
        <i className="fa glyphicon glyphicon-plus fa-plus" /> New
      </span>
    </button>
  );
  onToggle = () => {
    const LogInit = {
      show: false,
    };
    this.setState({ toggleActive: !this.state.toggleActive, createLog: LogInit });
  }
  DeleteToggle = () => {
    if (this.props.delete) {
      return (
        <Toggle
          onClick={this.onToggle}
          on={<h2>ON</h2>}
          off={<h2>OFF</h2>}
          size="xs"
          offstyle="danger"
          active={this.state.toggleActive}
        />
      );
    }
    return null;
  }

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
        {this.DeleteToggle()}
        <BootstrapTable
          className={customCss.table}
          data={this.state.data}
          search
          exportCSV
          multiColumnSearch
          deleteRow={this.state.toggleActive}
          pagination
          insertRow
          cellEdit={cellEditProp}
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn dataField="Name" isKey searchable={false} dataSort>名稱</TableHeaderColumn>
          <TableHeaderColumn dataField="Description" dataSort>描述</TableHeaderColumn>
          <TableHeaderColumn dataField="Point" dataSort>花費點數</TableHeaderColumn>
          <TableHeaderColumn dataField="StartDate" dataSort>活動開始時間</TableHeaderColumn>
          <TableHeaderColumn dataField="EndDate" dataSort>活動截止時間</TableHeaderColumn>
        </BootstrapTable>
        <CreateDialog
          show={this.state.createLog.show}
          text={this.state.createLog.text}
          fomat={this.state.createLog.fomat}
          createFun={this.state.createLog.createFun}
        />
      </div>
    );
  }
}

