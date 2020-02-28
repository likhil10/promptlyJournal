import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CheckBox } from 'react-native-elements';
import style from './cartStyle';
import InputBox from '../Common/InputBox';
import commonStyle from '../Common/commonStyle';
import CountryDropDownSearch from '../Common/CountryDropDownSearch';
import { usPhoneNumberFormat } from '../../utility/helperComponent';


class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shippingInfo: _.cloneDeep(this.props.shippingInfo),
            selectedItems: [this.props.shippingInfo ? this.props.shippingInfo.country : '']
        };
    }

    handleTextChange = (field, type) => (text) => {
        const statusCopy = Object.assign({}, this.state);
        this.props.handleTextChange(field, type, text.trim());
        statusCopy[type][field] = field === 'contactNumber' ? usPhoneNumberFormat(text) : text;
        this.setState(statusCopy);
    };
    selectDropDownData = selectedItems => {
        this.props.handleTextChange('country', 'shippingInfo', selectedItems[0]);
        this.setState({ selectedItems });
    };

    render() {
        const {
            sameAsBilling, toggleSameBillingOption, cartData, selectedShipping, toggleShippingOption, shippingInfo
        } = this.props;
        const cartFullData = cartData && cartData.data;
        const shippingOptions = cartFullData && cartFullData.shippingOptions;
        const countryOptions = cartFullData && cartFullData.countryCodes;
        return (
            <View style={commonStyle.paddingVertical20}>
                <View style={style.rowContainer}>
                    <View style={style.boxContainer}>
                        <CheckBox
                            style={style.checkBoxStyle}
                            checkedColor="#736063"
                            uncheckedColor="#736063"
                            containerStyle={style.boxContainerStyle}
                            checked={sameAsBilling}
                            onPress={() => toggleSameBillingOption()}
                        />
                    </View>
                    <Text style={style.subHeadingTextStyle} onPress={() => toggleSameBillingOption()}>
                        SAME AS BILLING
                    </Text>
                </View>
                { !sameAsBilling &&
                <View>
                    <View style={commonStyle.marginVertical10}>
                        <Text style={[style.subHeadingTextStyle]}>FIRST NAME*</Text>
                        <InputBox
                            value={shippingInfo.firstName}
                            onChangeText={this.handleTextChange('firstName', 'shippingInfo')}
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
                            value={shippingInfo.lastName}
                            onChangeText={this.handleTextChange('lastName', 'shippingInfo')}
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
                            value={shippingInfo.address1}
                            onChangeText={this.handleTextChange('address1', 'shippingInfo')}
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
                            value={shippingInfo.address2}
                            onChangeText={this.handleTextChange('address2', 'shippingInfo')}
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
                            value={shippingInfo.city}
                            onChangeText={this.handleTextChange('city', 'shippingInfo')}
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
                            value={shippingInfo.state}
                            onChangeText={this.handleTextChange('state', 'shippingInfo')}
                            customStyle={{ width: '60%' }}
                            onSubmitEditing={() => {
                                this.zipCode.refs.zipCode.focus();
                            }}
                        />
                    </View>
                    <View style={commonStyle.marginVertical10}>
                        <Text style={[style.subHeadingTextStyle]}>ZIP CODE*</Text>
                        <InputBox
                            textInputRef="zipCode"
                            ref={el => { this.zipCode = el; }}
                            value={shippingInfo.zipcode}
                            onChangeText={this.handleTextChange('zipcode', 'shippingInfo')}
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
                            value={shippingInfo.contactNumber}
                            onChangeText={this.handleTextChange('contactNumber', 'shippingInfo')}
                            keyboardType="phone-pad"
                            length={14}
                        />
                    </View>
                </View>
                }
                <View style={[style.underlines, { borderColor: '#EFEFEF', borderWidth: 1 }]} />
                <View style={commonStyle.marginVertical10}>
                    <Text style={[style.subHeadingTextStyle]}>SHIPPING OPTIONS</Text>
                    {
                        shippingOptions && shippingOptions.length && shippingOptions.map((item) => item && (
                            <TouchableOpacity
                                style={style.shippingOption}
                                key={item._id}
                                onPress={() => toggleShippingOption(item)}
                                activeOpacity={0.8}
                            >
                                <View style={{ width: '15%' }}>
                                    <CheckBox
                                        style={style.checkBoxStyle}
                                        checkedColor="#736063"
                                        uncheckedColor="#736063"
                                        containerStyle={style.boxContainerStyle}
                                        checked={selectedShipping && item._id === selectedShipping._id}
                                        onPress={() => toggleShippingOption(item)}
                                    />
                                </View>
                                <View style={{ width: '55%', }}>
                                    <Text style={[style.subHeadingTextStyle]}>{item.type}</Text>
                                </View>
                                <View style={{ width: '30%' }}>
                                    <Text style={[style.totalTextStyle]}>${item.amount}</Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </View>
            </View>
        );
    }
}

Shipping.propTypes = {
    sameAsBilling: PropTypes.bool,
    cartData: PropTypes.object.isRequired,
    toggleSameBillingOption: PropTypes.func.isRequired,
    toggleShippingOption: PropTypes.func.isRequired,
    selectedShipping: PropTypes.object,
    shippingInfo: PropTypes.object.isRequired,
    handleTextChange: PropTypes.func.isRequired
};

Shipping.defaultProps = {
    sameAsBilling: false,
    selectedShipping: {}
};

const mapStateToProps = (state) => ({
    cartData: state.getCartReducer.cartData
});

export default connect(mapStateToProps)(Shipping);
