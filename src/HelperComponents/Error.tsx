import * as React from 'react';

export interface ValidationProps {
  errorMessage?: string;
}

export const ValidationErrorLabeledDiv: React.SFC<ValidationProps> = ({
  errorMessage,
  children,
}) => (
  <div className={errorMessage != null ? 'cast-c-validation-error' : ''}>
    {errorMessage ? <ValidationErrorLabel errorMessage={errorMessage} /> : null}
    {children}
  </div>
);

export const ValidationErrorLabel = ({ errorMessage }: ValidationProps) => (
  <div className="cast-c-validation-error__label">{errorMessage}</div>
);
