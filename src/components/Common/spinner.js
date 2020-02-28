import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View, Text } from 'react-native';
import Constants from '../../utility/constants';
import styles from './commonStyle';

/* Activity Loader component for iOS and android */
export default class Spinner extends Component {
    render() {
        return (
            this.props.animating && (
                <View style={[styles.spinnerStyle, this.props.backgroundColor && { backgroundColor: this.props.backgroundColor }]}>
                    <ActivityIndicator
                        animating={this.props.animating}
                        size="large"
                        color={this.props.color || Constants.SPINNER_COLOR}
                    />
                    {
                        this.props.loadingText ?
                            <Text style={styles.loadingText}>
                                {this.props.loadingText}
                            </Text> : null
                    }
                </View>
            )
        );
    }
}

Spinner.propTypes = {
    animating: PropTypes.bool.isRequired,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
    loadingText: PropTypes.string,
};

Spinner.defaultProps = {
    color: '',
    backgroundColor: '',
    loadingText: '',
};
