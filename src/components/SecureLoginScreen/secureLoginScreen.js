import React, { Component } from 'react';
import { AsyncStorage, Image, Keyboard, NetInfo, Text, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import PropTypes from 'prop-types';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import Spinner from '../../components/Common/spinner';
import TextBox from '../../components/Common/textBox';
import { secureLoginAction } from '../../actions/secureLoginAction';
import style from '../SettingScreen/settingStyle';
import { logoutAction } from '../../actions/logoutAction';
import AlertModal from '../Common/AlertModal';
import { validateNumber } from '../../utility/helperComponent';
import { generatePasscodeAction } from '../../actions/generatePasscodeAction';
import { mixpanelTrack } from '../../utility/mixpanelHelperComponent';

const LOGO = require('../../assets/logo.png');

class SecureLoginScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            passcode: '',
            open: false,
            message: '',
            email: '',
        };
    }

    componentDidMount() {
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrack('Dashboard View', this.state.email.trim()));
        });
    };

    /**
     * Method for navigating to Dashboard Screen.
     */
    navigateToDashboard = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'DashboardScreenNavigator',
                    // params: {showHelpBlock: res.user.isShowHelpBlock}
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    /**
     * Method to accept input values from TextInput as object.
     * @param field
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    navigateToChooseSubscriptionScreen = () => {
        Keyboard.dismiss();
        // const { navigate } = this.props.navigation;
        // navigate('ChooseSubscriptionScreen');
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'ChooseSubscriptionScreen',
                    params: { planSelected: 'standard-monthly' }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        const { passcode } = this.state;
        if (passcode === '') {
            this.showAlert(Constant.PASSCODE_EMPTY);
        } else if (passcode !== passcode.replace(/\s/g, '')) {
            this.showAlert(Constant.PASSCODE_SPACE_INVALID);
        } else if (!validateNumber(passcode.trim())) {
            this.showAlert(Constant.PASSCODE_INVALID);
        } else if (passcode.length !== 4) {
            this.showAlert(Constant.PASSCODE_LENGTH_INVALID);
        } else {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        this.hitSecureLoginAPI();
                    } else {
                        this.showAlert(Constant.NETWORK_ERROR);
                    }
                });
        }
    };

    hitSecureLoginAPI = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            passcode: this.state.passcode.trim(),
        };
        dispatch(secureLoginAction(body))
            .then(res => {
                if (res.user.isFirstTimeSubscriptionComplete !== true) {
                    this.navigateToChooseSubscriptionScreen();
                } else {
                    this.getEmail();
                    this.navigateToDashboard();
                }
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    handlePasscode = () => {
        Keyboard.dismiss();
        this.setState({ passcode: '' });
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) { this.hitGeneratePasscodeAPI(); } else {
                this.showAlert(Constant.NETWORK_ERROR);
            }
        });
    };

    hitGeneratePasscodeAPI = () => {
        const { dispatch } = this.props.navigation;
        const body = '';
        dispatch(generatePasscodeAction(body))
            .then(res => {
                this.showAlert(res.message);
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    logout = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            device_token: this.state.deviceToken,
        };
        dispatch(logoutAction(body))
            .then(res => {
                this.removeValueToAsyncStorage(res);
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    removeValueToAsyncStorage = async () => {
        await AsyncStorage.removeItem(Constant.TOKEN);
        await AsyncStorage.removeItem(Constant.USER_ID);
        await AsyncStorage.removeItem('DEVICE_TOKEN');
        this.navigateToLogin();
    };

    navigateToLogin = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'LoginScreen' })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToForgotPasscode = () => {
        Keyboard.dismiss();
        const { navigate } = this.props.navigation;
        this.setState({
            passcode: ''
        });
        navigate('ForgotPasscodeScreen');
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    showAlert = (message) => {
        this.setState({
            open: true,
            message
        });
    };

    render() {
        const { passcode } = this.state;
        return (
            <View style={commonStyle.container}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <View style={commonStyle.centerContainer}>
                        <View>
                            <Image
                                source={LOGO}
                                style={commonStyle.iconStyle}
                            />
                        </View>
                        <View style={commonStyle.contentContainer}>
                            <View style={commonStyle.headerBox}>
                                <Text style={commonStyle.headerTextStyle}>Enter Passcode</Text>
                            </View>
                            <TextBox
                                inputRef={el => { this.passcode = el; }}
                                placeholder="Passcode"
                                handleText={this.handleTextChange('passcode')}
                                value={passcode}
                                keyboardType="numeric"
                                maxLength={4}
                                icon="key-variant"
                                returnKeyType="go"
                                secureTextEntry
                                onSubmitEditing={() => {
                                    this.handleSubmit();
                                }}
                            />
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.handlePasscode}
                                    style={commonStyle.linkPasscodeContainer}
                                >
                                    <View style={commonStyle.linkPasscodeContent}>
                                        <Text style={commonStyle.linkText}>Need Your Passcode?</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly'
                            }}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.logout}
                                    style={style.passcodeButtonStyle}
                                >
                                    <Text style={[commonStyle.linkText, {
                                        fontSize: 20,
                                        paddingVertical: 10
                                    }]}
                                    >Sign In
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.handleSubmit}
                                    style={style.passcodeButtonStyle}
                                >
                                    <Text style={[commonStyle.linkText, {
                                        fontSize: 20,
                                        paddingVertical: 10
                                    }]}
                                    >Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
                <Spinner
                    animating={this.props.fetching}
                />
            </View>
        );
    }
}

SecureLoginScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    fetching: state.secureLoginReducer.fetching || state.logoutReducer.fetching || state.generatePasscodeReducer.fetching,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(SecureLoginScreen);
