import '../assets/css/App.css';
import React, { Component } from 'react';

import LoadScreen from './LoadScreen';
import ConfirmationScreen from './ConfirmationScreen';
import TransitionScreen from './TransitionScreen';

import reduce from '../../reduce';

import { ipcRenderer } from 'electron';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: null,
      confirmed: false,
      reduced: null
    }

    this.onExcelValues = this.onExcelValues.bind(this);
    ipcRenderer.on('excel-values', this.onExcelValues);

    this.onConfirmValues = this.onConfirmValues.bind(this);

  }

  onExcelValues(event, data) {
    this.setState({values: data});
  }

  onConfirmValues(event) {
    const reducedValues = reduce(this.state.values);
    this.setState({
      reduced : reducedValues,
      confirmed: true
    });
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    } else if (this.state.values && !this.state.confirmed) {
      return (<ConfirmationScreen onConfirm={this.onConfirmValues} values={this.state.values} />)
    } else if (this.state.values && this.state.confirmed && this.state.reduced) {
      return (<TransitionScreen values={this.state.reduced} />)
    }
  }
}

export default App;
