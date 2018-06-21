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

  onToggle = () => {
    this.setState({ toggleActive: !this.state.toggleActive });
  }

  onInsert = () => {
    const Employeefomat = {
      ID: '',
      Name: '',
      Pass: '',
      Postition: '',
      WorkingDay: moment().format('YYYY/MM/DD'),
    };
    const LogInit = {
      show: true,
      text: '新增員工資料',
      fomat: Employeefomat,
      createFun: this.props.createFun
    };
    this.setState({ createLog: LogInit });
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
          <TableHeaderColumn dataField="WorkingDay" dataSort>到職日</TableHeaderColumn>
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
