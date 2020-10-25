import '../assets/css/App.css';
import React, { Component } from 'react';

import RemainingWorkCenters from './RemainingWorkCenters';

class TransitionScreen extends React.Component {

  render() {
      return(
        <div>
          <RemainingWorkCenters workCenters={this.props.values} />
        </div>
      )
  }
}

export default TransitionScreen;
