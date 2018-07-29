import * as React from 'react';
import { connect } from 'react-redux';
import DropdownView from './HelperComponents/DropdownView';
import { Planet, PLANETARY_BODIES } from './Data/PlanetsData';
import { Dispatch } from './Util';
import {
  RootState,
  mapDispatchToSetPlanet,
  selectSelectedPlanet,
} from 'reducers/planets';

interface State {
  selectedPlanet: Planet;
}
interface Props {
  setPlanet: (planet: Planet) => void;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlanet: mapDispatchToSetPlanet(dispatch),
});

const mapStateToProps = (state: RootState) => ({
  selectedPlanet: selectSelectedPlanet(state),
});

class PlanetsDropdown extends DropdownView<Planet> {}

class SelectPlanetaryBody extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { selectedPlanet: PLANETARY_BODIES[0] };
  }

  public render() {
    return (
      <div>
        <h3>Choose a Planet to run the simulation on </h3>
        <PlanetsDropdown
          items={PLANETARY_BODIES}
          selectedItem={this.state.selectedPlanet}
          itemRender={(planet: Planet) => planet.planet}
          onSelection={(planet: Planet) => this.handlePlanetSelection(planet)}
          errorDecoratingEnabled={false}
        />
        <br />
        <div>
          Selected planet is {this.state.selectedPlanet.planet} acceleration due to
          gravity(g) is {this.state.selectedPlanet.g} and an escape velocity of{' '}
          {this.state.selectedPlanet.ev}
        </div>
        <br />
      </div>
    );
  }

  private handlePlanetSelection(planet: Planet) {
    this.setState({ selectedPlanet: planet });
  }
}


export default connect(mapStateToProps, mapDispatchToProps)<any>(SelectPlanetaryBody);
