import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import WelfareTable from './WelfareTable-table/index';
import WelfareRecordTable from './WelfareRecordTable-table/index';
import Dialog from './Dialog/index';
import styles from './member.css';

type Props = {
  deleteWelfareRecord: () => void,
  editWelfareRecord: () => void,
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
  }
  // onClick={() => { this.createDialog('新增福委會資料', Welfarefomat, createWelfare); }}>
  // onClick={() => { this.props.createEmployee('k', 'l', 'l'); }}>
  // <Table data={payload} />
  render() {
    const {
      welfare, employee, welfareRecord, deleteWelfareRecord, editWelfareRecord, crateWelfareRecord, reserveWelfare
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
        <h1>剩餘點數:{employee.length === 1 ? employee[0].Point : null}</h1>
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
        <h1>
        紀錄
        </h1>
        <WelfareRecordTable
          data={welfareRecord}
          deleteFun={deleteWelfareRecord}
          createFun={crateWelfareRecord}
          editFun={editWelfareRecord}
          createRecordFun={crateWelfareRecord}
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
