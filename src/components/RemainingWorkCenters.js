import '../assets/css/App.css';
import React, { Component } from 'react';

class RemainingWorkCenters extends React.Component {
  render() {
    return(
      <div>
        <h1>Remaining Work Centers</h1>
        <table>
          <thead>
            <tr>
              <td>WC</td>
              <td>Setup Qty</td>
              <td>Prod Qty</td>
            </tr>
          </thead>
          <tbody>
            {
              this.props.workCenters.map( (val) => {
                if(val.prodQty > 0 || val.setupQty > 0) {
                  return(
                    <tr key={val.desc}>
                      <td>{val.desc}</td>
                      <td>{val.setupQty}</td>
                      <td>{val.prodQty}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}

export default RemainingWorkCenters;
