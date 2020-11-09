import '../assets/css/App.css';
import React, { Component } from 'react';

class RoutingScreen extends React.Component {

  render() {
      return(
        <div>
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
                      <td>{(idx+1)*10}</td>
                      <td>{op.desc}</td>
                      <td>{Math.round(op.setupTime * 1000) / 1000}</td>
                      <td>{Math.round(op.prodTime * 1000) / 1000}</td>
                      <td>{Math.round(op.setupTime + op.prodTime*this.props.releaseSize * 1000) / 1000}</td>
                      <td>{op.note}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      )
  }
}

export default RoutingScreen;
