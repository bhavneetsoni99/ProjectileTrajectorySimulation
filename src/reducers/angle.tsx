import { createAction, createReducer, Dispatch } from '../Util';

export interface State {
  angleOfThrow: number;
}
const defaultState: State = { angleOfThrow: 0 };

enum ActionType {
  SET = 'ANGLE/SET',
}

export const mapDispatchToSetAngle = (dispatch: Dispatch) => (angle: number) => {
  // for show of concept only we can directly dispatch an Action object here
  dispatch(createAction(ActionType.SET)({ angleOfThrow: angle }));
};

export const reducer = createReducer(ActionType.SET)(defaultState)(
  (state: State, payload: State) => {
    const nextState = { ...state, ...payload };
    return nextState;
  },
);

export interface RootState {
  angle: State;
}

export const selectAngleOfThrow = (state: RootState) => state.angle.angleOfThrow;
