import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-native-datepicker';
import styles from './commonStyle';

const CALENDER_ICON = require('../../assets/icons/calendar_white.png');
const CALENDER_ICON_COLOR = require('../../assets/icons/calender-icon.png');

const DatePickerBox = (props) => {
    const {
        placeholder, value, handleText, disabled, calendarIcon, customStyle
    } = props;
    return (
        <DatePicker
            style={[styles.datePickerContainer, customStyle]}
            date={value}
            mode="date"
            placeholder={placeholder}
            format="MM-DD-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            disabled={disabled}
            iconSource={calendarIcon === 'color' ? CALENDER_ICON_COLOR : CALENDER_ICON}
            customStyles={{
                dateInput: styles.datePickerInput,
                dateText: styles.textInput,
                placeholderText: [styles.textBoxLabel],
                dateIcon: { height: 45, width: 45 }
            }}
            onDateChange={handleText}
        />
    );
};

export default DatePickerBox;

DatePickerBox.propTypes = {
    disabled: PropTypes.bool,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleText: PropTypes.func.isRequired,
    calendarIcon: PropTypes.string,
    customStyle: PropTypes.object
};
DatePickerBox.defaultProps = {
    disabled: false,
    calendarIcon: '',
    customStyle: {}
};
