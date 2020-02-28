import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './commonStyle';
import { authorizationAction } from '../../actions/authorizationAction';

export default class SplashScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    componentDidMount() {
        const { dispatch } = this.props.navigation;
        dispatch(authorizationAction());
    }

    render() {
        return (
            <View style={styles.container} />
        );
    }
}

SplashScreen.propTypes = {
    dispatch: PropTypes.func,
    navigation: PropTypes.object,
};

SplashScreen.defaultProps = {
    dispatch: () => {},
    navigation: {},
};
