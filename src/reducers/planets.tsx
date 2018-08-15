import { Planet, PLANETARY_BODIES } from '../Data/PlanetsData';
import { createAction, createReducer, Dispatch } from '../Util';

export interface State {
  selectedPlanet: Planet;
  resetDisplayAreaCounter: number;
}
const defaultState: State = { selectedPlanet: PLANETARY_BODIES[0], resetDisplayAreaCounter: 0 };

enum ActionType {
  SET = 'PLANET/SET',
}

export const mapDispatchToSetPlanet = (dispatch: Dispatch) => (planet: Planet) => {
  // for show of concept only we can directly dispatch an Action object here
  dispatch(createAction(ActionType.SET)({ selectedPlanet: planet }));
};

export const reducer = createReducer(ActionType.SET)(defaultState)(
  (state: State, payload: State) => {
    const newState = { ...state, ...payload };
    newState.resetDisplayAreaCounter++;
    return newState;
  },
);

export interface RootState {
  planets: State;
}

export const selectSelectedPlanet = (state: RootState) => state.planets.selectedPlanet;

export const currentDisplayAreaCounter = (state: RootState) => state.planets.resetDisplayAreaCounter;
