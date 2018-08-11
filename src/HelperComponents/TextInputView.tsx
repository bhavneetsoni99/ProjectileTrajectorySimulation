import * as React from 'react';
import { ValidationErrorLabeledDiv } from './Error';
import { connect } from 'react-redux';
import { Planet } from '../Data/PlanetsData';
import { Dispatch } from '../Util';
import { selectSelectedPlanet } from '../reducers/planets';
import { mapDispatchToSetVelocity, selectSelectedVelocity } from '../reducers/velocity';
import { mapDispatchToSetAngle, selectAngleOfThrow } from '../reducers/angle';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function filterValueByRegex(value: string, regex: RegExp) {
  let filteredValue = value;
  if (regex && value) {
    const matchingChars = value.match(regex);
    if (matchingChars) {
      filteredValue = matchingChars.join('');
    } else {
      filteredValue = '';
    }
  }
  return filteredValue;
}

export interface Props {
  inputId: string;
  value: string;
  placeHolder?: string;
  maxLength?: number;
  errorMessage: string;
  onEnter?: (value: string) => void;
  inputTypeRegex?: RegExp;
  checkValue?: (value: string) => void;
  selectedPlanet?: Planet;
  inputDiscription: string;
  setVelocity?: (velocity: number) => void;
  setAngle?: (angle: number) => void;
}

const mapStateToProps = (state: any, ownProps: Props) => {
  const numericValue: number =
    ownProps.inputId === 'velocity'
      ? selectSelectedVelocity(state)
      : selectAngleOfThrow(state);
  return {
    ...ownProps,
    value: numericValue.toString(),
    selectedPlanet: selectSelectedPlanet(state),
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setVelocity: mapDispatchToSetVelocity(dispatch),
  setAngle: mapDispatchToSetAngle(dispatch),
});

export interface State {
  value: string;
  errorMessage: string;
}

class TextInputView extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: props.value,
      errorMessage: '',
    };
  }

  public render() {
    return (
      <ValidationErrorLabeledDiv errorMessage={this.state.errorMessage}>
        {this.renderInput()}
      </ValidationErrorLabeledDiv>
    );
  }

  private renderInput() {
    const { inputId, maxLength, placeHolder } = this.props;

    return (
      <div>
        <span>{this.props.inputDiscription}</span>
        <input
          onBlur={this.handleBlur}
          onChange={e => this.handleOnChange(e)}
          id={inputId}
          placeholder={placeHolder}
          maxLength={maxLength}
          value={this.props.value}
        />
      </div>
    );
  }

  private handleBlur = () => {
    if (this.isValidValue(this.props.value)) {
      this.setState({
        errorMessage: '',
      });
    } else {
      this.setState({ errorMessage: this.props.errorMessage });
    }
  };

  private handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numberValue = Number(this.getFilteredValue(e.target.value));
    if (this.props.setVelocity && this.props.setAngle) {
      this.props.inputId === 'velocity'
        ? this.props.setVelocity(numberValue)
        : this.props.setAngle(numberValue);
    }
  };

  private getFilteredValue(value: string) {
    return this.props.inputTypeRegex
      ? filterValueByRegex(value, this.props.inputTypeRegex)
      : value;
  }
  private isValidValue(value: string) {
    const numericValue = Number(value);
    return (
      numericValue > 0 &&
      numericValue <
        (this.props.selectedPlanet && this.props.inputId === 'velocity'
          ? this.props.selectedPlanet.ev * 1000
          : 180)
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)<any>(TextInputView);
