import * as React from 'react';
import { Provider } from 'react-redux';

// import Router from './Router'; // although not required for the project this size, but we are using it for technology demonstration

import store from './store';

import SelectPlanetaryBody from './SelectPlanetaryBody';

import TextInputView from './HelperComponents/TextInputView';

const styles = require('./css-modules/App.module.css');

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
              <h1 className="App-title">Projectile Trajectory</h1>
            </header>
            <p className="App-intro">Projectile motion on different Planetary Bodies</p>
            <SelectPlanetaryBody />
            {}
            <TextInputView onBlur={this.handleChange} id={'v'} placeholder={'velocity'} />
            <TextInputView onBlur={this.handleChange} id={'a'} placeholder={'angle'} />
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
