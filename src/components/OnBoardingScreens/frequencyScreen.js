import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';
import PropTypes from 'prop-types';
import commonStyle from '../Common/commonStyle';
import style from './onBoardingStyle';
import Icons from '../../utility/iconConstant';

class FrequencyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowHelpBlock: props.isShowHelpBlock,
        };
    }

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
        this.props.data.navigation.dispatch(reset);
    };

    render() {
        return (
            <View style={style.container}>
                <View>
                    <Image
                        source={Icons.SETTINGS}
                        style={commonStyle.iconStyles}
                    />
                </View>
                <View style={commonStyle.headerBox}>
                    <Text style={[commonStyle.headerTextStyle, commonStyle.headerFontSize, { marginTop: 10 }]}>LET US REMIND YOU</Text>
                    <Text style={[commonStyle.subHeadingText, { marginTop: 20 }]}>Set the frequency of your reminders</Text>
                    <Text style={[commonStyle.subHeadingText, { marginTop: 15 }]}>in your settings</Text>
                </View>
                <View style={style.cardContainer}>
                    <Image
                        source={Icons.FREQUENCY}
                        style={style.imageStyle}
                    />
                </View>
                <TouchableOpacity
                    style={style.nextStyle}
                    activeOpacity={0.8}
                    onPress={this.navigateToDashboard}
                >
                    <Text style={[commonStyle.linkText, {
                        fontSize: 18,
                        padding: 10,
                    }]}
                    >NEXT
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

FrequencyScreen.propTypes = {
    data: PropTypes.object.isRequired,
    isShowHelpBlock: PropTypes.bool.isRequired,
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(FrequencyScreen);
