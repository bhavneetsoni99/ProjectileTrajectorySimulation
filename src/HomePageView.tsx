import * as React from 'react';

interface State {
  homeText: string;
}

export default class HomePageView extends React.Component<{}, State> {
  constructor() {
    super({});

    this.state = {
      homeText: 'home',
    };

    setTimeout(() => {
      this.setState({ homeText: 'home after change ' });
    }, 1000);
  }
  public render() {
    return <div style={{ display: 'flex' }}>{this.state.homeText}</div>;
  }
}
