import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import moment from 'moment';
import Toggle from 'react-bootstrap-toggle';

import customCss from './index.css';
import CreateDialog from '../Create-Dialog/index';
import ReserveDialog from '../Create-Reserve-Dialog/index';

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
      reserveLog: {
        show: false,
        text: '',
        fomat: {},
      },
      selectData: [],
      toggleActive: false
    };
  }
  componentWillReceiveProps(nextProps) {
    const LogInit = {
      show: false,
    };
    this.setState({ data: nextProps.data, createLog: LogInit });
  }
  setReserveShow = (b) => (
    this.setState({ reserveLog: { ...this.state.reserveLog, show: b } })
  )
  setCreateShow = (b) => (
    this.setState({ createLog: { ...this.state.createLog, show: b } })
  )
  onReserve = (row) => {
    if (moment(`${row.StartDate} 00:00:00`, 'YYYY/MM/DD hh:mm:ss') > moment()) {
      this.props.setDialog(true, '未開始');
    } else if (moment(`${row.EndDate} 23:59:59`, 'YYYY/MM/DD hh:mm:ss', 'YYYY/MM/DD') < moment()) {
      this.props.setDialog(true, '已截止');
    } else {
      const LogInit = {
        show: true,
        text: '新增資料',
        fomat: row,
        createFun: this.props.createRecordFun
      };
      this.setState({ reserveLog: LogInit });
    }
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
      createFun: this.props.createFun,
      editPointFun: this.props.editPointFun
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
    this.props.new ?
      <button onClick={this.onInsert} type="button" className="btn btn-info react-bs-table-add-btn">
        <span>
          <i className="fa glyphicon glyphicon-plus fa-plus" /> New
        </span>
      </button> : <div />
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
  buttonFormatter = (cell, row) => (
    <button onClick={() => this.onReserve(row)} type="button" className="btn btn-info react-bs-table-add-btn">
      <span>
        <i className="fa glyphicon glyphicon-plus fa-plus" /> 預約
      </span>
    </button>
  )

  handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      this.setState({ selectData: [...this.state.selectData, row] });
    } else {
      const array = [...this.state.selectData]; // make a separate copy of the array
      const index = array.indexOf(row);
      array.splice(index, 1);
      this.setState({ selectData: array });
    }
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
    let selectRowProp = {};
    if (this.props.selectRow && this.state.toggleActive) {
      selectRowProp = {
        mode: 'checkbox',
      };
    }
    let cellEditProp = {};
    if (this.props.cellEdit) {
      cellEditProp = {
        mode: 'click'
      };
    }
    return (
      <div>
        {this.DeleteToggle()}
        <BootstrapTable
          className={customCss.table}
          data={this.state.data}
          search
          multiColumnSearch
          deleteRow={this.state.toggleActive}
          pagination
          insertRow={this.props.insertRow}
          cellEdit={cellEditProp}
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn dataField="Name" isKey searchable={false} dataSort>名稱</TableHeaderColumn>
          <TableHeaderColumn dataField="Description" dataSort>描述</TableHeaderColumn>
          <TableHeaderColumn dataField="Point" dataSort>花費點數</TableHeaderColumn>
          <TableHeaderColumn dataField="StartDate" dataSort>活動開始時間</TableHeaderColumn>
          <TableHeaderColumn dataField="EndDate" dataSort>活動截止時間</TableHeaderColumn>
          {this.props.reserve ?
            <TableHeaderColumn dataField="action" dataFormat={this.buttonFormatter} editable={false} export={false} dataSort>預約</TableHeaderColumn>
           : null}
        </BootstrapTable>
        <CreateDialog
          show={this.state.createLog.show}
          setShow={this.setCreateShow}
          text={this.state.createLog.text}
          fomat={this.state.createLog.fomat}
          createFun={this.state.createLog.createFun}
        />
        <ReserveDialog
          show={this.state.reserveLog.show}
          setShow={this.setReserveShow}
          text={this.state.reserveLog.text}
          fomat={this.state.reserveLog.fomat}
          createFun={this.state.reserveLog.createFun}
          accInfo={this.props.accInfo}
          editPointFun={this.state.reserveLog.editPointFun}
        />
      </div>
    );
  }
}

