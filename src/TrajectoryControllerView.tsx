import * as React from 'react';
import { connect } from 'react-redux';
import { Planet } from './Data/PlanetsData';
import { Dispatch } from './Util';
import { selectSelectedPlanet, currentDisplayAreaCounter } from 'reducers/planets';
import { selectSelectedVelocity } from 'reducers/velocity';
import { selectAngleOfThrow } from 'reducers/angle';

import TrajectoryDisplayView from './TrajectoryDisplayView';

interface State {
  runningSimulation: boolean;
  simulationResult: Position[];
  maxWidth: number;
  maxHeight: number;
  timeOfFlight: number;
  h: number;
  R: number;
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

const mapStateToProps = (state: any, props: any) => ({
  selectedPlanet: selectSelectedPlanet(state),
  g: selectSelectedPlanet(state).g,
  theta: Number((selectAngleOfThrow(state) * Math.PI / 180).toFixed(6)),
  V: selectSelectedVelocity(state),
});

const mapDispatchToProps = (dipatch: Dispatch) => ({});

class TrajectoryControllerView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      runningSimulation: false,
      simulationResult: [],
      maxWidth: 0,
      maxHeight: 0,
      timeOfFlight: 0,
      R: 0,
      h: 0,
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
        <TrajectoryDisplayView
          data={this.state.simulationResult}
          maxHeight={this.state.maxHeight}
          maxWidth={this.state.maxWidth}
          timeOfFlight={this.state.timeOfFlight}
          backGroundColor={this.props.selectedPlanet.backGroundColor}
          R={this.state.R}
          h={this.state.h}
        />
      </div>
    );
  }

  public handleRunSimmulation() {
    const { V, g, theta, selectedPlanet } = this.props;
    if (V < selectedPlanet.ev * 1000) {

      // time of flight
      const T = Number((2 * V * Math.sin(theta) / g).toFixed(6));

      // maximum height achieved

      const sinTheta = Number(Math.sin(theta).toFixed(6));
      const H = V * V * (Math.sin(1)) / (2 * g);
      const h = V * V * Number((Math.sin(sinTheta) / (2 * g)).toFixed(6));
      // Range achieved
      const R = V * V * Math.sin(2 * theta) / g;
      const maxRange = V * V / g;
      const Vx = V * Math.cos(theta);
      const Vy = V * Math.sin(theta);
      const positionDataPoints: Position[] = [];
      let t = 0.00;
      while (t <= T) {
        t = t + 0.05
        t = Number(t.toFixed(2));
        const x = Number((Vx * t).toFixed(3));
        const y = Number(((Vy - g * t / 2) * t).toFixed(3));
        positionDataPoints.push({ x, y });
      }
      this.setState({
        h,
        R,
        simulationResult: positionDataPoints,
        maxHeight: H,
        maxWidth: maxRange,
        timeOfFlight: T,
      });
    }

  }
}

export default connect(mapStateToProps, undefined)<any>(TrajectoryControllerView);
