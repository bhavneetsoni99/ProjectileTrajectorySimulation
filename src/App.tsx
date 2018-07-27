import * as React from 'react';

import { Provider } from 'react-redux';

// import Router from './Router'; // although not required for the project this size, but we are using it for technology demonstration

import store from './store';

import SelectPlanetaryBody from './SelectPlanetaryBody';

import { NumericInput } from './HelperComponents/Input';

import logo from './logo.svg';
const styles = require('./App.module.css');

const StyledRoot: React.SFC<{}> = ({ children }) => (
  <div className={styles.root}>{children}</div>
);

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <StyledRoot>
          {/*  <Router /> */}
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Projectile Trajectory</h1>
            </header>
            <p className="App-intro">Projectile motion on different Planetary Bodies</p>
            <SelectPlanetaryBody />
            {}
            <NumericInput
              onChange={this.handleChange}
              onBlur={this.handleChange}
              id={'v'}
              placeholder={'velocity'}
              value={0}
            />
            <NumericInput
              onChange={this.handleChange}
              onBlur={this.handleChange}
              id={'a'}
              placeholder={'angle'}
              value={0}
            />
            <button onClick={() => alert('start simulation')}>Start Simulation </button>
          </div>
        </StyledRoot>
      </Provider>
    );
  }

  private handleChange = () => {
    alert('change inititated');
  };
}

export default App;
