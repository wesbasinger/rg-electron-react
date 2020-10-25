import '../assets/css/App.css';
import React, { Component } from 'react';

import RemainingWorkCenters from './RemainingWorkCenters';

class TransitionScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wc: "",
      setupQty: 0,
      prodQty: 0,
    }

    this.handleWcChange = this.handleWcChange.bind(this);
    this.handleSetupQtyChange = this.handleSetupQtyChange.bind(this);
    this.handleProdQtyChange = this.handleProdQtyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleWcChange(e) {
    this.setState({wc: e.target.value});
  }

  handleProdQtyChange(e) {
    this.setState({prodQty: Number(e.target.value)})
  }

  handleSetupQtyChange(e) {
    this.setState({setupQty: Number(e.target.value)})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onAddOperation(this.state);
  }

  render() {
      return(
        <div>
          <div>
            <RemainingWorkCenters workCenters={this.props.values} />
          </div>
          <div>
            <h1>Select Next Operation</h1>
            <form onSubmit={this.handleSubmit}>
              <label>Work Center</label>
              <select onChange={this.handleWcChange}>
                <option value=""></option>
                {
                  this.props.values.map((val) => {
                    return(
                      <option key={val.desc} value={val.desc}>{val.desc}</option>
                    )
                  })
                }
              </select>
              <label>Setup Qty</label>
              <input type="number" min="0" value={this.state.setupQty} onChange={this.handleSetupQtyChange} />
              <label>Prod Qty</label>
              <input type="number" min="0" value={this.state.prodQty} onChange={this.handleProdQtyChange} />
              <button type="submit">Go</button>
            </form>
          </div>
          <div>
            <h1>Routing Steps</h1>
            <table>
              <thead>
                <tr>
                  <td>Seq</td>
                  <td>WC</td>
                  <td>Setup Time</td>
                  <td>Prod Time</td>
                  <td>Total Time</td>
                  <td>Note</td>
                </tr>
              </thead>
              <tbody>
                {

                  this.props.rtg.map((op, idx) => {
                    return(
                      <tr key={idx}>
                        <td>{10*idx + 10}</td>
                        <td>{op.desc}</td>
                        <td>{op.setupTime}</td>
                        <td>{op.prodTime}</td>
                        <td>Total Time</td>
                        <td>{op.note}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      )
  }
}

export default TransitionScreen;
