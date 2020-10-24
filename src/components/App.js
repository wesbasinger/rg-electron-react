import '../assets/css/App.css';
import React, { Component } from 'react';

import LoadScreen from './LoadScreen.js';

import { ipcRenderer } from 'electron';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: null
    }

    this.onExcelValues = this.onExcelValues.bind(this);
    ipcRenderer.on('excel-values', this.onExcelValues);
  }

  onExcelValues(event, data) {
    console.log(data);
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    }
  }
}

export default App;
