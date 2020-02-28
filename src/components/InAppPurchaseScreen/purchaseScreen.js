import React, { Component } from 'react';
import {
    AsyncStorage,
    Linking, NetInfo, Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as RNIap from 'react-native-iap';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import style from './inAppStyle';
import Spinner from '../Common/spinner';
import AlertModal from '../Common/AlertModal';
import { savePurchaseDetails } from '../../actions/savePurchaseDetailsAction';
import { mixpanelTrack, setProductId } from '../../utility/mixpanelHelperComponent';

const itemSubs = Platform.select({
    ios: [
        'app499m',
        'app999m',
        'app9999y'
    ],
    android: [
        'app499m',
        'app999m',
        'app9999y'
    ],
});

class PurchaseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            oldPlan: props.navigation.state.params.currentPlan ? this.props.navigation.state.params.currentPlan === 'starter-monthly' ? 'app499m' : this.props.navigation.state.params.currentPlan === 'standard-monthly' ? 'app999m' : 'app9999y' : '',
            planName: props.navigation.state.params.planName === 'starter-monthly' ? 'Starter Monthly' : this.props.navigation.state.params.planName === 'standard-monthly' ? 'Standard Monthly' : 'Standard Yearly',
            amount: props.navigation.state.params.planName === 'starter-monthly' ? '$4.99' : this.props.navigation.state.params.planName === 'standard-monthly' ? '$9.99' : '$99.99',
            frequency: props.navigation.state.params.planName === 'starter-monthly' ? 'Monthly' : this.props.navigation.state.params.planName === 'standard-monthly' ? 'Monthly' : 'Yearly',
            productId: props.navigation.state.params.planName === 'starter-monthly' ? 'app499m' : this.props.navigation.state.params.planName === 'standard-monthly' ? 'app999m' : 'app9999y',
            isShowHelpBlock: props.navigation.state.params.isShowHelpBlock !== true,
            purchaseTransactionReceipt: '',
            purchaseProductId: '',
            purchaseTransactionDate: '',
            purchaseTransactionId: '',
            openAlert: false,
            messageAlert: '',
            loading: false,
            email: '',
        };
    }

    componentDidMount() {
        this.initConnect();
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            planName: nextProps.navigation.state.params.planName === 'starter-monthly' ? 'Starter Monthly' : nextProps.navigation.state.params.planName === 'standard-monthly' ? 'Standard Monthly' : 'Standard Yearly',
            productId: nextProps.navigation.state.params.planName === 'starter-monthly' ? 'app499m' : nextProps.navigation.state.params.planName === 'standard-monthly' ? 'app999m' : 'app9999y',
            isShowHelpBlock: this.props.navigation.state.params.isShowHelpBlock !== true,
        });
    }

    componentWillUnmount() {
        RNIap.endConnection();
    }

    getSubscription = () => {
        this.hideSpinnerOnLoading();
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    this.showSpinnerOnLoading();
                    RNIap.getSubscriptions(itemSubs).then(() => {
                        this.hideSpinnerOnLoading();
                    }).catch(() => {
                        this.showAlert(Constant.NETWORK_ERROR);
                    });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            });
        });
    }

    hideSpinnerOnLoading = () => {
        this.setState({
            loading: false
        });
    };

    showSpinnerOnLoading = () => {
        this.setState({
            loading: true
        });
    };

    navigateToChooseSubscription = () => {
        const { navigate, state } = this.props.navigation;
        let screenName = 'SwiperScreen';
        let params = null;
        if (state.params.flag) {
            screenName = 'SettingScreen';
        } else if (state.params.flags) {
            screenName = 'ChooseSubscriptionScreen';
            params = { planSelected: this.state.planName === 'Starter Monthly' ? 'starter-monthly' : this.state.planName === 'Standard Monthly' ? 'standard-monthly' : 'standard-yearly' };
        }
        navigate(screenName, params);
    };

    initConnect = () => {
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    this.showSpinnerOnLoading();
                    RNIap.initConnection().then(() => {
                        RNIap.consumeAllItems().then(() => {
                            this.hideSpinnerOnLoading();
                            this.getSubscription();
                        }).catch(() => {
                            this.showAlert(Constant.NETWORK_ERROR);
                        });
                    }).catch(() => {
                        this.showAlert(Constant.NETWORK_ERROR);
                    });
                } else {
                    this.hideSpinnerOnLoading();
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    buySubscribeItem = () => {
        const { productId, oldPlan } = this.state;
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    this.showSpinnerOnLoading();
                    RNIap.buySubscription(productId, oldPlan).then(purchase => {
                        this.getEmail();
                        this.setState({
                            purchaseProductId: purchase.productId,
                            purchaseTransactionDate: purchase.transactionDate,
                            purchaseTransactionId: purchase.transactionId,
                            purchaseTransactionReceipt: Platform.OS === 'ios' ? purchase.transactionReceipt : purchase.purchaseToken,
                            purchaseReceipt: Platform.OS === 'ios' ? purchase : JSON.parse(purchase.dataAndroid)
                        }, () => this.APICallToSubscribe());
                    }).catch(() => {
                        this.hideSpinnerOnLoading();
                        this.showAlert(Constant.INVALID_PAYMENT);
                    });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    APICallToSubscribe = () => {
        let mixpanelEvent;
        const {
            purchaseProductId, purchaseTransactionDate, purchaseTransactionId, purchaseTransactionReceipt, purchaseReceipt
        } = this.state;
        const body = {
            product_id: purchaseProductId,
            transaction_date: purchaseTransactionDate,
            transaction_id: purchaseTransactionId,
            transaction_receipt: purchaseTransactionReceipt,
            purchase_receipt: purchaseReceipt
        };
        const { dispatch } = this.props.navigation;
        this.hideSpinnerOnLoading();
        dispatch(savePurchaseDetails(body))
            .then(() => {
                if (this.state.oldPlan) {
                    mixpanelEvent = 'Plan Changed';
                } else {
                    mixpanelEvent = 'Subscribed';
                }
                mixpanelTrack(mixpanelEvent, this.state.email.trim());
                mixpanelTrack(`${mixpanelEvent} ${Platform.OS === 'android' ? 'From Google' : 'From Apple'}`, this.state.email.trim());
                mixpanelTrack(`${purchaseProductId === 'app499m' ? 'Starter Monthly' : purchaseProductId === 'app999m' ? 'Standard Monthly' : 'Standard Yearly'} ${Platform.OS === 'android' ? 'Google' : 'Apple'} Subscriber`, this.state.email.trim());
                setProductId(purchaseProductId, this.state.email.trim());
                this.navigateToPasscodeScreen();
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    navigateToDashboard = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'DashboardScreenNavigator',
                    params: { showHelpBlock: this.state.isShowHelpBlock }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToPasscodeScreen = () => {
        const { state, dispatch } = this.props.navigation;
        if (this.props.navigation) {
            if (state.params.flag === true || state.params.flags === true) {
                const reset = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'DashboardScreenNavigator',
                            params: { showHelpBlock: this.state.isShowHelpBlock }
                        })
                    ]
                });
                dispatch(reset);
            } else {
                const reset = StackActions.reset({
                    index: 0,
                    key: null,
                    actions: [
                        NavigationActions.navigate({
                            routeName: 'SwiperScreen',
                            params: {
                                count: 1,
                                showHelpBlock: this.state.isShowHelpBlock
                            }
                        })
                    ]
                });
                dispatch(reset);
            }
        }
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
        const {
            planName, amount, frequency
        } = this.state;
        return (
            <View style={style.container}>
                <View style={[style.midSection, style.border]}>
                    <View>
                        <View style={{
                            flexDirection: 'row',
                            width: '100%'
                        }}
                        >
                            <View>
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    onPress={this.navigateToChooseSubscription}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MaterialIcons name="keyboard-backspace" size={25} color={Constant.TEXT_COLOR} />
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={[style.planName, style.greaterFont, { textAlign: 'center' }]}
                            >{`${planName} Subscription Plan`}
                            </Text>
                        </View>
                    </View>
                    <View style={[style.justifyAlign]}>
                        {Platform.OS === 'ios' &&
                        <View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalTextBold}>{`${frequency} Subscription is ${amount}`}</Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Payment will be charged to iTunes Account at confirmation
                                    of
                                    purchase
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Subscription automatically renews unless auto-renew is
                                    turned
                                    off at least 24-hours prior to the end of the current period, and identify the cost
                                    of
                                    the renewal
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Account will be charged for renewal within 24-hours prior
                                    to
                                    the end of the current period, and identify the cost of the renewal
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Subscriptions may be managed by the user and auto-renewal
                                    may
                                    be turned off by going to the user&apos;s Account Settings after purchase
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Any unused portion of a free trial period, if offered,
                                    will
                                    be fortified when the user purchases a subscription to that publication where
                                    applicable
                                </Text>
                            </View>
                        </View>}
                        {Platform.OS === 'android' &&
                        <View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalTextBold}>{`${frequency} Subscription is ${amount}`}</Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Payment will be charged to Google pay Account at
                                    confirmation
                                    of
                                    purchase
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Subscription automatically renews unless auto-renew is
                                    turned off
                                </Text>
                            </View>
                            <View style={[style.flexRow, style.setWidth]}>
                                <Text style={style.bullet}>{'\u2022'}</Text>
                                <Text style={style.normalText}>Free trial period can be availed on any one of the
                                    plans
                                </Text>
                            </View>
                        </View>}
                        <View style={style.flexRow}>
                            <Text
                                onPress={() => Linking.openURL(Constant.TERMSANDCONDITIONS)}
                                style={{
                                    color: '#53a3e0',
                                    marginTop: 3
                                }}
                            >Terms and Conditions
                            </Text>
                            <Text style={commonStyle.linkText}> | </Text>
                            <Text
                                onPress={() => Linking.openURL(Constant.PRIVACY_POLICIES)}
                                style={{
                                    color: '#53a3e0',
                                    marginTop: 3
                                }}
                            >Privacy Policy
                            </Text>
                        </View>
                        {Platform.OS === 'ios' ?
                            <TouchableOpacity
                                style={[style.purchaseButton, {
                                    justifyContent: 'center',
                                    height: '7%',
                                    marginTop: 9
                                }]}
                                onPress={() => this.buySubscribeItem()}
                                activeOpacity={0.8}
                            >
                                <Text style={style.buttonText}>PURCHASE</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={[style.purchaseButton, {
                                    justifyContent: 'center',
                                    height: '12%',
                                    marginTop: 9
                                }]}
                                onPress={() => this.buySubscribeItem()}
                                activeOpacity={0.8}
                            >
                                <Text style={style.buttonText}>PURCHASE</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                <AlertModal
                    message={this.state.messageAlert}
                    open={!!this.state.openAlert}
                    close={this.closeModal}
                />
                <Spinner
                    animating={this.props.fetching || this.state.loading}
                />
            </View>
        );
    }
}

PurchaseScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    fetching: PropTypes.bool,
};
PurchaseScreen.defaultProps = {
    fetching: false,
};

const mapStateToProps = state => ({
    fetching: state.savePurchaseDetailsReducer.fetching,
    savePurchaseDetailsData: state.savePurchaseDetailsReducer.savePurchaseDetailsData,
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(PurchaseScreen);
