import React, { Component } from 'react';
import { Button, Form, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import PasswordDialog from './Password-Dialog/index';
import WelfareTable from './WelfareTable-table/index';
import WelfareRecordTable from './WelfareRecordTable-table/index';
import ExportRecordTable from './ExportRecordTable-table/index';
import EmployeeTable from './Employee-table/index';
import Dialog from './Dialog/index';
import styles from './management.css';

type Props = {
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
  exportRecord: () => void,
  editManagement: () => void,
  employee: Array,
  welfare: Array,
  welfareRecord: Array,
  exportWelfare: Array,
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
    props.exportRecord();
    props.readEmployee();
    props.readWelfare();
    props.readWelfareRecord();
    this.state = {
      log: {
        show: false,
        text: '',
      },
      passLog: {
        show: false,
        text: '修改管理員密碼',
        editFun: props.editManagement,
        accInfo: props.accInfo,
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
  setPassShow = (b) => (
    this.setState({ passLog: { ...this.state.passLog, show: b } })
  )
  Reload = () => {
    this.props.exportRecord();
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
        <div className="col-4">
          <Button bsStyle="primary" bsSize="large" onClick={this.Reload}>
            Refresh
          </Button>
          <Button bsStyle="primary" bsSize="large" onClick={() => this.setState({ passLog: { ...this.state.passLog, accInfo: this.props.accInfo, show: true } })}>
            更改SA密碼
          </Button>
        </div>
        <div className={styles.line} />
        <Panel bsStyle="success">
          <Panel.Heading>
            <h3 className={styles.title}>
              福委會資料
            </h3>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal>
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
            </Form>
          </Panel.Body>
        </Panel>
        <div className={styles.line} />
        <Panel bsStyle="success">
          <Panel.Heading>
            <h3 className={styles.title}>
            員工資料
            </h3>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal>
              <EmployeeTable
                data={employee}
                deleteFun={deleteEmployee}
                createFun={createEmployee}
                editFun={editEmployee}
              />
            </Form>
          </Panel.Body>
        </Panel>
        <div className={styles.line} />
        <Panel bsStyle="success">
          <Panel.Heading>
            <h3 className={styles.title}>
            紀錄
            </h3>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal>
              <WelfareRecordTable
                data={this.props.welfareRecord}
                createFun={this.props.crateWelfareRecord}
                editFun={this.props.editWelfareRecord}
                createRecordFun={this.props.crateWelfareRecord}
                insertRow={false}
                cellEdit={false}
                selectRow={false}
                setDialog={this.props.setDialog}
              />
            </Form>
          </Panel.Body>
        </Panel>
        <Panel bsStyle="success">
          <Panel.Heading>
            <h3 className={styles.title}>
            總計匯出預覽
            </h3>
          </Panel.Heading>
          <Panel.Body>
            <Form horizontal>
              <ExportRecordTable
                data={this.props.exportWelfare}
                createFun={this.props.crateWelfareRecord}
                editFun={this.props.editWelfareRecord}
                createRecordFun={this.props.crateWelfareRecord}
                insertRow={false}
                cellEdit={false}
                selectRow={false}
                setDialog={this.props.setDialog}
              />
            </Form>
          </Panel.Body>
        </Panel>
        <Dialog
          show={this.state.log.show}
          text={this.state.log.text}
          setDialog={this.props.setDialog}
        />
        <PasswordDialog
          show={this.state.passLog.show}
          setShow={this.setPassShow}
          text={this.state.passLog.text}
          editFun={this.state.passLog.editFun}
          accInfo={this.state.passLog.accInfo}
        />
      </div>
    );
  }
}
