import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import {
  RootState as PlanetsRootState,
  reducer as planetsReducer,
} from 'reducers/planets';

import {
  RootState as VelocityRootState,
  reducer as velocityReducer,
} from 'reducers/velocity';

import { RootState as AngleRootState, reducer as angleReducer } from 'reducers/angle';

interface RootState extends PlanetsRootState, VelocityRootState, AngleRootState {}

const rootReducer = combineReducers<RootState>({
  planets: planetsReducer,
  velocity: velocityReducer,
  angle: angleReducer,
});

const store = createStore<RootState>(rootReducer, composeWithDevTools());

export default store;
