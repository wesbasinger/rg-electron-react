import '../assets/css/App.css';
import React, { Component } from 'react';

import { ipcRenderer } from 'electron';

class RoutingScreen extends React.Component {

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
          <button onClick={() => {
            ipcRenderer.send('csv-data', this.props.rtg);
          }}>Export Values</button>
        </div>
      )
  }
}

export default RoutingScreen;
