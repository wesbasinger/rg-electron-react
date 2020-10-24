import '../assets/css/App.css';
import React, { Component } from 'react';

import LoadScreen from './LoadScreen.js';
import ConfirmationScreen from './ConfirmationScreen.js';

import { ipcRenderer } from 'electron';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: null,
      confirmed: false
    }

    this.onExcelValues = this.onExcelValues.bind(this);
    ipcRenderer.on('excel-values', this.onExcelValues);
  }

  onExcelValues(event, data) {
    this.setState({values: data});
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    } else if (this.state.values && !this.state.confirmed) {
      return (<ConfirmationScreen values={this.state.values} />)
    }
  }
}

export default App;
