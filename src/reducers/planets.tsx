import { Planet, PLANETARY_BODIES } from '../Data/PlanetsData';
import { createAction, createReducer, Dispatch } from '../Util';

export interface State {
  selectedPlanet: Planet;
}
const defaultState: State = { selectedPlanet: PLANETARY_BODIES[0] };

enum ActionType {
  SET = 'PLANET/SET',
}

export const mapDispatchToSetPlanet = (dispatch: Dispatch) => (planet: Planet) => {
  // for show of concept only we can directly dispatch an Action object here
  dispatch(createAction(ActionType.SET)({ selectedPlanet: planet }));
};

export const reducer = createReducer(ActionType.SET)(defaultState)(
  (state: State, payload: State) => {
    const nextState = { ...state, ...payload };
    return nextState;
  },
);

export interface RootState {
  planets: State;
}

export const selectSelectedPlanet = (state: RootState) => state.planets.selectedPlanet;
