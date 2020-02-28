import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Platform,
    Image
} from 'react-native';
import PropTypes from 'prop-types';
import style from './settingStyle';
import CONSTANT from '../../utility/constants';
import ICONS from '../../utility/iconConstant';
import AlertModal from '../Common/AlertModal';
import Styles from '../SubscriptionPlanScreen/subscriptionPlanStyle';

export default class SubscriptionPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planId: this.props.currentState.planId,
            planName: this.props.currentState.planName,
            amount: this.props.currentState.amount,
            showSection: false,
            subscriptionPlan: this.props.subscriptionPlan ? this.props.subscriptionPlan : '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentState !== undefined) {
            this.setState({
                planId: nextProps.currentState.planId,
                planName: nextProps.currentState.planName,
                amount: nextProps.currentState.amount,
            });
        }
    }

    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    navigateToChangeSubscription = () => {
        this.props.data.navigation.navigate('ChangeSubscriptionPlan', { planId: this.state.planId });
    }

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

    validatePlatform = () => {
        if ((Platform.OS === 'ios' && this.state.subscriptionPlan.purchasedFrom === 'apple') || (Platform.OS === 'android' && this.state.subscriptionPlan.purchasedFrom === 'google') || (this.state.subscriptionPlan === '')) {
            this.setState({
                showSection: true,
            });
        } else if (this.state.subscriptionPlan === '') {
            this.props.showAlert('This feature is currently unavailable');
        } else if (this.state.subscriptionPlan.purchasedFrom === 'google') {
            this.props.showAlert(CONSTANT.SHOW_PLATFORM_MESSAGE_ANDROID);
        } else if (this.state.subscriptionPlan.purchasedFrom === 'apple') {
            this.props.showAlert(CONSTANT.SHOW_PLATFORM_MESSAGE_APPLE);
        } else {
            this.props.showAlert(CONSTANT.SHOW_PLATFORM_MESSAGE_WEB);
        }
    }
    navigateToPurchaseScreen = (plan) => {
        this.props.data.navigation.navigate('PurchaseScreen', {
            currentPlan: this.state.planId,
            planName: plan,
            flag: true,
        });
    }

    render() {
        const { planId } = this.state;
        return (
            <View>
                <Text
                    style={style.textStyle}
                >{`${this.state.planName ? this.state.planName : 'No plans selected.'}`}
                </Text>
                {this.state.showSection &&
                <View style={{
                    height: 200,
                    width: '100%'
                }}
                >
                    <View style={Styles.cardContainer}>
                        <View style={planId === 'starter-monthly' ? style.card : Styles.card}>
                            <View style={Styles.cardContent}>
                                <Text style={Styles.starterText}>STARTER</Text>
                                <View style={Styles.underline} />
                                <View style={Styles.moneyContainer}>
                                    <Text style={Styles.amount}>$</Text>
                                    <Text style={Styles.money}>4</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={Styles.amountUnderlined}>99</Text>
                                        <View style={[Styles.underline, {
                                            marginTop: 1,
                                            alignSelf: 'center'
                                        }]}
                                        />
                                    </View>
                                </View>
                                <Text style={Styles.billedText}>PER MONTH</Text>
                                {planId === 'starter-monthly' ?
                                    <View style={[Styles.button, { width: '70%' }]}>
                                        <Text style={Styles.buttonText}>SUBSCRIBED</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={this.state.plan !== 'starter-monthly' ? () => this.navigateToPurchaseScreen('starter-monthly') : ''}
                                    >
                                        <Text
                                            style={Styles.buttonText}
                                        >{`${planId === 'starter-monthly' ? 'SUBSCRIBED' : 'PURCHASE'}`}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={planId === 'standard-monthly' ? style.card : Styles.card}>
                            <View style={Styles.cardContent}>
                                <Text style={Styles.starterText}>STANDARD</Text>
                                <View style={Styles.underline} />
                                <View style={Styles.moneyContainer}>
                                    <Text style={Styles.amount}>$</Text>
                                    <Text style={Styles.money}>9</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={Styles.amountUnderlined}>99</Text>
                                        <View style={[Styles.underline, {
                                            marginTop: 1,
                                            alignSelf: 'center'
                                        }]}
                                        />
                                    </View>
                                </View>
                                <Text style={Styles.billedText}>PER MONTH</Text>
                                {planId === 'standard-monthly' ?
                                    <View style={[Styles.button, { width: '70%' }]}>
                                        <Text style={Styles.buttonText}>SUBSCRIBED</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={this.state.plan !== 'standard-monthly' ? () => this.navigateToPurchaseScreen('standard-monthly') : ''}
                                    >
                                        <Text
                                            style={Styles.buttonText}
                                        >{`${planId === 'standard-monthly' ? 'SUBSCRIBED' : 'PURCHASE'}`}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={planId === 'standard-yearly' ? style.card : Styles.card}>
                            <View style={Styles.cardContent}>
                                <Text style={Styles.starterText}>STANDARD</Text>
                                <View style={Styles.underline} />
                                <View style={Styles.moneyContainer}>
                                    <Text style={Styles.amount}>$</Text>
                                    <Text style={Styles.money}>99</Text>
                                    <View style={{ flexDirection: 'column' }}>
                                        <Text style={[Styles.amountUnderlined, { textAlign: 'center' }]}>99</Text>
                                        <View style={[Styles.underline, {
                                            marginTop: 1,
                                            alignSelf: 'center'
                                        }]}
                                        />
                                        {/* <Text style={Styles.monthly}>per month</Text> */}
                                    </View>
                                </View>
                                <Text style={Styles.billedText}>BILLED ANNUALLY</Text>
                                {planId === 'standard-yearly' ?
                                    <View style={[Styles.button, { width: '70%' }]}>
                                        <Text style={Styles.buttonText}>SUBSCRIBED</Text>
                                    </View>
                                    :
                                    <TouchableOpacity
                                        style={Styles.button}
                                        onPress={this.state.plan !== 'standard-yearly' ? () => this.navigateToPurchaseScreen('standard-yearly') : ''}
                                    >
                                        <Text
                                            style={Styles.buttonText}
                                        >{`${planId === 'standard-yearly' ? 'SUBSCRIBED' : 'PURCHASE'}`}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={Styles.round}>
                            <Text style={Styles.roundText}>Best Value</Text>
                        </View>
                    </View>
                    <View style={[Styles.bottomContainer, Styles.margin]}>
                        <View style={Styles.starterPlan}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={Styles.borderVertical} />
                                <View style={{
                                    flexDirection: 'column',
                                    width: '100%'
                                }}
                                >
                                    <Text style={Styles.starterPlanText}>
                                        STARTER PLAN INCLUDES:
                                    </Text>
                                    <View style={Styles.borderHorizontal} />
                                </View>
                                <View style={Styles.borderVertical} />
                            </View>
                            <View style={Styles.downDash} />
                            <View style={Styles.image}>
                                <Image source={ICONS.SUBSCRIPTION_SINGLE_BOOK} style={Styles.singleBook} />
                            </View>
                            <Text style={Styles.starterText}>
                                1 Journal
                            </Text>
                        </View>
                        <View style={Styles.standardPlan}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={Styles.borderVertical} />
                                <View style={{
                                    flexDirection: 'column',
                                    width: '100%'
                                }}
                                >
                                    <Text style={Styles.starterPlanText}>
                                        STANDARD PLAN INCLUDES:
                                    </Text>
                                    <View style={Styles.borderHorizontal} />
                                </View>
                                <View style={Styles.borderVertical} />
                            </View>
                            <View style={Styles.downDash} />
                            <View style={Styles.image}>
                                <Image source={ICONS.SUBSCRIPTION_BOOKS} style={Styles.books} />
                            </View>
                            <Text style={Styles.starterText}>
                                Unlimited Journals
                            </Text>
                        </View>
                    </View>
                </View>
                }

                {((Platform.OS === 'ios' && this.state.subscriptionPlan.purchasedFrom === 'apple') || (Platform.OS === 'android' && this.state.subscriptionPlan.purchasedFrom === 'google') || this.state.planName === '') &&
                <TouchableOpacity
                    style={this.state.showSection ? [style.changePlanButton, style.marginTop] : style.changePlanButton}
                    onPress={this.validatePlatform}
                >
                    <Text
                        style={[style.linkTextStyle, { textAlign: 'center' }]}
                    >{this.state.amount ? 'Change Plan' : 'Add Plan'}
                    </Text>
                </TouchableOpacity>}
                <View style={{ width: '100%' }}>
                    {(Platform.OS === 'ios' && this.state.subscriptionPlan.purchasedFrom === 'apple') ?
                        <Text style={style.manageText}>Manage or cancel your subscription through your device&apos;s Settings App.</Text> : <Text style={style.manageText}>Manage or cancel your subscription through the platform you registered on.</Text>
                    }
                </View>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
            </View>
        );
    }
}

SubscriptionPlan.propTypes = {
    navigation: PropTypes.object,
    showAlert: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired,
    currentState: PropTypes.object.isRequired,
    subscriptionPlan: PropTypes.object.isRequired
};
SubscriptionPlan.defaultProps = {
    navigation: {},
};
