import React from 'react';
import PropTypes from 'prop-types';
import { Kohana } from 'react-native-textinput-effects';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './commonStyle';

const TextBox = (props) => {
    const {
        placeholder, value, handleText, returnKeyType, secureTextEntry, icon, onSubmitEditing, disabled, defaultValue, maxLength, keyboardType, inputRef, autoCapitalize
    } = props;
    return (
        <Kohana
            ref={inputRef}
            editable={!disabled}
            defaultValue={defaultValue}
            style={[styles.textContainer]}
            inputStyle={[styles.textInput]}
            label={placeholder}
            labelStyle={styles.textBoxLabel}
            autoCapitalize={autoCapitalize || 'none'}
            underlineColorAndroid="transparent"
            onChangeText={handleText}
            returnKeyType={returnKeyType || 'next'}
            value={value}
            onSubmitEditing={onSubmitEditing}
            autoCorrect={false}
            spellCheck={false}
            secureTextEntry={!!secureTextEntry}
            iconClass={MaterialCommunityIcons}
            iconName={icon}
            iconColor="#725f62"
            iconSize={20}
            useNativeDriver
            maxLength={maxLength || null}
            keyboardType={keyboardType || 'default'}
        />

    );
};

export default TextBox;


TextBox.defaultProps = {
    returnKeyType: '',
    secureTextEntry: null,
    icon: '',
    disabled: null,
    defaultValue: '',
    onSubmitEditing: null,
    maxLength: null,
    keyboardType: 'default',
    inputRef: () => {},
    autoCapitalize: 'none'
};

TextBox.propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    handleText: PropTypes.func.isRequired,
    returnKeyType: PropTypes.string,
    secureTextEntry: PropTypes.bool,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
    defaultValue: PropTypes.string,
    onSubmitEditing: PropTypes.func,
    maxLength: PropTypes.number,
    keyboardType: PropTypes.string,
    inputRef: PropTypes.func,
    autoCapitalize: PropTypes.string,
};

