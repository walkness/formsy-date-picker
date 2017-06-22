import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import BaseDatePicker from 'react-datepicker';
import moment from 'moment';
import { autobind } from 'core-decorators';

import 'react-datepicker/dist/react-datepicker.css';

import InputWrapper from 'AppComponents/Forms/InputWrapper';
import FormGroup from 'AppComponents/Forms/FormGroup';


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
    onChange: () => {},
    placeholder: null,
    renderFeedback: null,
    selected: null,
    value: null,
  };

  @autobind
  changeValue(date) {
    const { formsy, onChange } = this.props;
    const { setValue } = formsy;
    if (setValue || onChange) {
      const formatted = date && date.format(this.props.dateFormat);
      if (setValue) setValue(formatted || '');
      if (onChange) onChange(formatted);
    }
  }

  render() {
    const {
      value, label, placeholder, className, datePickerProps, dateFormat,
      renderFeedback, onChange, selected, ...inputOpts
    } = this.props;

    return (
      <div>

        <BaseDatePicker
          className={classNames('form-control', className)}
          selected={selected || (value && moment(value))}
          onChange={this.changeValue}
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
