import '../assets/css/App.css';
import React, { Component } from 'react';

import { ipcRenderer } from 'electron';

class LoadScreen extends React.Component {

  render() {
      return(
        <div>
          <h1>Choose a 04.002 Quote Worksheet</h1>
          <button onClick={
            () => {
              ipcRenderer.send('open-spreadsheet');
            }
          }>Load File</button>
        </div>
      )
  }
}

export default LoadScreen;
