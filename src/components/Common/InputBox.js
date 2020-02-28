import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import styles from './commonStyle';

const TextColor = '#736063';

export default class InputBox extends Component {
    render() {
        return (
            <TextInput
                ref={this.props.textInputRef}
                {...this.props}
                returnKeyType="next"
                placeholderTextColor={TextColor}
                style={[styles.inputText, this.props.customStyle]}
                autoCorrect
                spellCheck={false}
                scrollEnabled={false}
                bounces={false}
                showsVerticalScrollIndicator={false}
                autoCapitalize="none"
                underlineColorAndroid="transparent"
                maxLength={(this.props.length) || 30}
            />
        );
    }
}

InputBox.propTypes = {
    customStyle: PropTypes.object,
    length: PropTypes.number,
};

InputBox.defaultProps = {
    customStyle: {},
    length: 30
};
