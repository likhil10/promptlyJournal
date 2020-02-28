import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
} from 'react-native';
import PropTypes from 'prop-types';
import style from './orderStyle';


class OrderDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { data, data: { shippingAddress, billingAddress } } = this.props;
        return (
            <View style={style.detailsContainer} >
                <Text style={style.textStyle}>Order ID: {data.orderNumber}</Text>
                {
                    data.orderStatus === 'Shipped' && <Text style={[style.textStyle, { marginTop: 10 }]}>Tracking ID: {data.trackingId}</Text>
                }
                <View style={[style.itemContainer, { justifyContent: 'space-between', alignItems: 'flex-start' }]} >
                    {
                        data && data.billingAddress ?
                            <View style={style.billingContainer}>
                                <Text style={style.subHeaderTextStyle}>
                                    BILLING DETAILS
                                </Text>
                                <Text style={style.italicTextStyle}>
                                    {billingAddress.address1}
                                </Text>
                                {
                                    billingAddress.address2 ?
                                        <Text style={style.italicTextStyle}>
                                            {billingAddress.address2}
                                        </Text> : null
                                }
                                <Text style={style.italicTextStyle}>
                                    {billingAddress.city} {billingAddress.state} {billingAddress.zipcode}, {billingAddress.country}
                                </Text>
                                <Text style={style.italicTextStyle}>
                                    {billingAddress.contactNumber}
                                </Text>
                            </View> : null
                    }
                    {
                        data && data.shippingAddress ?
                            <View style={style.shippingContainer}>
                                <Text style={style.subHeaderTextStyle}>
                                    SHIPPING DETAILS
                                </Text>
                                <Text style={style.italicTextStyle}>
                                    {shippingAddress.address1}
                                </Text>
                                {
                                    billingAddress.address2 ?
                                        <Text style={style.italicTextStyle}>
                                            {billingAddress.address2}
                                        </Text> : null
                                }
                                <Text style={style.italicTextStyle}>
                                    {shippingAddress.city} {shippingAddress.state} {shippingAddress.zipcode}, {shippingAddress.country}
                                </Text>
                                <Text style={style.italicTextStyle}>
                                    {shippingAddress.contactNumber}
                                </Text>
                            </View> : null
                    }
                </View>
            </View>
        );
    }
}

OrderDetails.propTypes = {
    data: PropTypes.object.isRequired,
};

OrderDetails.defaultProps = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps)(OrderDetails);
