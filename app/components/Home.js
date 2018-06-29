// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormGroup, Col, FormControl, ControlLabel, Panel } from 'react-bootstrap';

import Alert from './Alert/index';
import styles from './Home.css';

type Props = {
  login: () => void,
  isLogin: boolean,
  isManagement: boolean,
  loginID: string,
  alert: object
};

export default class Home extends Component<Props> {
  props: Props;
  constructor(props, context) {
    super(props, context);
    this.state = {
      ID: '',
      Password: ''
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLogin && nextProps.isManagement) {
      this.props.history.push('/management');// eslint-disable-line
    } else if (nextProps.isLogin && !nextProps.isManagement) {
      this.props.history.push('/member');// eslint-disable-line
    }
  }

  login = () => (
    this.props.login(this.state.ID, this.state.Password)
  )

  render() {
    const {
      loginID
    } = this.props;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          {loginID}
          <Panel bsStyle="success">
            <Panel.Heading>
              <Panel.Title componentClass="h3">登入資訊</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <Form horizontal>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    員工編號
                  </Col>
                  <Col sm={10}>
                    <FormControl type="text" placeholder="ID" onChange={(e) => this.setState({ ID: e.target.value })} />
                  </Col>
                </FormGroup>

                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    密碼
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" onChange={(e) => this.setState({ Password: e.target.value })} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button onClick={this.login}>Sign in</Button>
                  </Col>
                </FormGroup>
              </Form>
            </Panel.Body>
          </Panel>
          <Alert
            show={this.props.alert.show}
            title={this.props.alert.title}
            text={this.props.alert.text}
          />
          <div className={styles.backButton} data-tid="backButton">
            <Link to="/management">
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
            <Link to="/member">
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
