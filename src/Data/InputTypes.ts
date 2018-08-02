export interface InputType {
  [key: string]: RegExp;
}

export const InputTypesRegex = {
  alphaOnly: /[a-zA-Z]+/g,
  numericOnly: /[\d]+/g,
  numericAndDecimalOnly: /[0-9\.\-]+/g,
  alphaNumericOnly: /[0-9a-zA-Z]+/g,
  alphaNumericAndSpaceOnly: /[0-9a-zA-Z ]+/g,
  alphaAndSpaceOnly: /[a-zA-Z ]+/g,
};
