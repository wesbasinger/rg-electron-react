import '../assets/css/App.css';
import React, { Component } from 'react';

import { ipcRenderer } from 'electron';

import exporter from '../../export';

class RoutingScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      day: null
    }
  }

  componentDidMount() {
      const date = new Date();
      this.setState({
        year : date.getFullYear(),
        month: date.getMonth()+1,
        day: date.getDate()
      })
  }

  render() {
      return(
        <div>
          <h1>Routing for {this.props.assemblyNumber}</h1>
          <table>
            <thead>
              <tr>
                <td>Seq</td>
                <td>Work Center</td>
                <td>Setup Time</td>
                <td>Production Time</td>
                <td>Total Time</td>
                <td>Notes</td>
              </tr>
            </thead>
            <tbody>
              {

                this.props.rtg.map((op, idx) => {

                  return(
                    <tr key={idx}>
                      <td>{op.seq}</td>
                      <td>{op.desc}</td>
                      <td>{op.setupTime}</td>
                      <td>{op.prodTime}</td>
                      <td>{op.totalTime}</td>
                      <td>{op.note}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          <p>Generated {`${this.state.year}-${this.state.month}-${this.state.day}`}</p>
          <button onClick={() => {
            ipcRenderer.send('csv-data', exporter(this.props.rtg) + `Generated ${this.state.year}-${this.state.month}-${this.state.day}\n`);
          }}>Export Values</button>
        </div>
      )
  }
}

export default RoutingScreen;
