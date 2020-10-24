import '../assets/css/App.css';
import React, { Component } from 'react';

import LoadScreen from './LoadScreen.js';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      values: null
    }
  }

  render() {
    if(!this.state.values) {
      return(<LoadScreen />)
    }
  }
}

export default App;
