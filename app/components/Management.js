import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import WelfareTable from './WelfareTable-table/index';
import WelfareRecordTable from './WelfareRecordTable-table/index';
import EmployeeTable from './Employee-table/index';
import Dialog from './Dialog/index';
import styles from './management.css';

type Props = {
  deleteWelfareRecord: () => void,
  editWelfareRecord: () => void,
  crateWelfareRecord: () => void,
  readWelfareRecord: () => void,
  readEmployee: () => void,
  readWelfare: () => void,
  createEmployee: () => void,
  createWelfare: () => void,
  deleteEmployee: () => void,
  deleteWelfare: () => void,
  editEmployee: () => void,
  editWelfare: () => void,
  setDialog: () => void,
  employee: Array,
  welfare: Array,
  welfareRecord: Array,
  dbstate: object, // eslint-disable-line
  dialog: object,
  employeeReload: boolean,
  welfareReload: boolean,
  welfareRecordReload: boolean,
  accInfo: object
};

export default class Test extends Component<Props> {
  props: Props;
  constructor(props, context) {
    super(props, context);
    props.readEmployee();
    props.readWelfare();
    props.readWelfareRecord();
    this.state = {
      log: {
        show: false,
        text: '',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!Object.prototype.hasOwnProperty.call(nextProps.accInfo, 'Account')) {
      this.props.history.push('/');// eslint-disable-line
    }
    if (nextProps.welfareRecordReload) {
      this.props.readWelfareRecord();
    }
    if (nextProps.employeeReload) {
      this.props.readEmployee();
    }
    if (nextProps.welfareReload) {
      this.props.readWelfare();
    }
    this.setState({
      log: {
        show: nextProps.dialog.show,
        text: nextProps.dialog.text,
        createLog: {
          show: false,
          text: '',
          fomat: {},
          createFun: () => {}
        }
      }
    });
  }

  Reload = () => {
    this.props.readEmployee();
    this.props.readWelfare();
    this.props.readWelfareRecord();
  }
  // onClick={() => { this.createDialog('新增福委會資料', Welfarefomat, createWelfare); }}>
  // onClick={() => { this.props.createEmployee('k', 'l', 'l'); }}>
  // <Table data={payload} />
  render() {
    const {
      readEmployee, readWelfare, employee, welfare, createEmployee, deleteEmployee, editEmployee, createWelfare, deleteWelfare, editWelfare// eslint-disable-line
    } = this.props;
    return (
      <div>
        <div>
          <Link className={styles.back} to="/">to Home
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="col-12">
          <Button className="col-xs-12" bsStyle="primary" bsSize="large" onClick={this.Reload}>
            Refresh
          </Button>
        </div>
        <h1>
        福委會資料
        </h1>
        <WelfareTable
          data={welfare}
          deleteFun={deleteWelfare}
          createFun={createWelfare}
          editFun={editWelfare}
          delete
          insertRow
          cellEdit
          new
          selectRow
        />
        <h1>
          員工資料
        </h1>
        <EmployeeTable
          data={employee}
          deleteFun={deleteEmployee}
          createFun={createEmployee}
          editFun={editEmployee}
        />
        <h1>
        紀錄
        </h1>
        <WelfareRecordTable
          data={this.props.welfareRecord}
          deleteFun={this.props.deleteWelfareRecord}
          createFun={this.props.crateWelfareRecord}
          editFun={this.props.editWelfareRecord}
          createRecordFun={this.props.crateWelfareRecord}
          insertRow={false}
          cellEdit={false}
          selectRow={false}
          setDialog={this.props.setDialog}
        />
        <Dialog
          show={this.state.log.show}
          text={this.state.log.text}
          setDialog={this.props.setDialog}
        />
      </div>
    );
  }
}
