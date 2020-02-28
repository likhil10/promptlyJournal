import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity,
    NetInfo,
} from 'react-native';
import BraintreeDropIn from 'react-native-braintree-dropin-ui';
import Ionicons from 'react-native-vector-icons/Ionicons';
import _ from 'lodash';
import PropTypes from 'prop-types';
import style from './cartStyle';
import commonStyle from '../Common/commonStyle';
import { brainTreePaymentAction } from '../../actions/brainTreePaymentAction';
import Constant from '../../utility/constants';

class Payment extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    brainTreeUI = (res) => {
        const { addPaymentMethod } = this.props;
        BraintreeDropIn.show({
            clientToken: res,
            googlePay: false,
            applePay: false,
            payPal: true
        }).then(result => addPaymentMethod(result))
            .catch((error) => {
                console.log(error);
            });
    }

    addPayment = () => {
        const { dispatch } = this.props.navigation;
        const { showAlert } = this.props;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                dispatch(brainTreePaymentAction())
                    .then(res => {
                        this.brainTreeUI(res);
                    })
                    .catch(err => {
                        showAlert(err);
                    });
            } else {
                showAlert(Constant.NETWORK_ERROR);
            }
        });
    };

    render() {
        const { addedPayment } = this.props;
        return (
            <View style={commonStyle.paddingVertical20}>
                {!_.isEmpty(addedPayment) ?
                    <View style={style.paymentBox}>
                        <View style={{ width: '70%', paddingLeft: 10 }}>
                            <Text style={[style.paymentBoxText]}>
                                {addedPayment.description && (addedPayment.description.charAt(0).toUpperCase() + addedPayment.description.slice(1))}
                            </Text>
                            <Text style={[style.paymentBoxText, { fontSize: 14 }]}>
                                {addedPayment.type && addedPayment.type}
                            </Text>
                        </View>
                        <View style={{ width: '20%', alignItems: 'center' }}>
                            <Ionicons name="ios-checkmark-circle" size={40} color="#219653" />
                        </View>
                    </View> : null
                }
                <TouchableOpacity
                    onPress={() => this.addPayment()}
                    style={style.themeButtonBox}
                >
                    <Text style={[style.themeButtonText]}>{!_.isEmpty(addedPayment) ? 'ADD OTHER PAYMENT METHOD' : 'ADD PAYMENT METHOD'}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

Payment.propTypes = {
    navigation: PropTypes.object.isRequired,
    showAlert: PropTypes.func.isRequired,
    addPaymentMethod: PropTypes.func.isRequired,
    addedPayment: PropTypes.object,
};

Payment.defaultProps = {
    addedPayment: {}
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(Payment);
