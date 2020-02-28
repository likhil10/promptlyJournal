import React, { Component } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Styles from './subscriptionPlanStyle';
import Icon from '../../utility/iconConstant';

class SelectSubscriptionPlanScreen extends Component {
    constructor() {
        super();
        this.state = {};
    }

    navigateToLogin = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'LoginScreen',
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToSignUpStarter = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'SwiperScreen',
                    params: { planId: 'starter-monthly', productId: 'app499m' }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToSignUpStandardMonthly = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'SwiperScreen',
                    params: { planId: 'standard-monthly', productId: 'app999m' }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    navigateToSignUpStandardYearly = () => {
        const reset = StackActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({
                    routeName: 'SwiperScreen',
                    params: { planId: 'standard-yearly', productId: 'app9999y' }
                })
            ]
        });
        this.props.navigation.dispatch(reset);
    };

    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.offer}>
                    <ImageBackground source={Icon.SUBSCRIPTION_BACKGROUND} style={Styles.backgroundImage}>
                        <Text style={Styles.tryText}>TRY OUR PROMPTED JOURNALING SUBSCRIPTION</Text>
                        <Text style={Styles.freeText}>FREE FOR 14 DAYS</Text>
                        <Text style={Styles.cancelText}>Cancel Anytime.</Text>
                        <Text style={Styles.alreadyUser}>Already have an Account?</Text>
                        <TouchableOpacity style={Styles.loginButton} onPress={this.navigateToLogin}>
                            <Text style={{
                                color: '#736063',
                                fontWeight: 'bold',
                                width: '100%',
                                textAlign: 'center'
                            }}
                            >SIGN IN
                            </Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={{ height: '30%' }}>
                    <View style={Styles.subPlan}>
                        <Text style={Styles.subPlanText}>SUBSCRIPTION PLANS</Text>
                        <Text style={Styles.subHeading}>Choose a plan you’d like to try free for 14 days.</Text>
                    </View>
                    <View style={Styles.cardContainer}>
                        <View style={Styles.card}>
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
                                <TouchableOpacity style={Styles.button} onPress={this.navigateToSignUpStarter}>
                                    <Text style={Styles.buttonText}>SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.card}>
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
                                <TouchableOpacity style={Styles.button} onPress={this.navigateToSignUpStandardMonthly}>
                                    <Text style={Styles.buttonText}>SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.card}>
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
                                    </View>
                                </View>
                                <Text style={Styles.billedText}>BILLED ANNUALLY</Text>
                                <TouchableOpacity style={Styles.button} onPress={this.navigateToSignUpStandardYearly}>
                                    <Text style={Styles.buttonText}>SIGN UP</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={Styles.round}>
                            <Text style={Styles.roundText}>Best Value</Text>
                        </View>
                    </View>
                </View>
                <View style={Styles.bottomContainer}>
                    <View style={Styles.starterPlan}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={Styles.borderVertical} />
                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                <Text style={Styles.starterPlanText}>
                                    STARTER PLAN INCLUDES:
                                </Text>
                                <View style={Styles.borderHorizontal} />
                            </View>
                            <View style={Styles.borderVertical} />
                        </View>
                        <View style={Styles.downDash} />
                        <View style={Styles.image}>
                            <Image source={Icon.SUBSCRIPTION_SINGLE_BOOK} style={Styles.singleBook} />
                        </View>
                        <Text style={Styles.starterText}>
                            1 Journal
                        </Text>
                    </View>
                    <View style={Styles.standardPlan}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={Styles.borderVertical} />
                            <View style={{ flexDirection: 'column', width: '100%' }}>
                                <Text style={Styles.starterPlanText}>
                                    STANDARD PLAN INCLUDES:
                                </Text>
                                <View style={Styles.borderHorizontal} />
                            </View>
                            <View style={Styles.borderVertical} />
                        </View>
                        <View style={Styles.downDash} />
                        <View style={Styles.image}>
                            <Image source={Icon.SUBSCRIPTION_BOOKS} style={Styles.books} />
                        </View>
                        <Text style={Styles.starterText}>
                            Unlimited Journals
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

SelectSubscriptionPlanScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected
});

export default connect(mapStateToProps)(SelectSubscriptionPlanScreen);
