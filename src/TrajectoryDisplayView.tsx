import * as React from 'react';
import { Position } from './TrajectoryControllerView';
import { connect } from 'react-redux';
interface Props {
  data: Position[];
  maxHeight: number;
  maxWidth: number;
  timeOfFlight: number;
}
class TrajectoryDisplayView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.canvas = React.createRef();
  }
  // private canvas = React.createRef<HTMLCanvasElement>();
  public componentDidUpdate() {
    this.updateCanvas();
  }
  public updateCanvas() {
    console.log('updated Canvas')
    const canvas: any = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    const ctx2 = canvas.getContext('2d');
    const human = 1.8; // 6 feet
    ctx2.moveTo(30, 300);
    ctx2.lineTo(30, 350 - 6 * 300 / this.props.maxHeight);
    ctx2.stroke();
    ctx.moveTo(0, 300);
    this.props.data.forEach(position => {
      const transformedX = position.x * 800 / this.props.maxWidth;
      const transformedY = 350 - position.y * 300 / this.props.maxHeight;
      console.log(transformedX, transformedY);
      ctx.lineTo(transformedX, transformedY);
    });

    ctx.stroke();

    console.log(
      'Range is   ' +
      this.props.maxWidth +
      '   Max height achieved is  ' +
      this.props.maxHeight +
      '  time of flight is  ' +
      this.props.timeOfFlight,
    );
  }

  public render() {
    console.log('update Canvas');
    return (
      <div>
        <button onClick={}>Clear All</button>
        <canvas
          id={'mycanvas'}
          ref={this.canvas}
          width={850}
          height={350}
          style={{
            border: '1px solid #000000',
          }}
        />
      </div>
    );
  }
  private interval = setInterval(this.updateTrajectory, 20);
  private updateTrajectory() {
    this.clear();
    // projectile.newPos();
    // pojectile.update();
  }
  private stop() {
    clearInterval(this.interval);
  }
  private clear() {
    this.canvas.getContext('2d').clearRect(20, 20, 100, 50);
  }
  // private update() {
  //   ctx = myGameArea.context;
  //   ctx.fillStyle = color;
  //   ctx.fillRect(this.x, this.y, this.width, this.height);
  // }
  // private newPos() {
  //   this.gravitySpeed += this.gravity;
  //   this.x += this.speedX;
  //   this.y += this.speedY + this.gravitySpeed;
  // }
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
