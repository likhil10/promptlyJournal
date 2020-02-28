import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import style from './cartStyle';
import InputBox from '../Common/InputBox';
import CountryDropDownSearch from '../Common/CountryDropDownSearch';
import commonStyle from '../Common/commonStyle';
import { usPhoneNumberFormat } from '../../utility/helperComponent';


class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            billingInfo: _.cloneDeep(this.props.billingInfo),
            selectedItems: [this.props.billingInfo ? this.props.billingInfo.country : '']
        };
    }

    handleTextChange = (field, type) => (text) => {
        const statusCopy = Object.assign({}, this.state);
        this.props.handleTextChange(field, type, text.trim());
        statusCopy[type][field] = field === 'contactNumber' ? usPhoneNumberFormat(text) : text;
        this.setState(statusCopy);
    };

    selectDropDownData = selectedItems => {
        this.props.handleTextChange('country', 'billingInfo', selectedItems[0]);
        this.setState({ selectedItems });
    };

    render() {
        const { cartData } = this.props;
        const { billingInfo } = this.state;
        const cartFullData = cartData && cartData.data;
        const countryOptions = cartFullData && cartFullData.countryCodes;
        return (
            <View style={commonStyle.paddingVertical20}>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>FIRST NAME*</Text>
                    <InputBox
                        value={billingInfo.firstName}
                        onChangeText={this.handleTextChange('firstName', 'billingInfo')}
                        returnKeyType="next"
                        onSubmitEditing={() => {
                            this.lastName.refs.lastName.focus();
                        }}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>LAST NAME*</Text>
                    <InputBox
                        textInputRef="lastName"
                        ref={el => { this.lastName = el; }}
                        value={billingInfo.lastName}
                        onChangeText={this.handleTextChange('lastName', 'billingInfo')}
                        onSubmitEditing={() => {
                            this.address1.refs.address1.focus();
                        }}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>ADDRESS1*</Text>
                    <InputBox
                        textInputRef="address1"
                        ref={el => { this.address1 = el; }}
                        value={billingInfo.address1}
                        onChangeText={this.handleTextChange('address1', 'billingInfo')}
                        onSubmitEditing={() => {
                            this.address2.refs.address2.focus();
                        }}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>ADDRESS2</Text>
                    <InputBox
                        textInputRef="address2"
                        ref={el => { this.address2 = el; }}
                        value={billingInfo.address2}
                        onChangeText={this.handleTextChange('address2', 'billingInfo')}
                        onSubmitEditing={() => {
                            this.city.refs.city.focus();
                        }}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>CITY*</Text>
                    <InputBox
                        textInputRef="city"
                        ref={el => { this.city = el; }}
                        value={billingInfo.city}
                        onChangeText={this.handleTextChange('city', 'billingInfo')}
                        onSubmitEditing={() => {
                            this.addedState.refs.addedState.focus();
                        }}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>STATE*</Text>
                    <InputBox
                        textInputRef="addedState"
                        ref={el => { this.addedState = el; }}
                        value={billingInfo.state}
                        onChangeText={this.handleTextChange('state', 'billingInfo')}
                        customStyle={{ width: '60%' }}
                        onSubmitEditing={() => {
                            this.zipCode.refs.zipCode.focus();
                        }}
                    />
                </View>
                <View style={[commonStyle.marginVertical10, { width: '100%' }]}>
                    <Text style={[style.subHeadingTextStyle]}>ZIP CODE*</Text>
                    <InputBox
                        textInputRef="zipCode"
                        ref={el => { this.zipCode = el; }}
                        value={billingInfo.zipcode}
                        onChangeText={this.handleTextChange('zipcode', 'billingInfo')}
                        customStyle={{ width: '60%' }}
                        onSubmitEditing={() => {
                            this.email.refs.email.focus();
                        }}
                        keyboardType="numeric"
                        length={5}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>COUNTRY*</Text>
                    <CountryDropDownSearch
                        items={countryOptions}
                        selectedItems={this.state.selectedItems}
                        onSelectedItemsChange={this.selectDropDownData}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>EMAIL ADDRESS*</Text>
                    <InputBox
                        textInputRef="email"
                        ref={el => { this.email = el; }}
                        value={cartFullData && cartFullData.userId && cartFullData.userId.basic && cartFullData.userId.basic.email}
                        onSubmitEditing={() => {
                            this.phone.refs.phone.focus();
                        }}
                        keyboardType="email-address"
                        editable={false}
                    />
                </View>
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>PHONE NO*</Text>
                    <InputBox
                        textInputRef="phone"
                        ref={el => { this.phone = el; }}
                        value={billingInfo.contactNumber}
                        onChangeText={this.handleTextChange('contactNumber', 'billingInfo')}
                        keyboardType="phone-pad"
                        length={14}
                    />
                </View>
            </View>
        );
    }
}

Billing.propTypes = {
    billingInfo: PropTypes.object.isRequired,
    handleTextChange: PropTypes.func.isRequired,
    cartData: PropTypes.object.isRequired,
};

Billing.defaultProps = {
};

const mapStateToProps = (state) => ({
    cartData: state.getCartReducer.cartData
});

export default connect(mapStateToProps)(Billing);
