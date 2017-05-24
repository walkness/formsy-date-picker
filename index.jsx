import React, { Component, PropTypes } from 'react';
import { HOC } from 'formsy-react';
import classNames from 'classnames';
import { default as BaseDatePicker } from 'react-datepicker';
import moment from 'moment';

import InputWrapper from 'Components/Forms/InputWrapper';


class DatePicker extends Component {

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    wrapperClasses: PropTypes.string,
    className: PropTypes.string,
    replaceStatusClass: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    setValue: PropTypes.func.isRequired,
    getValue: PropTypes.func.isRequired,
    isPristine: PropTypes.func.isRequired,
    isValid: PropTypes.func.isRequired,
    getErrorMessage: PropTypes.func.isRequired,
    showRequired: PropTypes.func.isRequired,
    selected: PropTypes.object,
    dateFormat: PropTypes.string,
    datePickerProps: PropTypes.object,
  };

  static defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    onChange: () => {},
    dateFormat: 'YYYY-MM-DD',
  };

  constructor(props, context) {
    super(props, context);
    this.changeValue = this.changeValue.bind(this);
  }

  changeValue(date) {
    const formatted = date && date.format(this.props.dateFormat);
    this.props.setValue(formatted || '');
    this.props.onChange(formatted);
  }

  render() {
    const { className, wrapperClasses, ...wrapperProps } = this.props;
    const { type, name, required, disabled, label, datePickerProps } = this.props;
    const id = `id_${name}`;
    const inputOpts = { id, type, name, required, disabled, ...datePickerProps };

    const value = this.props.getValue();

    return (
      <InputWrapper
        {...wrapperProps}
        id={id}
        label={label}
        className={wrapperClasses}
      >

        <BaseDatePicker
          className={classNames('form-control', className)}
          selected={value && moment(value)}
          onChange={this.changeValue}
          placeholderText={this.props.placeholder || label}
          {...inputOpts}
        />

        <div className='feedback help-block'>
          { this.props.getErrorMessage() }
          { this.props.showRequired() && !this.props.isPristine() ?
            'This field is required.' : null }
        </div>

      </InputWrapper>
    );
  }
}

export default HOC(DatePicker); // eslint-disable-line new-cap
