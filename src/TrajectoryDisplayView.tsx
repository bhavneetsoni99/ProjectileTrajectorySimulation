import * as React from 'react';
import { connect } from 'react-redux';
import { isEqual } from 'lodash';

import { Position } from './TrajectoryControllerView';

interface Props {
  data: Position[];
  maxHeight: number;
  maxWidth: number;
  timeOfFlight: number;
  backGroundColor: string;
  R: number;
  h: number;
}

interface State {
  maxHeight: number;
  maxWidth: number;
  backGroundColor: string;
}

// methods to work with canvas
let counter = 0;

class TrajectoryDisplayView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.refCanvas = React.createRef<HTMLCanvasElement>();
    this.state = {
      maxHeight: props.maxHeight,
      maxWidth: props.maxWidth,
      backGroundColor: props.backGroundColor,
    }
  }
  private interval: any;

  private refCanvas: React.RefObject<HTMLCanvasElement>;

  private changeInSelectedPlanet: boolean;
  private changeInMaxWidth: boolean;
  private changeInMaxHeight: boolean;

  public shouldComponentUpdate(nextProps: Props, nextState: State) {
    this.changeInSelectedPlanet = nextProps.backGroundColor !== this.props.backGroundColor;
    this.changeInMaxWidth = nextProps.maxWidth !== this.props.maxWidth;
    this.changeInMaxHeight = nextProps.maxHeight !== this.props.maxHeight;
    return !isEqual(this.props.data, nextProps.data);
  }

  public render() {
    return (
      <div>
        <canvas
          id={'canvas'}
          ref={this.refCanvas}
          width={850}
          height={375}
          style={{
            border: '1px solid #000000',
          }}
        />
        <br />
        <button onClick={() => { this.clear() }}>Clear All</button>
      </div>
    );
  }

  public componentDidMount() {
    this.paintBackground()
  }

  public componentDidUpdate() {
    this.clear();
    counter = 0;
    this.start();
  }
  private paintBackground() {
    const backgroundContext = this.getContextObject();
    if (backgroundContext) {
      backgroundContext.fillStyle = this.props.backGroundColor;
      backgroundContext.fillRect(0, 0, 850, 375);
      backgroundContext.fill();
    }
  }
  private getContextObject() {
    const canvas = this.refCanvas.current;
    return canvas && canvas.getContext('2d');
  }
  private renderProjectileTrajectory() {
    const projectileContext = this.getContextObject()
    if (projectileContext) {
      projectileContext.moveTo(0, 375);
      this.props.data.forEach(position => {
        const transformedX = position.x * 840 / this.props.maxWidth;
        const transformedY = 375 - position.y * 365 / this.props.maxHeight;
        projectileContext.lineTo(transformedX, transformedY);
      });
      projectileContext.stroke();
      projectileContext.fillStyle = 'Red'
      projectileContext.font = '60px';
      projectileContext.fillStyle = this.props.backGroundColor;
      projectileContext.fillRect(390, 260, 120, 50);
      projectileContext.fillRect(390, 0, 120, 50);
      projectileContext.fillStyle = 'Red';
      projectileContext.fillText(`H = ${(this.props.h).toFixed()} meters`, 400, 300);
      projectileContext.fillText(`Range = ${(this.props.R.toFixed())} meters`, 400, 20);
    }
  }

  private updateTrajectory() {
    if (counter < this.props.data.length) {
      const transformedX = this.props.data[counter].x * 840 / this.props.maxWidth;
      const transformedY = 375 - this.props.data[counter].y * 365 / this.props.maxHeight;
      const projectile = this.getContextObject()
      if (projectile) {
        projectile.fillStyle = this.props.backGroundColor;
        projectile.fillRect(390, 260, 120, 50);
        projectile.fillRect(390, 0, 120, 50);
        projectile.fillStyle = 'Red';
        projectile.fillRect(transformedX, transformedY, 10, 10);
        projectile.fillText(`H = ${(this.props.data[counter].y).toFixed()} meters`, 400, 300);
        projectile.fillText(`Range = ${(this.props.data[counter].x).toFixed()} meters`, 400, 20);
      }
      counter++;
    } else {
      this.renderProjectileTrajectory();
      this.stop();
    }

  }
  private start() {
    this.interval = setInterval(() => this.updateTrajectory(), 50);
  }
  private stop() {
    clearInterval(this.interval);
  }

  private clear() {
    this.stop();
    const canvas = this.refCanvas.current;
    const clearCan = canvas && canvas.getContext('2d');
    clearCan && clearCan.clearRect(0, 0, 850, 375);
    this.paintBackground();
  }
}

export default TrajectoryDisplayView;
// export default connect(mapStateToProps, undefined)<any>(TrajectoryDisplayView);

// function startGame() {
//   myGamePiece = new component(30, 30, "red", 80, 75);
//   myGameArea.start();
// }

// const myGameArea = {
//   canvas: document.createElement("canvas"),
//   start() {
//     this.canvas.width = 480;
//     this.canvas.height = 270;
//     this.context = this.canvas.getContext("2d");
//     document.body.insertBefore(this.canvas, document.body.childNodes[0]);
//     this.interval = setInterval(updateGameArea, 20);
//   },
//   stop() {
//     clearInterval(this.interval);
//   },
//   clear() {
//     this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
//   }
// }

// function component(width, height, color, x, y, type) {
//   this.type = type;
//   this.width = width;
//   this.height = height;
//   this.x = x;
//   this.y = y;
//   this.speedX = 0;
//   this.speedY = 0;
//   this.gravity = 0.05;
//   this.gravitySpeed = 0;
//   this.update = function () {
//     ctx = myGameArea.context;
//     ctx.fillStyle = color;
//     ctx.fillRect(this.x, this.y, this.width, this.height);
//   }
//   this.newPos = function () {
//     this.gravitySpeed += this.gravity;
//     this.x += this.speedX;
//     this.y += this.speedY + this.gravitySpeed;
//   }
// }
