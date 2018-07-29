import * as React from 'react';
import { clone } from 'lodash';
import { ValidationErrorLabeledDiv } from './Error';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface Props {
  inputId?: string;
  value: string;
  placeHolder?: string;
  maxLength?: number;
  errorMessage?: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  isNumericOnly?: boolean;
}

export interface State {
  value: string;
  errorMessage?: string;
  isEditing: boolean;
}

export class TextInputView extends React.Component<Props, State> {
  public static alphaOnly = /[a-zA-Z]+/g;
  public static numericOnly = /[\d]+/g;
  public static numericAndDecimalOnly = /[0-9\.\-]+/g;
  public static alphaNumericOnly = /[0-9a-zA-Z]+/g;

  public static alphaNumericAndSpaceOnly = /[0-9a-zA-Z ]+/g;
  public static alphaAndSpaceOnly = /[a-zA-Z ]+/g;

  constructor(props: Props) {
    super(props);
    this.state = {
      value: '',
      errorMessage: undefined,
      isEditing: false,
    };
  }

  public componentWillMount() {
    this.updateStateFromProps(this.props);
  }

  public componentWillReceiveProps(nextProps: Props) {
    this.updateStateFromProps(nextProps);
  }

  public render() {
    return (
      <ValidationErrorLabeledDiv errorMessage={this.props.errorMessage}>
        {this.renderInput()}
      </ValidationErrorLabeledDiv>
    );
  }

  private renderInput() {
    const { isNumericOnly, inputId, maxLength, placeHolder } = this.props;


    let value: string;
    if (this.state.isEditing) {
      value = clone(this.state.value);
    } else {
      value = clone(this.props.value);
    }

    return (
  <input
    onKeyDown={this.handleKeyDown}
    onFocus={this.handleFocus}
    onBlur={this.handleBlur}
    id={inputId}
    placeholder={placeHolder}
    maxLength={maxLength}
    value={value}
  />
    );
  }

  private updateStateFromProps(props: Props) {
    this.setState({
      value: props.value,
      errorMessage: props.errorMessage,
    });
  }

  private handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { onEnter } = this.props;
    if (onEnter && e.key === 'Enter') {
      onEnter(e.currentTarget.value);
    }
  };

  private handleFocus = () => this.setState({ isEditing: true, value: this.props.value });

  private handleBlur = () => {
    const { formatter, parser } = this.props.transform!;
    this.setState({ isEditing: false, value: formatter(this.state.value) });
    if (this.props.onChange) {
      this.props.onChange(parser(this.state.value));
    }
  };

  private handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = this.getFilteredValue(e.target.value);
    this.setState({
      value: filteredValue,
      errorMessage: this.props.errorMessage,
    });
    if (this.props.onChange && !this.props.transform) {
      this.props.onChange(filteredValue);
    }
  };

  private getFilteredValue(value: string) {
    return this.props.regex ? filterValueByRegex(value, this.props.regex) : value;
  }
}
