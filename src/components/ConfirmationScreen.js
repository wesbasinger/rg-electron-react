import '../assets/css/App.css';
import React, { Component } from 'react';

class ConfirmationScreen extends React.Component {

  render() {
      return(
        <div>
          <h1>Please confirm the following values</h1>
          <h2>Work Center Values</h2>
          <table>
              <thead>
                <tr>
                  <td>Description</td>
                  <td>Value</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>AOI Panels Per Hour</td>
                  <td>{this.props.values.aoiInspPanelsPerHour}</td>
                </tr>
                <tr>
                  <td>SMT Setup Minutes Per Component</td>
                  <td>{this.props.values.smtSetupMinComp}</td>
                </tr>
                <tr>
                  <td>SSLDR Seconds Per Joint</td>
                  <td>{this.props.values.ssldrSecJoint}</td>
                </tr>
                <tr>
                  <td>Boards Per Panel</td>
                  <td>{this.props.values.boardPerPanel}</td>
                </tr>
                <tr>
                  <td>Coating Handling Sec Per Board</td>
                  <td>{this.props.values.coatHandleSecPerBoard}</td>
                </tr>
                <tr>
                  <td>Coating Time Secs Per Square Inch</td>
                  <td>{this.props.values.coatTimeSecPerSqInch}</td>
                </tr>
                <tr>
                  <td>Square Inches Per Board</td>
                  <td>{this.props.values.sqInchPerBoard}</td>
                </tr>
                <tr>
                  <td>Flow Panels Per Hour</td>
                  <td>{this.props.values.flowPanelsPerHour}</td>
                </tr>
              </tbody>
            </table>
            <h2>Assembly Specific Parameters</h2>
            <table>
              <thead>
                <tr>
                  <td>Description</td>
                  <td>Value</td>
                </tr>
              </thead>
            <tbody>
              <tr>
                <td>Coating</td>
                <td>{this.props.values.coating}</td>
              </tr>
              <tr>
                <td>Depanelize</td>
                <td>{this.props.values.depanelize}</td>
              </tr>
              <tr>
                <td>Flow</td>
                <td>{this.props.values.flowCycle}</td>
              </tr>
              <tr>
                <td>Hand Solder Components</td>
                <td>{this.props.values.hsldrComponents}</td>
              </tr>
              <tr>
                <td>Hand Solder Leads</td>
                <td>{this.props.values.hsldrLeads}</td>
              </tr>
              <tr>
                <td>Mask Areas</td>
                <td>{this.props.values.maskAreas}</td>
              </tr>
              <tr>
                <td>Mechanical Components</td>
                <td>{this.props.values.mechComponents}</td>
              </tr>
              <tr>
                <td>Mechanical Minutes</td>
                <td>{this.props.values.mechMinutes}</td>
              </tr>
              <tr>
                <td>Packing Cost</td>
                <td>{this.props.values.packingCost}</td>
              </tr>
              <tr>
                <td>Program and Test Minutes</td>
                <td>{this.props.values.pgrmAndTestMinutes}</td>
              </tr>
              <tr>
                <td>Prep Leads</td>
                <td>{this.props.values.prepLeads}</td>
              </tr>
              <tr>
                <td>Release Size</td>
                <td>{this.props.values.releaseSize}</td>
              </tr>
              <tr>
                <td>SMT Components</td>
                <td>{this.props.values.smtComponents}</td>
              </tr>
              <tr>
                <td>SMT Placements</td>
                <td>{this.props.values.smtPlacements}</td>
              </tr>
              <tr>
                <td>SSLDR Components</td>
                <td>{this.props.values.ssldrComponents}</td>
              </tr>
              <tr>
                <td>SSLDR Joints</td>
                <td>{this.props.values.ssldrJoints}</td>
              </tr>
              <tr>
                <td>Stuff Components</td>
                <td>{this.props.values.stuffComponents}</td>
              </tr>
              <tr>
                <td>Stuff Placements</td>
                <td>{this.props.values.stuffPlacements}</td>
              </tr>
              <tr>
                <td>Trim Leads</td>
                <td>{this.props.values.trimLeads}</td>
              </tr>
              <tr>
                <td>Wash Cycles</td>
                <td>{this.props.values.washCycles}</td>
              </tr>
            </tbody>
            </table>
          <button onClick={this.props.onConfirm} >ConfirmValues</button>
        </div>
      )
  }
}

export default ConfirmationScreen;
