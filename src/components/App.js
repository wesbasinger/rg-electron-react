import '../assets/css/App.css';
import React, { Component } from 'react';

import LoadScreen from './LoadScreen';
import ConfirmationScreen from './ConfirmationScreen';
import RoutingScreen from './RoutingScreen';

import calculate from '../../calculator';

import { ipcRenderer } from 'electron';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: null,
      confirmed: false,
      rtg: []
    }

    this.onExcelValues = this.onExcelValues.bind(this);
    ipcRenderer.on('excel-values', this.onExcelValues);

    this.onConfirmValues = this.onConfirmValues.bind(this);
  }

  onExcelValues(event, data) {
    this.setState({values: data});
  }

  onConfirmValues(event) {
    const calcRtg = calculate(this.state.values);
    this.setState({rtg: calcRtg});
    this.setState({confirmed:true})
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    } else if (this.state.values && !this.state.confirmed) {
      return (<ConfirmationScreen onConfirm={this.onConfirmValues} values={this.state.values} />)
    } else if (this.state.confirmed) {
      return (<RoutingScreen rtg={this.state.rtg} />)
    }
  }
}

export default App;
