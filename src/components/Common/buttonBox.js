import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, Text, View } from 'react-native';
import styles from './commonStyle';

const ButtonBox = (props) => {
    const {
        buttonText, handleSubmit, disabled, isPillShapeStyle, isPillShapeRegisterStyle, isPurple
    } = props;
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled}
            onPress={handleSubmit}
            style={isPillShapeStyle === true ? styles.pillShapeButtonStyle : isPillShapeRegisterStyle === true ? styles.pillShapeRegisterButtonStyle : isPurple === true ? styles.isPurple : styles.buttonBox}
        >
            <View style={styles.buttonContent}>
                <Text style={isPurple ? styles.isPurpleText : styles.buttonText}>{buttonText}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default ButtonBox;

ButtonBox.propTypes = {
    buttonText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func,
    disabled: PropTypes.bool,
    isPillShapeStyle: PropTypes.bool,
    isPillShapeRegisterStyle: PropTypes.bool,
    isPurple: PropTypes.bool,
};

ButtonBox.defaultProps = {
    handleSubmit: () => {},
    disabled: false,
    isPillShapeStyle: false,
    isPillShapeRegisterStyle: false,
    isPurple: false,
};
