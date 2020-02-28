import React, { Component } from 'react';
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import style from './settingStyle';
import Constant from '../../utility/constants';
import Styles from '../SubscriptionPlanScreen/subscriptionPlanStyle';


class ChangeSubscriptionPlan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planId: this.props.navigation.state.params.planId,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            planId: nextProps.navigation.state.params.planId,
        });
    }

    navigateToSettings = () => {
        this.props.navigation.navigate('SettingScreen');
    };

    navigateToPurchaseScreen = (plan) => {
        this.props.navigation.navigate('PurchaseScreen', { currentPlan: this.state.planId, planName: plan, flag: true });
    };

    render() {
        return (
            <View style={style.container}>
                <View style={{ alignSelf: 'flex-start', margin: 10 }}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => this.navigateToSettings()}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}
                    >
                        <MaterialIcons name="keyboard-backspace" size={23} color={Constant.TEXT_COLOR} />
                        {/* <Text style={commonStyle.linkText}> Back to Settings</Text> */}
                    </TouchableOpacity>
                </View>
                <View style={Styles.subPlan}>
                    <Text style={Styles.subPlanText}>SUBSCRIPTION PLANS</Text>
                    <Text style={Styles.subHeading}>Update your by clicking ine below.</Text>
                </View>
                <View style={{ height: '35%' }}>
                    <View style={Styles.cardContainer}>
                        <View style={this.state.planId === 'starter-monthly' ? style.card : Styles.card}>
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
                                <TouchableOpacity
                                    style={Styles.button}
                                    onPress={this.state.plan !== 'starter-monthly' ? () => this.navigateToPurchaseScreen('starter-monthly') : ''}
                                >
                                    <Text style={Styles.buttonText}>{`${this.state.planId === 'standard-monthly' ? 'SUBSCRIBED' : 'PURCHASE'}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={this.state.planId === 'standard-monthly' ? style.card : Styles.card}>
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
                                <TouchableOpacity
                                    style={Styles.button}
                                    onPress={this.state.plan !== 'standard-monthly' ? () => this.navigateToPurchaseScreen('standard-monthly') : ''}
                                >
                                    <Text style={Styles.buttonText}>{`${this.state.planId === 'standard-monthly' ? 'SUBSCRIBED' : 'PURCHASE'}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={this.state.planId === 'standard-yearly' ? style.card : Styles.card}>
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
                                <TouchableOpacity
                                    style={Styles.button}
                                    onPress={this.state.plan !== 'standard-yearly' ? () => this.navigateToPurchaseScreen('standard-yearly') : ''}
                                >
                                    <Text style={Styles.buttonText}>{`${this.state.planId === 'standard-yearly' ? 'SUBSCRIBED' : 'PURCHASE'}`}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.round}>
                            <Text style={Styles.roundText}>Best Value</Text>
                        </View>
                    </View>
                    <View style={Styles.bottomContainer}>
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
                                <Image source={Constant.SUBSCRIPTION_SINGLE_BOOK} style={Styles.singleBook} />
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
                                <Image source={Constant.SUBSCRIPTION_BOOKS} style={Styles.books} />
                            </View>
                            <Text style={Styles.starterText}>
                                Unlimited Journals
                            </Text>
                        </View>
                    </View>
                </View>
            </View>

        );
    }
}

ChangeSubscriptionPlan.propTypes = {
    navigation: PropTypes.object.isRequired,
};


export default (ChangeSubscriptionPlan);
