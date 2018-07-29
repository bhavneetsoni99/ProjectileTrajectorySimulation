import * as React from 'react';
import { findIndex } from 'lodash';
import { ValidationErrorLabeledDiv } from './Error';

const styles = require('../css-modules/dropdown.module.css');

export interface Props<T> {
  items: T[];
  allowNullSelection?: boolean;
  selectedItem?: T;
  errorMessage?: string;
  itemRender?: (item: T) => string;
  itemEqual?: (item1: T, item2: T) => boolean;
  onSelection?: (item: T | undefined) => void;
  chooseText?: string;
  errorDecoratingEnabled?: boolean;
}

class DropdownView<T> extends React.Component<Props<T>> {
  public render() {
    const { errorMessage } = this.props;
    if (this.props.errorDecoratingEnabled) {
      return (
        <ValidationErrorLabeledDiv errorMessage={errorMessage}>
          {this.renderSelect()}
        </ValidationErrorLabeledDiv>
      );
    }
    return this.renderSelect();
  }

  private renderSelect() {
    const { selectedItem, items, chooseText = 'Choose One' } = this.props;
    const index = selectedItem
      ? findIndex(this.props.items, item => this.itemsAreEqual(selectedItem, item))
      : -1;
    const NULL_VALUE = '-';
    const value = index > -1 ? String(index) : NULL_VALUE;
    return (
      <select
        className={styles.select}
        value={value}
        onChange={event => {
          this.handleChange(event.currentTarget.value);
        }}
      >
        <option
          disabled={!this.props.allowNullSelection}
          className={styles.selectOption}
          value={NULL_VALUE}
        >
          {chooseText}
        </option>

        {items.map((item, index) => (
          <option className={styles.selectOption} key={index} value={index}>
            {this.itemDescription(item)}
          </option>
        ))}
      </select>
    );
  }

  private itemDescription(item: T): string {
    return this.props.itemRender ? this.props.itemRender(item) : String(item);
  }

  private itemsAreEqual(item1: T, item2: T): boolean {
    return this.props.itemEqual ? this.props.itemEqual(item1, item2) : item1 === item2;
  }

  private handleChange = (value: string) => {
    const { items, onSelection } = this.props;
    const selection: T | undefined = items[value];
    onSelection && onSelection(selection);
  };
}

export default DropdownView;
