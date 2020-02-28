import React, { Component } from 'react';
import {
    AsyncStorage,
    Linking,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux';
import style from './inAppStyle';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import { pushNotificationService } from '../../utility/pushNotificationService';
import { logoutAction } from '../../actions/logoutAction';
import Spinner from '../Common/spinner';
import AlertModal from '../Common/AlertModal';

// const TAB_ICON = require('../../assets/icons/icon_5.png');
// const TAB_ICON_TRANSPARENT = require('../../assets/icons/setting_transparent.png');

class ChooseSubscriptionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planSelected: this.props.navigation.state.params.planSelected,
            showStarterSection: this.props.navigation.state.params.planSelected === 'starter-monthly',
            showMonthlySection: this.props.navigation.state.params.planSelected === 'standard-monthly',
            showStandardSection: this.props.navigation.state.params.planSelected === 'standard-yearly',
            isShowHelpBlock: this.props.navigation.state.params.isShowHelpBlock === true,
            deviceToken: '',
            openAlert: false,
            messageAlert: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params.planSelected) {
            this.setState({
                planSelected: nextProps.navigation.state.params.planSelected ? nextProps.navigation.state.params.planSelected === 'Starter Monthly' ? 'starter-monthly' : nextProps.navigation.state.params.planSelected === 'Standard Monthly' ? 'standard-monthly' : 'standard-yearly' : 'standard-monthly',
                showStarterSection: (nextProps.navigation.state.params.planSelected === 'Starter Monthly') || (nextProps.navigation.state.params.planSelected === 'starter-monthly'),
                showMonthlySection: (nextProps.navigation.state.params.planSelected === 'Standard Monthly') || (nextProps.navigation.state.params.planSelected === 'standard-monthly'),
                showStandardSection: (nextProps.navigation.state.params.planSelected === 'Standard Yearly') || (nextProps.navigation.state.params.planSelected === 'standard-yearly'),
                isShowHelpBlock: this.props.navigation.state.params.isShowHelpBlock === true,
            });
        }
    }

    toggleStarterMonthlySection = () => {
        this.setState({
            showStarterSection: true,
            planSelected: 'starter-monthly',
            showMonthlySection: false,
            showStandardSection: false,
        });
    };

    toggleStandardMonthlySection = () => {
        this.setState({
            showStarterSection: false,
            planSelected: 'standard-monthly',
            showMonthlySection: true,
            showStandardSection: false,
        });
    };

    toggleStandardYearlySection = () => {
        this.setState({
            showStarterSection: false,
            planSelected: 'standard-yearly',
            showMonthlySection: false,
            showStandardSection: true,
        });
    };

    hitlogoutAPI = () => {
        if (this.state.deviceToken === '') {
            pushNotificationService()
                .then((deviceToken) => {
                    this.logout(deviceToken);
                }).catch((error) => {
                    this.showAlert(error);
                });
        } else {
            this.logout();
        }
    };

    logout = (deviceToken) => {
        const { dispatch } = this.props.navigation;
        const body = {
            device_token: deviceToken,
        };
        dispatch(logoutAction(body))
            .then(() => {
                this.removeValueToAsyncStorage();
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    removeValueToAsyncStorage = async () => {
        await AsyncStorage.removeItem(Constant.TOKEN);
        await AsyncStorage.removeItem(Constant.USER_ID);
        await AsyncStorage.removeItem('DEVICE_TOKEN');
        this.navigateToLogIn();
    };

    navigateToLogIn = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToPurchaseScreen = () => {
        this.props.navigation.navigate('PurchaseScreen', { planName: this.state.planSelected, isShowHelpBlock: this.state.isShowHelpBlock, flags: true });
    };

    showAlert = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message
        });
    };

    closeModal = () => {
        this.setState({
            openAlert: false
        });
    };


    render() {
        const { showStarterSection, showMonthlySection, showStandardSection } = this.state;
        return (
            <View style={style.container}>
                <View style={[style.midSection, style.spaceEvenly]}>
                    <View style={{ width: '100%' }}>
                        <Text style={[style.planName, { marginTop: 20 }]}>SUBSCRIPTION PLAN DETAILS:</Text>
                    </View>
                    <TouchableOpacity
                        style={showStarterSection ? style.expandedCards : style.cards}
                        onPress={this.toggleStarterMonthlySection}
                        activeOpacity={1}
                    >
                        <Text style={style.planName}>Starter Monthly - $4.99</Text>
                        {showStarterSection &&
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >
                            <Text style={style.normalText}>Starter Monthly plan includes:</Text>
                            <View style={style.subSection}>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Valid for 1 month</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Only 1 journal will be allowed</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Push notification prompts</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Encrypted security</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Custom entries</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Choose from our journals</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Photos from your phone</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Device and desktop</Text>
                                </View>
                            </View>
                            <View style={style.flexRow}>
                                <Text
                                    onPress={() => Linking.openURL('https://promptlyjournals.com/pages/terms-of-use')}
                                    style={{
                                        color: '#53a3e0',
                                        marginTop: 3
                                    }}
                                >Terms and Conditions
                                </Text>
                                <Text style={commonStyle.linkText}> | </Text>
                                <Text
                                    onPress={() => Linking.openURL('https://promptlyjournals.com/pages/privacy-policy')}
                                    style={{
                                        color: '#53a3e0',
                                        marginTop: 3
                                    }}
                                >Privacy Policy
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={style.purchaseButton}
                                onPress={() => this.navigateToPurchaseScreen()}
                            >
                                <Text style={style.buttonText}>PURCHASE</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={showMonthlySection ? style.expandedCards : style.cards}
                        onPress={this.toggleStandardMonthlySection}
                        activeOpacity={1}
                    >
                        <Text style={style.planName}>Standard Monthly - $9.99</Text>
                        {
                            showMonthlySection &&
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            >
                                <Text style={style.normalText}>Standard Monthly plan includes:</Text>
                                <View style={style.subSection}>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Valid for 1 month</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Unlimited journals will be allowed</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Push notification prompts</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Encrypted security</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Custom entries</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Choose from our journals</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Photos from your phone</Text>
                                    </View>
                                    <View style={style.flexRow}>
                                        <Text style={style.bullet}>{'\u2022'}</Text>
                                        <Text style={style.normalText}>Device and desktop</Text>
                                    </View>
                                </View>
                                <View style={style.flexRow}>
                                    <Text
                                        onPress={() => Linking.openURL('https://promptlyjournals.com/pages/terms-of-use')}
                                        style={{
                                            color: '#53a3e0',
                                            marginTop: 3
                                        }}
                                    >Terms and Conditions
                                    </Text>
                                    <Text style={commonStyle.linkText}> | </Text>
                                    <Text
                                        onPress={() => Linking.openURL('https://promptlyjournals.com/pages/privacy-policy')}
                                        style={{
                                            color: '#53a3e0',
                                            marginTop: 3
                                        }}
                                    >Privacy Policy
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={style.purchaseButton}
                                    onPress={() => this.navigateToPurchaseScreen()}
                                >
                                    <Text style={style.buttonText}>PURCHASE</Text>
                                </TouchableOpacity>
                            </View>}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={showStandardSection ? style.expandedCards : style.cards}
                        onPress={this.toggleStandardYearlySection}
                        activeOpacity={1}
                    >
                        <Text style={style.planName}>Standard Yearly - $99.99</Text>
                        {
                            showStandardSection &&
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >
                            <Text style={style.normalText}>Standard Yearly plan includes:</Text>
                            <View style={style.subSection}>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Valid for 1 Year</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Unlimited journals will be allowed</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Push notification prompts</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Encrypted security</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Custom entries</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Choose from our journals</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Photos from your phone</Text>
                                </View>
                                <View style={style.flexRow}>
                                    <Text style={style.bullet}>{'\u2022'}</Text>
                                    <Text style={style.normalText}>Device and desktop</Text>
                                </View>
                            </View>
                            <View style={style.flexRow}>
                                <Text
                                    onPress={() => Linking.openURL('https://promptlyjournals.com/pages/terms-of-use')}
                                    style={{
                                        color: '#53a3e0',
                                        marginTop: 10
                                    }}
                                >Terms and Conditions
                                </Text>
                                <Text style={[commonStyle.linkText, { marginTop: 7 }]}> | </Text>
                                <Text
                                    onPress={() => Linking.openURL('https://promptlyjournals.com/pages/privacy-policy')}
                                    style={{
                                        color: '#53a3e0',
                                        marginTop: 10
                                    }}
                                >Privacy Policy
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={[style.purchaseButton]}
                                onPress={() => this.navigateToPurchaseScreen()}
                            >
                                <Text style={style.buttonText}>PURCHASE</Text>
                            </TouchableOpacity>
                        </View>}
                    </TouchableOpacity>
                </View>
                {/* <View style={{justifyContent: 'center'}}> */}
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.hitlogoutAPI()}
                    style={{
                        flexDirection: 'row',
                        margin: 0,
                        height: '5%',
                        justifyContent: 'center',
                        // alignItems: 'center',
                        // marginBottom: 0,
                        // alignSelf: ''
                    }}
                >
                    <MaterialIcons name="keyboard-backspace" size={23} color={Constant.TEXT_COLOR} />
                    <Text style={commonStyle.linkText}> Back to Log in</Text>
                </TouchableOpacity>
                {/* </View> */}
                <AlertModal
                    message={this.state.messageAlert}
                    open={!!this.state.openAlert}
                    close={this.closeModal}
                />
                <Spinner
                    animating={this.props.fetching}
                />
            </View>
        );
    }
}

ChooseSubscriptionScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    fetching: state.logoutReducer.fetching,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(ChooseSubscriptionScreen);
