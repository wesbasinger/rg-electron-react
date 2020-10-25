import '../assets/css/App.css';
import React, { Component } from 'react';

class TransitionScreen extends React.Component {

  render() {
      return(
        <div>
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
                  this.props.values.map( (val) => {
                    if(val.prod > 0 || val.setup > 0) {
                      return(
                        <tr>
                          <td>{val.desc}</td>
                          <td>{val.setup}</td>
                          <td>{val.prod}</td>
                        </tr>
                      )
                    }
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
