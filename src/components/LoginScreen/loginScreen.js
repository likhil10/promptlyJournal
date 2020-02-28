import React, { Component } from 'react';
import {
    AsyncStorage,
    Image,
    Keyboard,
    NetInfo,
    Platform,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import commonStyle from '../Common/commonStyle';
import Constant from '../../utility/constants';
import Spinner from '../../components/Common/spinner';
import TextBox from '../../components/Common/textBox';
import AlertModal from '../Common/AlertModal';
import ButtonBox from '../../components/Common/buttonBox';
import { mixpanelTrack, incrementLoginCount } from '../../utility/mixpanelHelperComponent';
import { validateEmail } from '../../utility/helperComponent';
import { loginAction } from '../../actions/loginAction';
import { pushNotificationService } from '../../utility/pushNotificationService';

const LOGO = require('../../assets/logo.png');

class LoginScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            deviceToken: '',
            open: false,
            message: '',
        };
    }


    componentDidMount() {
        this.pushNotifications();
    }

    setValueToAsyncStorage = async (res) => {
        const { user: { isFirstTimeSubscriptionComplete } } = res;
        await AsyncStorage.setItem(Constant.TOKEN, res.token);
        await AsyncStorage.setItem(Constant.USER_ID, res.user.roles[0]._id);
        await AsyncStorage.setItem(Constant.EMAIL, this.state.email.trim());
        if (isFirstTimeSubscriptionComplete !== true) {
            this.navigateToChooseSubscriptionScreen();
        } else {
            this.navigateToDashboard(res);
        }
    };


    /**
     * Method for navigating to SignUp Screen.
     */
    navigateToSignUp = () => {
        Keyboard.dismiss();
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'SelectSubscriptionPlanScreen',
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    /**
     * Method for navigating to ForgotPassword Screen.
     */
    navigateToForgotPassword = () => {
        Keyboard.dismiss();
        const { navigate } = this.props.navigation;
        this.setState({
            email: '',
            password: ''
        });
        navigate('ForgotPasswordScreen');
    };

    /**
     * Method for navigating to Dashboard Screen.
     */
    navigateToDashboard = (res) => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'DashboardScreenNavigator',
                    params: { showHelpBlock: res.user.isShowHelpBlock }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
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
        if (this.state.email.trim() === '') {
            this.setState({
                open: true,
                message: Constant.EMAIL_EMPTY
            });
        } else if (!validateEmail(this.state.email.trim())) {
            this.setState({
                open: true,
                message: Constant.EMAIL_INVALID
            });
        } else if (this.state.password.trim() === '') {
            this.setState({
                open: true,
                message: Constant.PASSWORD_EMPTY
            });
        } else if (this.state.password.trim().length < 8) {
            this.setState({
                open: true,
                message: Constant.PASSWORD_LENGTH_INVALID
            });
        } else {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        this.hitLoginAPI();
                    } else {
                        this.setState({
                            open: true,
                            message: Constant.NETWORK_ERROR
                        });
                    }
                });
        }
    };

    hitLoginAPI = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            email: this.state.email.trim(),
            password: this.state.password.trim(),
            device_token: this.state.deviceToken,
            device_os: Platform.OS === 'android' ? 'android' : 'ios',
        };
        dispatch(loginAction(body))
            .then(res => {
                mixpanelTrack('Logged in', this.state.email.trim());
                mixpanelTrack(`Logged in ${Platform.OS === 'android' ? 'From Google' : 'From Apple'}`, this.state.email.trim());
                incrementLoginCount(this.state.email.trim());
                this.setValueToAsyncStorage(res);
            })
            .catch(err => {
                this.setState({
                    open: true,
                    message: err
                });
            });
    };

    closeModal = () => {
        this.setState({
            open: false
        });
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

    /**
     * Method to receive notification
     */
    pushNotifications = () => {
        pushNotificationService()
            .then((deviceToken) => {
                this.setState({
                    deviceToken
                });
                AsyncStorage.setItem('DEVICE_TOKEN', deviceToken);
            });
    };

    render() {
        const { email, password } = this.state;
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
                                <Text style={commonStyle.headerTextStyle}>LOG IN</Text>
                            </View>
                            <TextBox
                                placeholder="Email"
                                handleText={this.handleTextChange('email')}
                                value={email}
                                icon="email"
                                onSubmitEditing={() => {
                                    this.password.focus();
                                }}
                            />
                            <TextBox
                                inputRef={el => { this.password = el; }}
                                placeholder="Password"
                                handleText={this.handleTextChange('password')}
                                value={password}
                                maxLength={16}
                                icon="key-variant"
                                returnKeyType="go"
                                onSubmitEditing={() => {
                                    this.handleSubmit();
                                }}
                                secureTextEntry
                            />
                            <View style={[commonStyle.flexDirectionRow, { marginLeft: 18 }]}>
                                <ButtonBox
                                    buttonText="Login"
                                    handleSubmit={this.handleSubmit}
                                    isPillShapeStyle
                                />
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.navigateToForgotPassword}
                                    style={commonStyle.linkContainer}
                                >
                                    <View style={commonStyle.linkContent}>
                                        <Text style={commonStyle.linkText}>Forgot Your Password?</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            {/* Subscription Code */}
                            <Text style={[commonStyle.textStyle, { fontWeight: 'bold', color: '#736063', paddingLeft: 10 }]}>New customer?</Text>
                            {/* <Text style={commonStyle.textStyle}>{Constant.SIGNUP_TEXT}</Text> */}
                            <View style={[commonStyle.flexDirectionRow, { marginLeft: 18 }]}>
                                <ButtonBox
                                    buttonText="Register"
                                    handleSubmit={this.navigateToSignUp}
                                    isPillShapeRegisterStyle
                                />
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

LoginScreen.propTypes = {
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    fetching: state.loginReducer.fetching,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(LoginScreen);
