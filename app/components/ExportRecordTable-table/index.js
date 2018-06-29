import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import Toggle from 'react-bootstrap-toggle';

import customCss from './index.css';

export default class table extends Component<Props> {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      toggleActive: false
    };
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ data: this.replace(this.sum(nextProps.data, this.state.toggleActive), this.change()) });
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
  sum = (target, bool) => {
    let SumTotalPoints = 0;
    const arrObj = JSON.parse(JSON.stringify(target));
    for (let i = 0; i < arrObj.length - 1; i += 1) {
      SumTotalPoints += arrObj[i].TotalPoints;
      for (let j = i + 1; j < arrObj.length; j += 1) {
        if (bool) {
          if (arrObj[j].EmployeeID === arrObj[i].EmployeeID &&
            arrObj[j].WelfareGuid === arrObj[i].WelfareGuid) {
            arrObj[i].TotalPoints += arrObj[j].TotalPoints;
            arrObj.splice(j, 1);
            j -= 1;
          }
        } else if (arrObj[j].WelfareGuid === arrObj[i].WelfareGuid) {
          arrObj[i].Num += arrObj[j].Num;
          arrObj[i].TotalPoints += arrObj[j].TotalPoints;
          SumTotalPoints += arrObj[j].TotalPoints;
          arrObj.splice(j, 1);
          j -= 1;
        }
      }
    }
    arrObj.push({
      EmployeeID: '', Name: '合計', Num: '', Description: '', EmployeeID_Name: '', TotalPoints: SumTotalPoints, Point: ''
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

  onToggle = () => {
    this.setState({
      data: this.replace(
        this.sum(this.props.data, !this.state.toggleActive),
        this.change(),
      )
    });
    this.setState({ toggleActive: !this.state.toggleActive });
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
        <div className={customCss.line}>
          切換預覽 (顯示人員):{' '}
          <Toggle
            onClick={this.onToggle}
            on={<h2 className={customCss.toggle}>ON</h2>}
            off={<h2 className={customCss.toggle}>OFF</h2>}
            size="xs"
            offstyle="danger"
            active={this.state.toggleActive}
          />
        </div>
        <BootstrapTable
          className={customCss.table100_ver1}
          data={this.state.data}
          search
          exportCSV
          multiColumnSearch
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
          <TableHeaderColumn dataField={this.change().EmployeeID_Name} hidden={!this.state.toggleActive} dataSort export={this.state.toggleActive}>員工名稱</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().Description} hidden={!this.state.toggleActive} dataSort export={false}>備註</TableHeaderColumn>
          <TableHeaderColumn dataField={this.change().CreateDate} hidden={!this.state.toggleActive} dataSort export={false}>創建時間</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

