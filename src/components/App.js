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

  onConfirmValues(event) {
    console.log("Heard confirmation event from window")
    // TODO: DON'T FORGET TO SET STATE IN THE HANDLER
    ipcRenderer.send("confirm-values");
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    } else if (this.state.values && !this.state.confirmed) {
      return (<ConfirmationScreen onConfirm={this.onConfirmValues} values={this.state.values} />)
    }
  }
}

export default App;
