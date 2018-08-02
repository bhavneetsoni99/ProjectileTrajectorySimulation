import * as React from 'react';
import { connect } from 'react-redux';
import DropdownView from './HelperComponents/DropdownView';
import { Planet, PLANETARY_BODIES } from './Data/PlanetsData';
import { Dispatch } from './Util';
import {
  RootState,
  mapDispatchToSetPlanet,
  selectSelectedPlanet,
} from './reducers/planets';

interface Props {
  setPlanet: (planet: Planet) => void;
  selectedPlanet: Planet;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setPlanet: mapDispatchToSetPlanet(dispatch),
});

const mapStateToProps = (state: RootState) => ({
  selectedPlanet: selectSelectedPlanet(state),
});

class PlanetsDropdown extends DropdownView<Planet> {}

class SelectPlanetaryBody extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    return (
      <div>
        <h3>Choose a Planet to run the simulation on </h3>
        <PlanetsDropdown
          items={PLANETARY_BODIES}
          selectedItem={this.props.selectedPlanet}
          itemRender={(planet: Planet) => planet.planet}
          onSelection={(planet: Planet) => this.handlePlanetSelection(planet)}
          errorDecoratingEnabled={false}
        />
        <br />
        <p>
          Selected planet is {this.props.selectedPlanet.planet} acceleration due to
          gravity(g) is {this.props.selectedPlanet.g} m/sec/sec and an escape velocity of{' '}
          {this.props.selectedPlanet.ev * 1000} m/sec
        </p>
        <br />
      </div>
    );
  }

  private handlePlanetSelection(planet: Planet) {
    this.props.setPlanet(planet);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)<any>(SelectPlanetaryBody);
