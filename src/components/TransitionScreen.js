import '../assets/css/App.css';
import React, { Component } from 'react';

import RemainingWorkCenters from './RemainingWorkCenters';

class TransitionScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      wc: "",
      setupQty: "",
      prodQty: ""
    }

    this.handleWcChange = this.handleWcChange.bind(this);
    //this.handleSetupQtyChange = this.handleSetupQtyChange.bind(this);
    //this.handleProdQtyChange = this.coatHandleSecPerBoard.bind(this);
  }

  handleWcChange(e) {
    this.setState({wc: e.target.value});
  }

  render() {
      return(
        <div>
          <div>
            <RemainingWorkCenters workCenters={this.props.values} />
          </div>
          <div>
            <form>
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
            </form>
          </div>
        </div>
      )
  }
}

export default TransitionScreen;
