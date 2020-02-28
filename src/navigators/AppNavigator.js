import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { BackHandler, NetInfo } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppNavigator } from './Root';
import { checkNetworkAction } from '../actions/checkNetworkAction';
import { zendeskInitialize } from '../utility/zendesk-utils';

class AppWithNavigationState extends Component {
    componentDidMount() {
        zendeskInitialize();
        BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
        NetInfo.isConnected.addEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
        NetInfo.isConnected.removeEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange
        );
    }

    /**
     * Method calls on android hardware back press.
     * Dispatched to previous screen if available.
     */
    onBackPress = () => {
        const { dispatch, nav } = this.props;
        if (nav.index === 0) {
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

    /**
     * Method to check network connectivity.
     * @param isConnected
     */
    handleFirstConnectivityChange = (isConnected) => {
        const { dispatch } = this.props;
        dispatch(checkNetworkAction(isConnected));
    };

    render() {
        return (
            <AppNavigator />
        );
    }
}

AppWithNavigationState.propTypes = {
    dispatch: PropTypes.func.isRequired,
    nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
