import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import commonStyle from '../Common/commonStyle';
import style from './onBoardingStyle';
import Styles from '../SubscriptionPlanScreen/subscriptionPlanStyle';

class SubscriptionPlanScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            starterChecked: props.planName === 'Starter Monthly',
            standardMonthlyChecked: props.planName === 'Standard Monthly',
            standardYearlyChecked: props.planName === 'Standard Yearly',
            planName: props.planName === 'Starter Monthly' ? 'Starter Plan' : 'Standard Plan',
            amount: props.planName === 'Starter Monthly' ? '$4.99 p/month' : props.planName === 'Standard Monthly' ? '$9.99 p/month' : '$99.99 p/year',
            frequency: props.planName === 'Starter Monthly' ? 'billed monthly' : props.planName === 'Standard Monthly' ? 'billed monthly' : 'billed annually',
        };
    }

    toggleStarterChecked = () => {
        this.setState({
            starterChecked: true,
            standardMonthlyChecked: false,
            standardYearlyChecked: false,
            planName: 'starter plan',
            amount: '$4.99 p/month',
            frequency: 'billed monthly',
        });
    }

    toggleStandardMonthlyChecked = () => {
        this.setState({
            standardMonthlyChecked: true,
            starterChecked: false,
            standardYearlyChecked: false,
            planName: 'standard plan',
            amount: '$9.99 p/month',
            frequency: 'billed monthly',
        });
    }

    toggleStandardYearlyChecked = () => {
        this.setState({
            standardYearlyChecked: true,
            starterChecked: false,
            standardMonthlyChecked: false,
            planName: 'standard plan',
            amount: '$99.99 p/year',
            frequency: 'billed annually',
        });
    }

    navigateToPurchaseScreen = () => {
        const { starterChecked, standardMonthlyChecked } = this.state;
        const planSelected = starterChecked ? 'starter-monthly' : standardMonthlyChecked ? 'standard-monthly' : 'standard-yearly';
        this.props.data.navigation.navigate('PurchaseScreen', { planName: planSelected, isShowHelpBlock: this.props.data.navigation.state.params.ShowHelpBlock });
    };

    render() {
        const {
            starterChecked, standardMonthlyChecked, standardYearlyChecked, planName, amount, frequency
        } = this.state;
        return (
            <View style={style.container}>
                <View style={commonStyle.headerBox}>
                    <Text style={[commonStyle.headerTextStyle, commonStyle.headerFontSize]}>14 DAY FREE TRIAL</Text>
                    <Text style={[commonStyle.headerTextStyle, commonStyle.headerFontSize]}>STARTS NOW</Text>
                    <Text style={[commonStyle.subHeadingText, { marginTop: 10 }]}>Choose your subscription plan below</Text>
                </View>
                <View style={style.cardContainer}>
                    <View style={style.cardSize}>
                        <View style={Styles.cardContainer}>
                            <TouchableOpacity style={starterChecked ? style.card : Styles.card} onPress={this.toggleStarterChecked} activeOpacity={0.8}>
                                <View style={starterChecked ? style.cardContent : Styles.cardContent}>
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
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={standardMonthlyChecked ? style.card : Styles.card} onPress={this.toggleStandardMonthlyChecked} activeOpacity={0.8}>
                                <View style={standardMonthlyChecked ? style.cardContent : Styles.cardContent}>
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
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={standardYearlyChecked ? style.card : Styles.card} onPress={this.toggleStandardYearlyChecked} activeOpacity={0.8}>
                                <View style={standardYearlyChecked ? style.cardContent : Styles.cardContent}>
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
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={style.justifyAlign}>
                    <Text style={style.text}>
                        {`${planName.toUpperCase()}`}
                    </Text>
                    <Text style={[style.text, style.size15, style.marginVertical15]}>
                        {`${amount}`}
                    </Text>
                    <Text style={[style.text, style.size15]}>
                        {`${frequency.toUpperCase()}`}
                    </Text>
                </View>
                <View style={[style.flexRow, style.justifyAlign, style.marginVertical15]}>
                    <TouchableOpacity
                        style={style.nextStyle}
                        activeOpacity={0.8}
                        onPress={this.navigateToPurchaseScreen}
                    >
                        <Text style={[commonStyle.linkText, {
                            fontSize: 18,
                            padding: 10,
                        }]}
                        >PURCHASE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

SubscriptionPlanScreen.propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object.isRequired,
    planName: PropTypes.string.isRequired,
};

SubscriptionPlanScreen.defaultProps = {
    navigation: {},
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(SubscriptionPlanScreen);
