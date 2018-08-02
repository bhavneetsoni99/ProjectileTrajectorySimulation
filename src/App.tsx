import * as React from 'react';
import { Provider } from 'react-redux';
// import Router from './Router'; // although not required for the project this size, but we are using it for technology demonstration
import store from './store';
import { InputTypesRegex } from './Data/InputTypes';
// import { Dispatch } from './Util';

import SelectPlanetaryBody from './SelectPlanetaryBody';

import TextInputView from './HelperComponents/TextInputView';
import TrajectoryControllerView from './TrajectoryControllerView';

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
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-evenly',
              }}
            >
              <TextInputView
                inputId={'velocity'}
                placeHolder={'velocity'}
                value={''}
                errorMessage={
                  'Invalid Velocity,velocity can range between the 0 and the escape velocity for the planet'
                }
                inputTypeRegex={InputTypesRegex.numericOnly}
                inputDiscription={'Velocity in m/sec      '}
              />
              <TextInputView
                inputId={'angle'}
                placeHolder={'angle'}
                value={''}
                maxLength={2}
                errorMessage={'Invalid angle, angle can range between 0 and 180'}
                inputTypeRegex={InputTypesRegex.numericOnly}
                inputDiscription={'Angle in degrees      '}
              />
            </div>
            <TrajectoryControllerView />
          </div>
        </StyledRoot>
      </Provider>
    );
  }
}

export default App;
