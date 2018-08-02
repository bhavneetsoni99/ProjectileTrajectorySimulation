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

interface State {
  runningSimulation: boolean;
  simulationResult: any;
}
interface Props {
  selectedPlanet: Planet;
  g: number;
  theta: number;
  V: number;
}
interface Position {
  x: number;
  y: number;
}

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   setSimulationStatus: mapDispatchToSetPlanet(dispatch),
// });

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
      </div>
    );
  }

  public handleRunSimmulation() {
    /*
    sx = m ln(1 + vxo kt/m)/k
     
    sy(t) = -mgt/k + m/k(vyo +mg/k)(1- e-kt/m)
     
    T = 2VSITHETA/G
    }
    */
    const { V, g, theta } = this.props;
    // time of flight
    const T = Number((2 * V * Math.sin(theta) / g).toFixed(6));

    // maximum height achieved
    const sinTheta = Number(Math.sin(theta).toFixed(6));
    const H = V * V * Number((Math.sin(sinTheta) / (2 * g)).toFixed(6));
    // Range achieved
    const R = V * V * Math.sin(2 * theta) / g;
    const Vx = V * Math.cos(theta);
    let Vy = V * Math.sin(theta);
    let y = 0;
    const positionDataPoints: Position[] = [];
    for (let t = 0; t < T; t = t + 0.042) {
      t = Number(t.toFixed(3));
      const x = Vx * t;
      y += (Vy - g * t / 2) * t;
      positionDataPoints.push({ x, y });
      Vy = Vy - g * t;
    }

    alert(
      'TotalTime In air is ' + T + 'sec and maxHeight is ' + H + ' Max Range is ' + R,
    );
  }
}

export default connect(mapStateToProps, undefined)<any>(TrajectoryControllerView);
