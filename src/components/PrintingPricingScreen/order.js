import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    ScrollView
} from 'react-native';
import PropTypes from 'prop-types';
import style from './printingStyles';
import Constant from '../../utility/constants';
import { isEmpty } from '../../utility/helperComponent';


const SOFTCOVER = require('../../assets/icons/softcover.png');
const HARDCOVER = require('../../assets/icons/hardcover.png');

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    navigateToCartScreen = () => {
        this.props.clearState();
        this.props.navigation.navigate('CartScreen');
    }

    render() {
        const {
            thirdLine, secondLine, firstLine, softCover, color, projectName, clearState, estimatedAmount
        } = this.props;
        const textColor = !softCover ? '#cfc57c' : (color === '#f4f4f4' ? '#5f5f61' : '#fff');
        return (
            <View style={[style.container]}>
                <ScrollView
                    alwaysBounceVertical={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[style.container, style.justifyAlign, { paddingHorizontal: 20 }]}>
                        <Text style={[style.headerText, { fontSize: 25 }]}>ADDED TO CART</Text>
                        <View style={style.cartUnderLine} />
                        <Text style={[style.headerText, { fontSize: 18 }]}>{projectName}</Text>
                        <View style={style.orderBookContainer}>
                            <ImageBackground
                                source={softCover ? SOFTCOVER : HARDCOVER}
                                style={style.bookImage}
                                resizeMode="stretch"
                            >
                                <View style={[style.overlayView, { backgroundColor: color }]}>
                                    <View style={[style.coverTextContainer, style.justifyAlign]}>
                                        <Text style={[style.firstLine, { color: textColor }]}>
                                            {firstLine.trim().toUpperCase()}
                                        </Text>
                                        <Text style={[style.secondLine, { color: textColor }]}>
                                            {secondLine.trim()}
                                        </Text>
                                        {
                                            !isEmpty(thirdLine.trim()) ? <View style={[style.bookLine, { borderColor: textColor }]} /> : null
                                        }
                                        <Text style={[style.thirdLine, { color: textColor }]}>
                                            {thirdLine.trim()}
                                        </Text>
                                    </View>
                                </View>
                            </ImageBackground>
                        </View>
                        <Text style={style.printOrderAmount}>
                            ${estimatedAmount && estimatedAmount.toFixed(2)}
                        </Text>
                        <TouchableOpacity
                            onPress={() => clearState()}
                            style={style.buttonBox}
                        >
                            <Text style={[style.buttonText, { fontSize: 14 }]}>PRINT ANOTHER JOURNAL</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.navigateToCartScreen()}
                            style={style.buttonBox}
                        >
                            <Text style={[style.buttonText, { fontSize: 14 }]}>GO TO CART</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

Order.propTypes = {
    navigation: PropTypes.object.isRequired,
    firstLine: PropTypes.string.isRequired,
    secondLine: PropTypes.string.isRequired,
    thirdLine: PropTypes.string.isRequired,
    projectName: PropTypes.string.isRequired,
    softCover: PropTypes.bool.isRequired,
    color: PropTypes.string.isRequired,
    clearState: PropTypes.func.isRequired,
    estimatedAmount: PropTypes.number.isRequired,
};

Order.defaultProps = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Order);
