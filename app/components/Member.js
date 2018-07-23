import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Panel } from 'react-bootstrap';

import WelfareTable from './WelfareTable-table/index';
import WelfareRecordTable from './WelfareRecordTable-table/index';
import Dialog from './Dialog/index';
import styles from './member.css';

type Props = {
  deleteWelfareRecord: () => void,
  crateWelfareRecord: () => void,
  readWelfareRecord: () => void,
  readEmployee: () => void,
  readWelfare: () => void,
  editEmployee: () => void,
  reserveWelfare: () => void,
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
    props.readEmployee(this.props.accInfo.ID);
    props.readWelfare();
    props.readWelfareRecord(this.props.accInfo.ID);
    this.state = {
      log: {
        show: false,
        text: '',
      },
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!Object.prototype.hasOwnProperty.call(nextProps.accInfo, 'ID')) {
      this.props.history.push('/');// eslint-disable-line
    }
    if (nextProps.employeeReload) {
      this.props.readEmployee(this.props.accInfo.ID);
    }
    if (nextProps.welfareReload) {
      this.props.readWelfare();
    }
    if (nextProps.welfareRecordReload) {
      this.props.readWelfareRecord(this.props.accInfo.ID);
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
    this.props.readWelfare();
    this.props.readWelfareRecord(this.props.accInfo.ID);
    this.props.readEmployee(this.props.accInfo.ID);
  }
  // onClick={() => { this.createDialog('新增福委會資料', Welfarefomat, createWelfare); }}>
  // onClick={() => { this.props.createEmployee('k', 'l', 'l'); }}>
  // <Table data={payload} />
  render() {
    const {
      welfare, employee, welfareRecord, deleteWelfareRecord, crateWelfareRecord, reserveWelfare
    } = this.props;
    return (
      <div>
        <div>
          <Link className={styles.back} to="/">登出
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className="col-4">
          <Button bsStyle="primary" bsSize="large" onClick={this.Reload}>
            Refresh
          </Button>
        </div>
        <h3 className={styles.title}>
          剩餘點數:{employee.length === 1 ? employee[0].Point : null}
        </h3>
        <div className={styles.line} />
        <Panel bsStyle="success">
          <Panel.Heading>
            <h3 className={styles.title}>
              福委會資料
            </h3>
          </Panel.Heading>
          <Panel.Body>
            <WelfareTable
              createRecordFun={reserveWelfare}
              editPointFun={this.props.editEmployee}
              data={welfare}
              insertRow
              cellEdit={false}
              reserve
              setDialog={this.props.setDialog}
              accInfo={this.props.accInfo}
              selectRow={false}
            />
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
            <WelfareRecordTable
              data={welfareRecord}
              deleteFun={deleteWelfareRecord}
              createFun={crateWelfareRecord}
              createRecordFun={crateWelfareRecord}
              insertRow={false}
              cellEdit={false}
              selectRow={false}
              setDialog={this.props.setDialog}
            />
          </Panel.Body>
        </Panel>
        <Dialog
          show={this.state.log.show}
          text={this.state.log.text}
          setDialog={this.props.setDialog}
        />
      </div>
    );
  }
}
