import * as React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface NumericInputProps extends InputProps {
  value?: number;
  maxValue?: number;
  minValue?: number;
  onBlur?: () => void;
}

export const NumericInput = ({
  onBlur,
  // maxValue,
  // maxLength,
  // minValue,
  placeholder,
  value,
  ...rest
}: NumericInputProps) => {
  const formatValue = () => {
    if (!value) {
      return 0;
    }
    return value;
  };

  const handleBlur = () => {
    alert(formatValue);
    onBlur ? () => onBlur() : '';
  };

  return (
    <input
      {...rest}
      className={'cast-c-input '}
      type={'tel'}
      value={formatValue()}
      placeholder={placeholder ? placeholder : ''}
      onBlur={_ => handleBlur}
    />
  );
};
