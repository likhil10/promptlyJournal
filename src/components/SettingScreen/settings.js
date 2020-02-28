import React, { Component } from 'react';
import {
    AsyncStorage,
    Image,
    Keyboard,
    Linking,
    NetInfo,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import KeyboardAwareScrollView from 'react-native-keyboard-aware-scrollview/src/KeyboardAwareScrollView';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import { connect } from 'react-redux';
import Rate, { AndroidMarket } from 'react-native-rate';
import style from './settingStyle';
import commonStyle from '../Common/commonStyle';
import Spinner from '../../components/Common/spinner';
import ProfileScreen from './profileScreen';
import PushNotificationSettings from './pushNotificationSettings';
import SubscriptionPlan from './subscriptionPlan';
import AuthorScreen from './authorsScreen';
import {
    validateProfileData,
    validatePushSettingData
} from './validateData';
import { saveProfileInfoAction } from '../../actions/saveProfileScreenAction';
import { fetchProfileDetails } from '../../actions/fetchProfileDetailsAction';
import { savePushSettingsAction } from '../../actions/savePushSettingsAction';
import { logoutAction } from '../../actions/logoutAction';
import Constant from '../../utility/constants';
import { pushNotificationService } from '../../utility/pushNotificationService';
import AlertModal from '../Common/AlertModal';
import QuestionModal from '../Common/questionModal';
import { unsubscribeAction } from '../../actions/unsubscribeAction';
import { referralAction } from '../../actions/referralAction';
import { subscriptionPlanAction } from '../../actions/subscriptionPlanAction';
import { usPhoneNumberFormat } from '../../utility/helperComponent';
import {
    mixpanelSetProperties,
    mixpanelTrack
} from '../../utility/mixpanelHelperComponent';
import { zendeskHelpCenter, zendeskIdentiy } from '../../utility/zendesk-utils';
import ReferralModal from '../Common/referralModal';

const TAB_ICON = require('../../assets/icons/icon_5.png');
const TAB_ICON_TRANSPARENT = require('../../assets/icons/setting_transparent.png');

class Setting extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: () => (
            <Image
                source={!navigation.isFocused() ? TAB_ICON_TRANSPARENT : TAB_ICON}
                style={commonStyle.tabIconStyle}
            />
        ),

    });

    constructor(props) {
        super(props);
        this.state = {
            activeScreen: '',
            firstName: '',
            lastName: '',
            emailId: '',
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            oldPasscode: '',
            newPasscode: '',
            deviceToken: '',
            billingAddressOne: '',
            billingAddressTwo: '',
            billingCountry: '',
            billingCity: '',
            billingState: '',
            billingZipCode: '',
            billingContactNo: '',
            shippingAddressOne: '',
            shippingAddressTwo: '',
            shippingCountry: '',
            shippingCity: '',
            shippingState: '',
            shippingZipCode: '',
            shippingContactNo: '',
            settingPageInfo: '',
            subscriptionPlan: '',
            frequencyTimes: '',
            frequencyTimesId: '',
            frequencyPeriods: '',
            frequencyPeriodsId: '',
            renderDays: [],
            renderTime: [],
            planId: '',
            planName: '',
            amount: '',
            frequency: '',
            open: '',
            message: '',
            lastFour: '',
            type: '',
            method: '',
            email: '',
            timeZoneValue: '',
            openQuestion: false,
            openReferralModal: false,
            shareLink: '',
            shareContent: false,
            shareMessage: '',
            referralCode: '',
            countryCodes: []
        };
    }
    componentDidMount() {
        const { dispatch } = this.props.navigation;
        dispatch(fetchProfileDetails())
            .then(res => {
                this.handleFetchResponse(res);
                zendeskIdentiy(res.profileInfo.email, res.profileInfo.firstName);
            })
            .catch(() => {
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state) {
            if (nextProps.navigation.state.params !== undefined) {
                if (nextProps.navigation.state.params.shareContent && this.state.shareContent !== nextProps.navigation.state.params.shareContent) {
                    this.setState({
                        shareContent: nextProps.navigation.state.params.shareContent,
                    }, () => this.openReferralModal());
                } else if (nextProps.navigation.state.params.activeScreen) {
                    this.setState({ activeScreen: nextProps.navigation.state.params.activeScreen });
                }
            }
        }
    }

    hitFetchProfileDetails = () => {
        const { dispatch } = this.props.navigation;
        dispatch(fetchProfileDetails())
            .then(res => {
                this.handleFetchResponse(res);
            })
            .catch(() => {
            });
    };

    handleFetchResponse = (res) => {
        const { renderDays, renderTime } = this.state;
        const {
            profileInfo, profileInfo: { billingInfo, countryCodes }, subscriptionPlan, profileInfo: { shippingInfo }, paymentInfo
        } = res;
        res.pushNotificationSetting.availableDaysOfWeek.forEach((value) => {
            if (value.isSelect) {
                renderDays.push({ day_id: value._id });
            }
        }, this.setState({
            renderDays
        }));

        res.pushNotificationSetting.availableTimesOfDay.forEach((value) => {
            if (value.isSelect) {
                renderTime.push({ time_id: value._id });
            }
        }, this.setState({
            renderTime
        }));

        res.pushNotificationSetting.frequencyPeriods.forEach((value) => {
            if (value.isSelect) {
                this.setState({
                    frequencyPeriods: value.name,
                    frequencyPeriodsId: value._id
                });
            }
        });

        res.pushNotificationSetting.frequencyTimes.forEach((value) => {
            if (value.isSelect) {
                this.setState({
                    frequencyTimes: value.name,
                    frequencyTimesId: value._id
                });
            }
        });

        this.setState({
            type: paymentInfo.type,
            lastFour: paymentInfo.lastFour,
            subscriptionPlan: res.subscriptionPlan ? res.subscriptionPlan : '',
            settingPageInfo: res,
            firstName: (profileInfo) ? profileInfo.firstName : '',
            lastName: (profileInfo) ? profileInfo.lastName : '',
            emailId: (profileInfo) ? profileInfo.email : '',
            billingAddressOne: (billingInfo) ? billingInfo.address1 : '',
            billingAddressTwo: (billingInfo) ? billingInfo.address2 : '',
            billingCountry: (billingInfo) ? billingInfo.country : '',
            billingCity: (billingInfo) ? billingInfo.city : '',
            billingState: (billingInfo) ? billingInfo.state : '',
            billingZipCode: (billingInfo) ? billingInfo.zipcode : '',
            billingContactNo: (billingInfo) ? usPhoneNumberFormat(billingInfo.contactNumber) : '',
            shippingAddressOne: (shippingInfo) ? shippingInfo.address1 : '',
            shippingAddressTwo: (shippingInfo) ? shippingInfo.address2 : '',
            shippingCountry: (shippingInfo) ? shippingInfo.country : '',
            shippingCity: (shippingInfo) ? shippingInfo.city : '',
            shippingState: (shippingInfo) ? shippingInfo.state : '',
            shippingZipCode: (shippingInfo) ? shippingInfo.zipcode : '',
            shippingContactNo: (shippingInfo) ? usPhoneNumberFormat(shippingInfo.contactNumber) : '',
            planId: (subscriptionPlan) ? subscriptionPlan.planId : '',
            planName: (subscriptionPlan) ? subscriptionPlan.planName : '',
            amount: (subscriptionPlan) ? subscriptionPlan.amount : '',
            frequency: (subscriptionPlan) ? subscriptionPlan.frequency : '',
            timeZoneValue: (res.pushNotificationSetting.timeZone) ? res.pushNotificationSetting.timeZone : '',
            countryCodes
        });
    };

    handleTextChange = field => (text) => {
        let textValue = text;
        if (field === 'billingContactNo') {
            textValue = usPhoneNumberFormat(text);
            this.setState({
                [field]: textValue
            });
        } else if (field === 'shippingContactNo') {
            textValue = usPhoneNumberFormat(text);
            this.setState({
                [field]: textValue
            });
        } else {
            this.setState({
                [field]: textValue
            });
        }
    };

    selectDropDownCountryData = (rowData, field) => {
        this.setState({
            [field]: rowData[0]
        });
    };

    selectDropDownData = (rowId, rowData, selectedName, selectedId) => {
        this.setState({
            [selectedName]: rowData.name,
            [selectedId]: rowData._id
        });
    };

    selectDropDown = (rowId, rowData, selectedName) => {
        this.setState({
            [selectedName]: rowData
        });
    };

    handleCheckboxPress = (value) => {
        const { renderDays } = this.state;
        if (renderDays.map((e) => e.day_id)
            .indexOf(value._id) === -1) {
            renderDays.push({ day_id: value._id });
            this.setState({
                renderDays
            });
        } else {
            renderDays.splice(renderDays.map((e) => e.day_id)
                .indexOf(value._id), 1);
            this.setState({
                renderDays
            });
        }
    };

    handleTimeCheckboxPress = (value) => {
        const { renderTime } = this.state;
        if (renderTime.map((e) => e.time_id)
            .indexOf(value._id) === -1) {
            renderTime.push({ time_id: value._id });
            this.setState({
                renderTime
            });
        } else {
            renderTime.splice(renderTime.map((e) => e.time_id)
                .indexOf(value._id), 1);
            this.setState({
                renderTime
            });
        }
    };

    handleAccordion = (value) => {
        this.setState({
            activeScreen: (this.state.activeScreen !== value) ? value : ''
        });
    };

    APICallToSubscribe = (planId) => {
        const body = {
            nonce: '',
            plan_id: planId,
            discount_id: ''
        };
        this.setState({
            planId,
        });
        const { dispatch } = this.props.navigation;
        dispatch(subscriptionPlanAction(body))
            .then(res => {
                this.setState({
                    open: true,
                    message: res.message,
                    planId: res.planData.planId,
                    planName: res.planData.planName,
                    amount: res.planData.amount,
                    frequency: res.planData.frequency,
                });
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    saveProfileInformation = () => {
        const { dispatch } = this.props.navigation;
        const data = validateProfileData(this.state);
        Keyboard.dismiss();
        if (!data.flag) {
            this.showAlert(data.msg);
        } else {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        dispatch(saveProfileInfoAction(data.msg))
                            .then(() => {
                                mixpanelTrack('Profile Updated', this.state.emailId.trim());
                                mixpanelSetProperties({
                                    'Billing Address': `${data.msg.user.billing_info.address1} ${data.msg.user.billing_info.address2}, ${data.msg.user.billing_info.city}, ${data.msg.user.billing_info.state}, ${data.msg.user.billing_info.country} - ${data.msg.user.billing_info.zipcode}`,
                                    'Contact Number': data.msg.user.billing_info.contactNumber,
                                    'Shipping Address': `${data.msg.user.billing_info.address1} ${data.msg.user.billing_info.address2}, ${data.msg.user.billing_info.city}, ${data.msg.user.billing_info.state}, ${data.msg.user.billing_info.country} - ${data.msg.user.billing_info.zipcode}`,
                                });
                                this.setState({
                                    activeScreen: '',
                                    oldPassword: '',
                                    newPassword: '',
                                    confirmPassword: '',
                                    newPasscode: '',
                                    oldPasscode: '',
                                    selectedTimeZone: '',
                                }, () => {
                                    this.showAlert(Constant.PROFILE_UPDATE_SUCCESS);
                                });
                            })
                            .catch(err => {
                                this.showAlert(err);
                            });
                    } else {
                        this.showAlert(Constant.NETWORK_ERROR);
                    }
                });
        }
    };

    selectTimeZone = (selectedTimeZone) => {
        this.setState({
            selectedTimeZone
        });
    };

    showZendeskHelpCenter = () => {
        zendeskHelpCenter();
    };

    navigateToOrderScreen = () => {
        this.props.navigation.navigate('OrderScreen');
    };

    validatePushNotificationData = () => {
        const {
            renderDays, renderTime, frequencyPeriodsId, frequencyTimesId, timeZoneValue
        } = this.state;
        if (frequencyTimesId.trim() === '') {
            this.showAlert(Constant.INVALID_PUSH_NOTIFICATION_FREQUENCY);
        } else if (frequencyPeriodsId.trim() === '') {
            this.showAlert(Constant.INVALID_PUSH_NOTIFICATION_FREQUENCY_PERIOD);
        } else if (renderDays.length === 0) {
            this.showAlert(Constant.INVALID_PUSH_NOTIFICATION_WEEKDAYS);
        } else if (renderTime.length === 0) {
            this.showAlert(Constant.INVALID_PUSH_NOTIFICATION_TIME);
        } else if (timeZoneValue.trim() === '') {
            this.showAlert(Constant.INVALID_PUSH_NOTIFICATION_TIMEZONE);
        } else {
            this.savePushNotification();
        }
    };

    savePushNotification = () => {
        const { dispatch } = this.props.navigation;
        const data = validatePushSettingData(this.state);
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(savePushSettingsAction(data.data))
                        .then(() => {
                            mixpanelTrack('Push Notification Settings Updated', this.state.emailId);
                            this.setState({ activeScreen: '' }, () => this.showAlert(Constant.PUSH_NOTIFICATION_SETTINGS_UPDATE_SUCCESS));
                        })
                        .catch(() => {
                        });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    hitlogoutAPI = () => {
        if (this.state.deviceToken === '') {
            pushNotificationService()
                .then((deviceToken) => {
                    this.setState({
                        deviceToken
                    }, () => this.logout());
                })
                .catch((error) => {
                    this.showAlert(error);
                });
        } else {
            this.logout();
        }
    };

    logout = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            device_token: this.state.deviceToken,
        };
        dispatch(logoutAction(body))
            .then(res => {
                mixpanelTrack('Logged Out', this.state.emailId);
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

    openModal = () => {
        this.showAlert(Constant.CHANGED_SUCCESSFULLY);
    }

    openAlertModal = (message) => {
        this.setState({
            open: true,
            message,
        });
    }

    clearData = () => {
        this.setState({
            planId: '',
            planName: '',
            amount: '',
            frequency: '',
        });
        this.openModalAlert();
    }

    openModalAlert = () => {
        this.showAlert(Constant.UNSUBSCRIBED_SUCCESSFULLY);
    }

    closeModal = () => {
        this.setState({
            open: false
        });
    }

    confirmUnsubscribe = () => {
        this.setState({
            openQuestion: true
        });
    }

    closeQuestion = () => {
        this.setState({
            openQuestion: false
        });
    }

    approve = () => {
        this.closeQuestion();
        this.hitUnsubscribe();
    }

    hitUnsubscribe = () => {
        const { dispatch } = this.props.navigation;
        const body = {
            plan_id: this.state.planId,
        };
        dispatch(unsubscribeAction(body))
            .then(() => {
                this.setState({
                    planId: '',
                    planName: '',
                    amount: '',
                    frequency: '',
                    open: true,
                    message: Constant.UNSUBSCRIBED_SUCCESSFULLY,
                });
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    showAlert = (message) => {
        this.setState({
            open: true,
            message
        });
    };

    openReferralModal = () => {
        const { dispatch } = this.props.navigation;
        dispatch(referralAction()).then((res) => {
            this.setState({
                shareLink: res.referralLink,
                shareMessage: res.text,
                referralCode: res.code,
            }, () => {
                this.setState({ openReferralModal: true });
            });
        });
    };

    closeReferralModal = () => {
        this.setState({
            openReferralModal: false,
        });
    };

    toggleContent = () => {
        this.setState({
            shareContent: !this.state.shareContent,
        });
    };


    render() {
        const { activeScreen, settingPageInfo } = this.state;
        const options = {
            AppleAppID: '1437266252',
            GooglePackageName: 'com.promptlyjournals',
            preferredAndroidMarket: AndroidMarket.Google,
            preferInApp: false,
            openAppStoreIfInAppFails: true,
        };
        return (
            <View style={style.container}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <SafeAreaView style={{ flex: 1 }}>
                        <View style={style.centerContainer}>
                            {!!settingPageInfo &&
                            <View style={style.contentContainer}>
                                <View style={{ marginVertical: 20 }}>
                                    <Text style={style.profileTextStyle}>SETTINGS</Text>
                                    <View style={{
                                        borderWidth: 1,
                                        borderColor: '#736063',
                                        width: '10%',
                                        marginTop: 20,
                                        alignSelf: 'center'
                                    }}
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => this.handleAccordion('profileScreen')}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>PROFILE INFO</Text>
                                        <Text style={[style.linkTextStyle, {
                                            fontSize: 18,
                                            paddingTop: 5
                                        }]}
                                        >Edit
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        activeScreen === 'profileScreen' &&
                                        <ProfileScreen
                                            currentState={this.state}
                                            handleTextChange={(text) => this.handleTextChange(text)}
                                            saveProfileInformation={this.saveProfileInformation}
                                            selectDropDownData={this.selectDropDownCountryData}
                                        />
                                    }
                                    <View style={style.underline} />
                                </View>
                                {/*<View>*/}
                                    {/*<TouchableOpacity*/}
                                        {/*style={{*/}
                                            {/*marginVertical: 20,*/}
                                            {/*flexDirection: 'row'*/}
                                        {/*}}*/}
                                        {/*onPress={() => this.navigateToOrderScreen()}*/}
                                    {/*>*/}
                                        {/*<Text style={[style.headerTextStyle, { width: '85%' }]}>MY ORDERS*/}
                                        {/*</Text>*/}
                                    {/*</TouchableOpacity>*/}
                                    {/*<View style={style.underline} />*/}
                                {/*</View>*/}
                                {/* Subscription Code */}
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => this.handleAccordion('subscriptionPlan')}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>SUBSCRIPTION PLAN</Text>
                                        <Text style={[style.linkTextStyle, {
                                            fontSize: 18,
                                            paddingTop: 5
                                        }]}
                                        >Edit
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        activeScreen === 'subscriptionPlan' &&
                                        <SubscriptionPlan
                                            confirmUnsubscribe={this.confirmUnsubscribe}
                                            hitFetchProfileDetails={this.hitFetchProfileDetails}
                                            data={this.props}
                                            handleAccording={this.handleAccordion}
                                            currentState={this.state}
                                            openModal={this.openModal}
                                            subscriptionPlan={this.state.subscriptionPlan}
                                            openAlertModal={this.openAlertModal}
                                            clearData={this.clearData}
                                            showAlert={this.showAlert}
                                            planSubscribe={this.APICallToSubscribe}
                                            type={this.state.type}
                                            lastFour={this.state.lastFour}
                                            email={this.state.email}
                                            method={this.state.method}
                                        />

                                    }
                                    <View style={style.underline} />
                                </View>
                                {activeScreen === 'authors' &&
                                <View>
                                    <TouchableOpacity
                                        style={{ marginVertical: 20 }}
                                        onPress={() => this.handleAccordion('authors')}
                                    >
                                        <Text style={style.headerTextStyle}>AUTHORS</Text>
                                        <Text style={style.linkTextStyle}>Whats an additional author?</Text>
                                    </TouchableOpacity>
                                    {
                                        activeScreen === 'authors' &&
                                        <AuthorScreen />
                                    }
                                    <View style={style.underline} />
                                </View>
                                }
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => this.handleAccordion('pushNotificationSetting')}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>PROMPT PUSH NOTIFICATION
                                            SETTINGS
                                        </Text>
                                        <Text style={[style.linkTextStyle, {
                                            fontSize: 18,
                                            paddingTop: 5
                                        }]}
                                        >Edit
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        activeScreen === 'pushNotificationSetting' &&
                                        <PushNotificationSettings
                                            frequencyTimes={this.state.frequencyTimes}
                                            frequencyPeriods={this.state.frequencyPeriods}
                                            renderDays={this.state.renderDays}
                                            renderTime={this.state.renderTime}
                                            settingPageInfo={settingPageInfo.pushNotificationSetting}
                                            selectDropDownData={this.selectDropDownData}
                                            handleCheckboxPress={this.handleCheckboxPress}
                                            handleTimeCheckboxPress={this.handleTimeCheckboxPress}
                                            savePushNotification={this.validatePushNotificationData}
                                            selectTimeZone={this.selectTimeZone}
                                            selectDropDown={this.selectDropDown}
                                            timeZoneValue={this.state.timeZoneValue}
                                        />
                                    }
                                    <View style={style.underline} />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => this.handleAccordion('shareContent')}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>SHARE & SHOP
                                        </Text>
                                    </TouchableOpacity>
                                    {
                                        activeScreen === 'shareContent' &&
                                    <View>
                                        <View style={style.paddingVertical}>
                                            <Text style={[style.textStyle, style.heightIncreased]}>
                                                Loving our app? Share a link with your friends and family and earn credit to Amazon!
                                            </Text>
                                            <Text style={[style.textStyle, style.heightIncreased]}>
                                                For every paying subscriber that joins from your referral, you’ll receive $3 to Amazon.
                                            </Text>
                                        </View>
                                        <View style={style.paddingVertical}>
                                            <Text style={[style.textStyle, style.heightIncreased, { fontSize: 19, paddingBottom: 5 }]}>
                                                HOW IT WORKS:
                                            </Text>
                                            <View style={commonStyle.flexDirectionRow}>
                                                <Text style={[style.textStyle, style.heightIncreased, style.leftSection]}>
                                                    1.
                                                </Text>
                                                <Text style={[style.textStyle, style.heightIncreased, style.rightSection]}>
                                                    Click the SHARE NOW button below.
                                                </Text>
                                            </View>
                                            <View style={commonStyle.flexDirectionRow}>
                                                <Text style={[style.textStyle, style.heightIncreased, style.leftSection, { lineHeight: 22 }]}>
                                                    2.
                                                </Text>
                                                <Text style={[style.textStyle, style.heightIncreased, style.rightSection, { lineHeight: 22 }]}>
                                                    Share your link wherever you would like (social media, text, email, etc).
                                                </Text>
                                            </View>
                                            <View style={commonStyle.flexDirectionRow}>
                                                <Text style={[style.textStyle, style.heightIncreased, style.leftSection, { lineHeight: 22 }]}>
                                                    3.
                                                </Text>
                                                <Text style={[style.textStyle, style.heightIncreased, style.rightSection, { lineHeight: 22 }]}>
                                                    Every month, we’ll email you an Amazon gift card with your accrued credit.
                                                </Text>
                                            </View>
                                            <View style={commonStyle.flexDirectionRow}>
                                                <Text style={[style.textStyle, style.heightIncreased, style.leftSection, { lineHeight: 22 }]}>
                                                    4.
                                                </Text>
                                                <Text style={[style.textStyle, style.heightIncreased, style.rightSection, { lineHeight: 22 }]}>
                                                    In 2 clicks, you easily apply it to your Amazon account!
                                                </Text>
                                            </View>
                                            <Text style={[style.textStyle, style.heightIncreased, { paddingTop: 10 }]}>
                                                Thank you so much for sharing. It truly means the world to us. Enjoy!
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            style={style.shareStyle}
                                            activeOpacity={0.8}
                                            onPress={() => this.openReferralModal()}
                                        >
                                            <Text style={[commonStyle.linkText, {
                                                fontSize: 18,
                                                paddingVertical: 10,
                                                letterSpacing: 2,
                                                fontFamily: Constant.TEXT_FONT,
                                            }]}
                                            >Share Now
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                    <View style={style.underline} />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => this.showZendeskHelpCenter()}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>CONTACT US
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={style.underline} />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => Linking.openURL('https://app.promptlyjournals.com/faq')}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>FAQ
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={style.underline} />
                                </View>
                                <View>
                                    <TouchableOpacity
                                        style={{
                                            marginVertical: 20,
                                            flexDirection: 'row'
                                        }}
                                        onPress={() => Rate.rate(options, () => {})}
                                    >
                                        <Text style={[style.headerTextStyle, { width: '85%' }]}>RATE US
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={style.underline} />
                                </View>
                                <View style={style.logoutStyle}>
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={this.hitlogoutAPI}
                                    >
                                        <Text style={[commonStyle.linkText, {
                                            fontSize: 18,
                                            paddingVertical: 10,
                                            letterSpacing: 2,
                                        }]}
                                        >LOG OUT
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                            }
                        </View>
                    </SafeAreaView>
                </KeyboardAwareScrollView>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
                <QuestionModal
                    open={this.state.openQuestion}
                    close={this.closeQuestion}
                    approve={this.approve}
                    message={'Are you sure you want to UNSUBSCRIBE? You won\'t be able to create Journals after this.'}
                />
                <Spinner
                    animating={this.props.fetching}
                />
                <ReferralModal
                    close={this.closeReferralModal}
                    data={this.props}
                    open={this.state.openReferralModal}
                    shareContent
                    shareLink={this.state.shareLink}
                />
            </View>
        );
    }
}

Setting.propTypes = {
    fetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    fetching: state.fetchProfileDetailsReducer.fetching || state.logoutReducer.fetching ||
        state.saveProfileScreenReducer.fetching || state.savePushSettingsReducer.fetching
        || state.unsubscribeReducer.fetching || state.updateSubscriptionReducer.fetching || state.subscriptionPlanReducer.fetching,
    fetchProfileInfo: state.fetchProfileDetailsReducer.fetchProfileInfo,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(Setting);
