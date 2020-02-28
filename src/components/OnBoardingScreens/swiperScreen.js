import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Keyboard } from 'react-native';
import PropTypes from 'prop-types';
import style from './onBoardingStyle';
import SubscriptionPlanScreen from './subscriptionPlanScreen';
import SignUpScreen from './signUpScreen';
import PasscodeScreen from './passcodeScreen';
import FrequencyScreen from './frequencyScreen';
import Swipers from '../Common/swipper';

class SwiperScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: props.navigation.state.params.count === 1 ? 1 : 0,
            planId: props.navigation.state.params.planId,
            showDots: true,
        };
    }

    componentDidMount() {
        this.keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            this.keyboardDidShow,
        );
        this.keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            this.keyboardDidHide,
        );
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    jumpSlide = (number) => {
        this.mySwipper.scrollBy(number);
    }
    keyboardDidShow = () => {
        this.setState({
            showDots: false,
        });
    }

    keyboardDidHide = () => {
        this.setState({
            showDots: true,
        });
    }

    render() {
        return (
            <Swipers
                inputRef={(ref) => { this.mySwipper = ref; }}
                scrollEnabled={false}
                showsPagination={this.state.showDots}
                index={this.state.count === 0 ? 0 : 2}
                showsButtons={false}
                autoplay={false}
                loop={false}
                activeDot={<View style={{
                    backgroundColor: '#736063', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,
                }}
                />}
                dotColor="#bab0b4"
            >
                <View style={style.swipeScreen}>
                    <SignUpScreen
                        data={this.props}
                        planId={this.state.planSelected}
                        jump={this.jumpSlide}
                    />
                </View>
                <View style={style.swipeScreen}>
                    <SubscriptionPlanScreen
                        planName={this.state.planId === 'starter-monthly' ? 'Starter Monthly' : this.state.planId === 'standard-monthly' ? 'Standard Monthly' : 'Standard Yearly'}
                        data={this.props}
                        jump={this.jumpSlide}
                    />
                </View>
                <View
                    style={style.swipeScreen}
                    removeClippedSubviews
                >
                    <PasscodeScreen
                        data={this.props}
                        jump={this.jumpSlide}
                    />
                </View>
                <View
                    style={style.swipeScreen}
                    removeClippedSubviews
                >
                    <FrequencyScreen
                        data={this.props}
                        isShowHelpBlock
                    />
                </View>
            </Swipers>
        );
    }
}

SwiperScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(SwiperScreen);
