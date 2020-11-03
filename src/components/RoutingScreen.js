import '../assets/css/App.css';
import React, { Component } from 'react';

class RoutingScreen extends React.Component {

  render() {
      return(
        <div>
          {JSON.stringify(this.props.rtg)}
        </div>
      )
  }
}

export default RoutingScreen;
