import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { NavigationActions, StackActions } from 'react-navigation';
import { AsyncStorage, Image, Keyboard, Linking, NetInfo, Platform, Text, TouchableOpacity, View, } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CheckBox } from 'react-native-elements';
import PropTypes from 'prop-types';
import commonStyle from '../Common/commonStyle';
import AlertModal from '../Common/AlertModal';
import Constant from '../../utility/constants';
import Spinner from '../../components/Common/spinner';
import TextBox from '../../components/Common/textBox';
import { validateEmail, validateName } from '../../utility/helperComponent';
import { signupAction } from '../../actions/signupAction';
import { pushNotificationService } from '../../utility/pushNotificationService';
import style from '../SettingScreen/settingStyle';
import { mixpanelTrack, setMail, setSignupData } from '../../utility/mixpanelHelperComponent';
import Icons from '../../utility/iconConstant';

class SignUpScreen extends Component {
    static navigationOptions = () => ({
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            deviceToken: '',
            placeholderFlag: true,
            checked: false,
            message: '',
            open: false,
        };
    }

    componentDidMount() {
        this.pushNotifications();
    }

    setValueToAsyncStorage = async (res) => {
        Keyboard.dismiss();
        await AsyncStorage.setItem(Constant.TOKEN, res.token);
        await AsyncStorage.setItem(Constant.USER_ID, res.user.roles[0]._id);
        await AsyncStorage.setItem(Constant.EMAIL, this.state.email.trim());
        this.props.jump(1);
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
            })
            .catch(() => {
            });
    };

    validateSignup = () => {
        const {
            email, password, firstName, lastName
        } = this.state;
        Keyboard.dismiss();
        if (firstName.trim() === '') {
            this.showAlert(Constant.FIRST_NAME_EMPTY);
        } else if (!validateName(firstName.trim())) {
            this.showAlert(Constant.FIRST_NAME_INVALID);
        } else if (lastName.trim() === '') {
            this.showAlert(Constant.LAST_NAME_EMPTY);
        } else if (!validateName(lastName.trim())) {
            this.showAlert(Constant.LAST_NAME_INVALID);
        } else if (email.trim() === '') {
            this.showAlert(Constant.EMAIL_EMPTY);
        } else if (!validateEmail(email.trim())) {
            this.showAlert(Constant.EMAIL_INVALID);
        } else if (password === '') {
            this.showAlert(Constant.PASSWORD_EMPTY);
        } else if (password !== password.replace(/\s/g, '')) {
            this.showAlert(Constant.PASSWORD_INVALID);
        } else if (password.length < 8) {
            this.showAlert(Constant.PASSWORD_LENGTH_INVALID);
        } else if (this.state.checked === false) {
            this.showAlert(Constant.CHECKBOX);
        } else {
            return true;
        }
        return false;
    };

    handleSubmit = () => {
        if (this.validateSignup()) {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        this.hitSignUpAPI();
                    } else {
                        this.showAlert(Constant.NETWORK_ERROR);
                    }
                });
        }
    };

    hitSignUpAPI = () => {
        if (this.state.deviceToken === '') {
            pushNotificationService()
                .then((deviceToken) => {
                    this.setState({
                        deviceToken
                    }, () => this.APICallForSignup());
                })
                .catch(() => {
                });
        } else {
            this.APICallForSignup();
        }
    };

    APICallForSignup = () => {
        let trimFirstName = this.state.firstName.trim();
        trimFirstName = trimFirstName.replace(/\s+/g, ' ');
        let trimLastName = this.state.lastName.trim();
        trimLastName = trimLastName.replace(/\s+/g, ' ');
        const body = {
            first_name: trimFirstName,
            last_name: trimLastName,
            email: this.state.email.trim(),
            password: this.state.password,
            device_token: this.state.deviceToken,
            device_os: Platform.OS === 'android' ? 'android' : 'ios',
        };
        const { dispatch } = this.props.data.navigation;
        dispatch(signupAction(body))
            .then(res => {
                const data = {
                    firstName: trimFirstName,
                    lastName: trimLastName,
                };
                setMail(this.state.email);
                setSignupData(data, this.state.email.trim());
                mixpanelTrack('Registered', this.state.email.trim());
                mixpanelTrack(`Registered ${Platform.OS === 'android' ? 'From Google' : 'From Apple'}`, this.state.email.trim());
                this.setValueToAsyncStorage(res);
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    toggleChecked = () => {
        this.setState({ checked: !this.state.checked });
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    navigateToIndex = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'SelectSubscriptionPlanScreen' })
            ]
        });
        this.props.data.navigation.dispatch(reset);
    };

    showAlert = (message) => {
        this.setState({
            open: true,
            message
        });
    };

    render() {
        const {
            email, password, firstName, lastName, placeholderFlag
        } = this.state;
        return (
            <View style={[commonStyle.container, commonStyle.centerAndBackgroundWhite]}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <View style={commonStyle.contentCenters}>
                        <View>
                            <Image
                                source={Icons.USERIMAGE}
                                style={commonStyle.iconStyles}
                            />
                        </View>
                        <View style={commonStyle.headerBox}>
                            <Text style={commonStyle.subHeadingText}>First things first...</Text>
                            <Text style={[commonStyle.headerTextStyle, commonStyle.headerFontSize]}>CREATE AN ACCOUNT</Text>
                        </View>
                        <TextBox
                            placeholder={placeholderFlag || firstName === '' ? 'First Name' : ''}
                            handleText={this.handleTextChange('firstName')}
                            value={firstName}
                            maxLength={30}
                            icon="account"
                            onSubmitEditing={() => {
                                this.lastName.focus();
                            }}

                        />
                        <TextBox
                            inputRef={el => { this.lastName = el; }}
                            placeholder={placeholderFlag || lastName === '' ? 'Last Name' : ''}
                            handleText={this.handleTextChange('lastName')}
                            value={lastName}
                            maxLength={30}
                            icon="account"
                            onSubmitEditing={() => {
                                this.email.focus();
                            }}
                        />
                        <TextBox
                            inputRef={el => { this.email = el; }}
                            placeholder={placeholderFlag || email === '' ? 'Email' : ''}
                            handleText={this.handleTextChange('email')}
                            value={email}
                            icon="email"
                            onSubmitEditing={() => {
                                this.password.focus();
                            }}
                        />
                        <TextBox
                            inputRef={el => { this.password = el; }}
                            placeholder={placeholderFlag || password === '' ? 'Password' : ''}
                            handleText={this.handleTextChange('password')}
                            value={password}
                            maxLength={16}
                            icon="key-variant"
                            secureTextEntry
                            returnKeyType="go"
                            onSubmitEditing={() => {
                                Keyboard.dismiss();
                            }}
                        />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                        >
                            <CheckBox
                                checked={this.state.checked}
                                checkedColor="#736063"
                                uncheckedColor="#736063"
                                containerStyle={{
                                    backgroundColor: '#fff',
                                    borderWidth: 0,
                                    padding: 0,
                                    marginLeft: 10,
                                    marginRight: 0
                                }}
                                onPress={() => this.toggleChecked()}
                            />
                            <Text style={commonStyle.termsAndConditions}>I accept the
                                <Text
                                    onPress={() => Linking.openURL(Constant.TERMSANDCONDITIONS)}
                                    style={{ color: '#53a3e0' }}
                                > Terms and Conditions
                                </Text>{' and '}
                                <Text
                                    onPress={() => Linking.openURL(Constant.PRIVACY_POLICIES)}
                                    style={{ color: '#53a3e0' }}
                                > Privacy Policies
                                </Text>
                            </Text>
                        </View>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={this.navigateToIndex}
                            style={{
                                flexDirection: 'row',
                                margin: 20,
                                marginTop: 0,
                                marginBottom: 0,
                            }}
                        >
                            <MaterialIcons name="keyboard-backspace" size={23} color={Constant.TEXT_COLOR} />
                            <Text style={commonStyle.linkText}> Back to Index</Text>
                        </TouchableOpacity>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                        >
                            <TouchableOpacity
                                style={[style.passcodeButtonStyle, { marginVertical: 10 }]}
                                activeOpacity={0.8}
                                onPress={this.handleSubmit}
                            >
                                <Text style={[commonStyle.linkText, {
                                    fontSize: 18,
                                    padding: 10,
                                }]}
                                >NEXT
                                </Text>
                            </TouchableOpacity>
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

SignUpScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    jump: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object,
    data: PropTypes.object.isRequired,
};

SignUpScreen.defaultProps = {
    navigation: {},
};

const mapStateToProps = state => ({
    fetching: state.signupReducer.fetching || state.subscriptionPlanReducer.fetching || state.savePurchaseDetailsReducer.fetching,
    subscriptionPlanData: state.subscriptionPlanReducer.subscriptionPlanData,
    savePurchaseDetailsData: state.savePurchaseDetailsReducer.savePurchaseDetailsData,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(SignUpScreen);
