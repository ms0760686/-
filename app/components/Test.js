import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Table from './Table/Table';
// import styles from './Counter.css';

type Props = {
  increment: () => void,
  id: number,
  text: string,
  payload: object,
  error: string
};

export default class Test extends Component<Props> {
  props: Props;
  createTable = () => {
    const table1 = [];
    for (let i = 0; i < 3; i += 1) {
      table1.push(<tr>{123}</tr>);
    }
    return table1;
  }

  render() {
    const {
      increment, id, text, payload, error
    } = this.props;
    return (
      <div>
        <div data-tid="container">
          <h2> {id}</h2>
          <h2> {text}</h2>
          <Link to="/">to Home</Link>
        </div>
        {error}
        <button onClick={increment} data-tclass="btn">
          <i className="fa fa-plus" />
        </button>
        <Table data={payload} />
      </div>
    );
  }
}
