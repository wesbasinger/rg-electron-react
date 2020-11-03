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
                <td>Total SMT Components</td>
                <td>{this.props.values.smtComponents}</td>
              </tr>
              <tr>
                <td>SMT Side One Placements</td>
                <td>{this.props.values.smtSideOnePlacements}</td>
              </tr>
              <tr>
                <td>Wash SMT Side One</td>
                <td>{this.props.values.washSMTSideOne}</td>
              </tr>
              <tr>
                <td>SMT Side Two Placements</td>
                <td>{this.props.values.smtSideTwoPlacements}</td>
              </tr>
              <tr>
                <td>Wash SMT Side Two</td>
                <td>{this.props.values.washSMTSideTwo}</td>
              </tr>
              <tr>
                <td>Mask Areas</td>
                <td>{this.props.values.maskAreas}</td>
              </tr>
              <tr>
                <td>SSLDR Side One Components</td>
                <td>{this.props.values.ssldrSideOneComponents}</td>
              </tr>
              <tr>
                <td>SSLDR Side One Joints</td>
                <td>{this.props.values.ssldrSideOneJoints}</td>
              </tr>
              <tr>
                <td>Wash SSLDR Side One</td>
                <td>{this.props.values.washSsldrSideOne}</td>
              </tr>
              <tr>
                <td>SSLDR Side Two Components</td>
                <td>{this.props.values.ssldrSideTwoComponents}</td>
              </tr>
              <tr>
                <td>SSLDR Side Two Joints</td>
                <td>{this.props.values.ssldrSideTwoJoints}</td>
              </tr>
              <tr>
                <td>Wash SSLDR Side Two</td>
                <td>{this.props.values.washSsldrSideTwo}</td>
              </tr>
              <tr>
                <td>Prep Leads</td>
                <td>{this.props.values.prepLeads}</td>
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
                <td>Flow Cycle</td>
                <td>{this.props.values.flowCycle}</td>
              </tr>
              <tr>
                <td>Wash Flow Cycle</td>
                <td>{this.props.values.washFlowCycle}</td>
              </tr>
              <tr>
                <td>Trim Leads</td>
                <td>{this.props.values.trimLeads}</td>
              </tr>
              <tr>
                <td>HSLDR Components</td>
                <td>{this.props.values.hsldrComponents}</td>
              </tr>
              <tr>
                <td>HSLDR Leads</td>
                <td>{this.props.values.hsldrLeads}</td>
              </tr>
              <tr>
                <td>Wash HSLDR</td>
                <td>{this.props.values.washHsldrCycle}</td>
              </tr>
              <tr>
                <td>Cable Minutes</td>
                <td>{this.props.values.cableMinutes}</td>
              </tr>
              <tr>
                <td>Program and Test Minutes</td>
                <td>{this.props.values.pgrmAndTestMinutes}</td>
              </tr>
              <tr>
                <td>Depanelize</td>
                <td>{this.props.values.depanelize}</td>
              </tr>
              <tr>
                <td>Coating</td>
                <td>{this.props.values.coating}</td>
              </tr>
              <tr>
                <td>Mech Minutes</td>
                <td>{this.props.values.mechMinutes}</td>
              </tr>
              <tr>
                <td>Packing Cost</td>
                <td>{this.props.values.packingCost}</td>
              </tr>
              <tr>
                <td>Release Size</td>
                <td>{this.props.values.releaseSize}</td>
              </tr>
            </tbody>
            </table>
          <button onClick={this.props.onConfirm} >ConfirmValues</button>
        </div>
      )
  }
}

export default ConfirmationScreen;
