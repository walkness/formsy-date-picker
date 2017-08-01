import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BaseDatePicker from 'react-datepicker';
import { isDayDisabled } from 'react-datepicker/lib/date_utils';
import moment from 'moment';
import { autobind } from 'core-decorators';

import 'react-datepicker/dist/react-datepicker.css';

import InputWrapper from 'AppComponents/Forms/InputWrapper';
import FormGroup from 'AppComponents/Forms/FormGroup';

export const dateFormats = [
  'MM-DD-YYYY',
  'MM-DD-YY',
  'M-D-YYYY',
  'M-D-YY',
  'MMMM D, YYYY',
  'YYYY-MM-DD',
];


class DatePicker extends Component {

  static propTypes = {
    className: PropTypes.string,
    dateFormat: PropTypes.string,
    datePickerProps: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    label: PropTypes.string,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    renderFeedback: PropTypes.func,
    selected: PropTypes.instanceOf(moment),
    value: PropTypes.string,
    formsy: PropTypes.shape({
      setValue: PropTypes.func,
    }),
  };

  static defaultProps = {
    className: '',
    dateFormat: 'YYYY-MM-DD',
    datePickerProps: {},
    formsy: null,
    label: null,
    onChange: null,
    placeholder: null,
    renderFeedback: null,
    selected: null,
    value: null,
  };

  @autobind
  changeValue(value) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue || onChange) {
      if (setValue) setValue(value || '');
      if (onChange) onChange(value);
    }
  }

  @autobind
  handleDateChange(date) {
    this.changeValue(date && date.format(this.props.dateFormat));
  }

  @autobind
  handleRawChange(e) {
    const value = e.target.value;
    const date = moment(value, dateFormats);
    if (date.isValid() && !isDayDisabled(date, this.props.datePickerProps)) {
      this.changeValue(date.format(this.props.dateFormat));
    } else {
      this.changeValue(value);
    }
  }

  render() {
    const {
      value: originalValue, label, placeholder, className, datePickerProps, dateFormat,
      renderFeedback, onChange, selected, formsy, ...inputOpts
    } = this.props;

    const date = originalValue && moment(originalValue, dateFormats);
    let value = date;
    if (date && !date.isValid()) {
      value = null;
    }

    return (
      <div>

        <BaseDatePicker
          className={classNames('form-control', className)}
          selected={selected || value}
          onChange={this.handleDateChange}
          onChangeRaw={this.handleRawChange}
          placeholderText={placeholder || label}
          {...inputOpts}
          {...datePickerProps}
        />

        { renderFeedback && renderFeedback() }

      </div>
    );
  }
}

export default InputWrapper(DatePicker, FormGroup);
