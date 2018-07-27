import { createAction, createReducer, Dispatch } from '../Util';

export interface State {
  selectedInitialVelocity: number;
}
const defaultState: State = { selectedInitialVelocity: 0 };

enum ActionType {
  SET = 'VELOCITY/SET',
}

export const mapDispatchToSetVelocity = (dispatch: Dispatch) => (velocity: number) => {
  // for show of concept only we can directly dispatch an Action object here
  dispatch(createAction(ActionType.SET)({ selectedInitialVelocity: velocity }));
};

export const reducer = createReducer(ActionType.SET)(defaultState)(
  (state: State, payload: State) => {
    const nextState = { ...state, ...payload };
    return nextState;
  },
);

export interface RootState {
  velocity: State;
}

export const selectResponseStatus = (state: RootState) =>
  state.velocity.selectedInitialVelocity;
