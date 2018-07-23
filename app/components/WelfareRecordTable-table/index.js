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
    this.setState({ data: this.replace(nextProps.data, this.change()), createLog: LogInit });
  }
  replace = (target, changeArr) => {
    const arrObj = Object.assign([], target);
    Object.keys(arrObj).forEach((i) => {
      Object.keys(arrObj[i]).forEach((dataObj) => {
        Object.keys(changeArr).forEach((ckey) => {
          if (dataObj === ckey) {
            arrObj[i][changeArr[ckey]] = arrObj[i][dataObj];
            delete arrObj[i][dataObj];
          }
        });
      });
    });
    return arrObj;
  }
  change = () => (
    {
      EmployeeID: '員工編號',
      Name: '名稱',
      Pass: '密碼',
      Num: '數量',
      Description: '描述',
      Point: '點數',
      CreateDate: '建立時間',
      EmployeeID_Name: '員工名稱',
      TotalPoints: '合計點數'
    }
  )
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
        <div className={customCss.line}>
          啟用刪除:{' '}
          <Toggle
            onClick={this.onToggle}
            on={<h2 className={customCss.toggle}>ON</h2>}
            off={<h2 className={customCss.toggle}>OFF</h2>}
            size="xs"
            offstyle="danger"
            active={this.state.toggleActive}
          />
        </div>
      );
    }
    return null;
  }
  onReserve = (row) => {
    if (moment(`${row.EndDate} 23:59:59`, 'YYYY/MM/DD hh:mm:ss', 'YYYY/MM/DD') < moment()) {
      this.props.setDialog(true, '已截止');
    } else {
      this.props.deleteFun(row.GuidKey, row[this.change().EmployeeID], row.WelfareGuid, row[this.change().TotalPoints]);
    }
  }
  buttonFormatter = (cell, row) => (
    <button onClick={() => this.onReserve(row)} type="button" className="btn btn-info react-bs-table-add-btn">
      <span>
        <i className="fa glyphicon glyphicon-plus fa-plus" /> 取消預約
      </span>
    </button>
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
    let selectRowProp = {};
    if (this.props.selectRow) {
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
          className={customCss.table100_ver1}
          data={this.state.data}
          search
          exportCSV
          multiColumnSearch
          deleteRow={this.state.toggleActive}
          pagination
          insertRow={this.props.insertRow}
          cellEdit={cellEditProp}
          selectRow={selectRowProp}
          options={options}
        >
          <TableHeaderColumn
            dataField={this.change().Name}
            isKey
            searchable={false}
            ataSort
            className={customCss.column1}
            columnClassName={customCss.column1}
          >
            名稱
          </TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().Point} dataSort>點數</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().Num} dataSort>數量</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().TotalPoints} dataSort>合計點數</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().EmployeeID} dataSort>員工名稱</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().Description} dataSort export={false}>備註</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().CreateDate} dataSort export={false}>創建時間</TableHeaderColumn>
          <TableHeaderColumn dataField="action" dataFormat={this.buttonFormatter} hidden={false} editable={false} export={false} />
        </BootstrapTable>
        <CreateDialog
          show={this.state.createLog.show}
          setShow={this.setCreateShow}
          text={this.state.createLog.text}
          fomat={this.state.createLog.fomat}
          createFun={this.state.createLog.createFun}
        />
      </div>
    );
  }
}

