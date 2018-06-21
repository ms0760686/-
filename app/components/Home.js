// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
        </div>
        <Link to="/management">to management</Link>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/management">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
      </div>
    );
  }
}
