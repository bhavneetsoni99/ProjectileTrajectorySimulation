import * as React from 'react';
import { connect } from 'react-redux';
import { Planet } from './Data/PlanetsData';
// import { Dispatch } from './Util';
import {
  // RootState,
  selectSelectedPlanet,
} from 'reducers/planets';
import { selectSelectedVelocity } from 'reducers/velocity';
import { selectAngleOfThrow } from 'reducers/angle';

import TrajectoryDisplayView from './TrajectoryDisplayView';

interface State {
  runningSimulation: boolean;
  simulationResult: Position[];
  maxWidth: number;
  maxHeight: number;
  timeOfFlight: number;
}
interface Props {
  selectedPlanet: Planet;
  g: number;
  theta: number;
  V: number;
}
export interface Position {
  x: number;
  y: number;
}

const mapStateToProps = (state: any) => ({
  selectedPlanet: selectSelectedPlanet(state),
  g: selectSelectedPlanet(state).g,
  theta: Number((selectAngleOfThrow(state) * Math.PI / 180).toFixed(6)),
  V: selectSelectedVelocity(state),
});

class TrajectoryControllerView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      runningSimulation: false,
      simulationResult: [],
      maxWidth: 0,
      maxHeight: 0,
      timeOfFlight: 0,
    };
  }

  public render() {
    return (
      <div>
        <p>
          {`selectedPlanetary Body is  ${
            this.props.selectedPlanet.planet
          } selected velocity is ${this.props.V} and the angle of throw in radians is ${
            this.props.theta
          }`}
        </p>
        <button onClick={() => this.handleRunSimmulation()}> {'Run simmulation'} </button>
        <br />
        {this.state.simulationResult.length && (
          <TrajectoryDisplayView
            data={this.state.simulationResult}
            maxHeight={this.state.maxHeight}
            maxWidth={this.state.maxWidth}
            timeOfFlight={this.state.timeOfFlight}
          />
        )}
      </div>
    );
  }

  public handleRunSimmulation() {
    const { V, g, theta } = this.props;
    // time of flight
    const T = Number((2 * V * Math.sin(theta) / g).toFixed(6));

    // maximum height achieved
    const sinTheta = Number(Math.sin(theta).toFixed(6));
    const H = V * V * Number((Math.sin(sinTheta) / (2 * g)).toFixed(6));
    // Range achieved
    const R = V * V * Math.sin(2 * theta) / g;
    const Vx = V * Math.cos(theta);
    const Vy = V * Math.sin(theta);
    const positionDataPoints: Position[] = [];
    for (let t = 0.042; t < T; t = t + 0.042) {
      t = Number(t.toFixed(3));
      const x = Vx * t;
      const y = (Vy - g * t / 2) * t;
      positionDataPoints.push({ x, y });
    }
    // tslint:disable:no-console
    console.log(positionDataPoints);
    // tslint:disable:no-console
    console.log(
      'Range is   ' + R + '   Max height achieved is  ' + H + '  time of flight is  ' + T,
    );

    this.setState({
      simulationResult: positionDataPoints,
      maxHeight: H,
      maxWidth: R,
      timeOfFlight: T,
    });
    this.displayResults();
  }

  private displayResults() {}
}

export default connect(mapStateToProps, undefined)<any>(TrajectoryControllerView);
