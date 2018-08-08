import * as React from 'react';
import { Position } from './TrajectoryControllerView';
interface Props {
  data: Position[];
  maxHeight: number;
  maxWidth: number;
  timeOfFlight: number;
}
class TrajectoryDisplayView extends React.Component<Props> {
  private canvas = React.createRef<HTMLCanvasElement>();
  public componentDidMount() {
    this.updateCanvas();
  }
  public updateCanvas() {
    const canvas: any = document.getElementById('mycanvas');
    const ctx = canvas.getContext('2d');
    ctx.moveTo(0, 300);
    this.props.data.forEach(position => {
      const transformedX = position.x; // * 800 / this.props.maxWidth;
      const transformedY = 350 - position.y; // * 300 / this.props.maxHeight;
      // tslint:disable:no-console
      // console.log(transformedX, transformedY);
      ctx.lineTo(transformedX, transformedY);
    });

    ctx.stroke();

    // tslint:disable:no-console
    // console.log(
    //   'Range is   ' +
    //     this.props.maxWidth +
    //     '   Max height achieved is  ' +
    //     this.props.maxHeight +
    //     '  time of flight is  ' +
    //     this.props.timeOfFlight,
    // );
  }
  public render() {
    return (
      <canvas
        id={'mycanvas'}
        ref={this.canvas}
        width={850}
        height={350}
        style={{
          border: '1px solid #000000',
        }}
      />
    );
  }
}

export default connect(mapStateToProps, undefined)<any>(TrajectoryDisplayView);
