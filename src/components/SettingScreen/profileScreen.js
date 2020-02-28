import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';
import style from './settingStyle';
import CountryDropDownSearch from '../Common/CountryDropDownSearch';
import constants from '../../utility/constants';

export default class ProfileScreen extends Component {
    billingAndShippingInfo = (info) => {
        const { selectDropDownData, currentState } = this.props;
        const countryOptions = currentState && currentState.countryCodes;
        return (
            <View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Address 1', `${info}AddressOne`, 'Address 1', 'keyboardText')
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Address 2', `${info}AddressTwo`, 'Address 2', 'keyboardText')
                        }
                    </View>
                </View>
                <View>
                    <View style={{ width: '95%' }}>
                        <Text style={[style.textStyle, { marginVertical: 5 }]}>Country</Text>
                        <View style={{
                            borderWidth: 1,
                            borderColor: '#736063',
                            marginBottom: 10
                        }}
                        />
                        <CountryDropDownSearch
                            items={countryOptions}
                            selectedItems={[currentState[`${info}Country`]]}
                            onSelectedItemsChange={(rowData) => {
                                selectDropDownData(rowData, `${info}Country`);
                            }}
                            containerStyle={style.dropDownContainerStyle}
                            mainContainer={style.dropDownMainContainerStyle}
                            textStyle={style.linkTextStyle}
                            fontFamily={constants.TEXT_FONT}
                            altFontFamily={constants.TEXT_FONT}
                        />
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('City', `${info}City`, 'City', 'keyboardText')
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('State', `${info}State`, 'State', 'keyboardText')
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Zip Code', `${info}ZipCode`, 'Zip Code', 'keyboardNumeric', false, 5)
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Contact No', `${info}ContactNo`, 'Contact No', 'keyboardNumeric', false, 14)
                        }
                    </View>
                </View>
            </View>);
    }

    renderTextView = (label, value, placeholder, keyboardType, secure, length) => {
        const { handleTextChange, currentState } = this.props;
        return (
            <View style={{ width: '95%' }}>
                <Text style={[style.textStyle, { marginVertical: 5 }]}>{label}</Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#736063'
                }}
                />
                <TextInput
                    {...this.props}
                    style={[style.linkTextStyle, { height: 40 }]}
                    value={currentState[value]}
                    placeholder={placeholder}
                    maxLength={(length) || 30}
                    keyboardType={(keyboardType === 'keyboardText') ? 'email-address' : 'numeric'}
                    secureTextEntry={!!secure}
                    autoCorrect={false}
                    placeholderTextColor="#ddd5cd"
                    autoCapitalize="none"
                    editable={value !== 'emailId'}
                    onChangeText={handleTextChange(value)}
                />
            </View>
        );
    };

    renderPasswordField = (label, value, placeholder) => {
        const { handleTextChange, currentState } = this.props;
        return (
            <View style={{ width: '95%' }}>
                <Text style={[style.textStyle, { marginVertical: 5 }]}>{label}</Text>
                <View style={{
                    borderWidth: 1,
                    borderColor: '#736063'
                }}
                />
                <TextInput
                    {...this.props}
                    style={[style.linkTextStyle, { height: 40 }]}
                    value={currentState[value]}
                    placeholder={placeholder}
                    maxLength={16}
                    placeholderTextColor="#ddd5cd"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={handleTextChange(value)}
                    secureTextEntry
                />
            </View>
        );
    };

    render() {
        const { saveProfileInformation } = this.props;
        return (
            <View style={{ marginBottom: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('First Name*', 'firstName', 'First Name', 'keyboardText')
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Last Name*', 'lastName', 'Last Name', 'keyboardText')
                        }
                    </View>
                </View>
                <View>
                    {
                        this.renderTextView('Email', 'emailId', 'Email', 'keyboardText')
                    }
                </View>
                <View>
                    {
                        this.renderPasswordField('Old Password', 'oldPassword', 'Old Password', 'keyboardText', true)
                    }
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderPasswordField('New Password', 'newPassword', 'New Password', 'keyboardText', true)
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderPasswordField('Confirm Password', 'confirmPassword', 'Confirm Password', 'keyboardText', true)
                        }
                    </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        justifyContent: 'flex-start',
                        alignSelf: 'flex-start',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('Old Passcode', 'oldPasscode', 'Enter Old Passcode', 'numeric', true, 4)
                        }
                    </View>
                    <View style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        width: '48%'
                    }}
                    >
                        {
                            this.renderTextView('New Passcode', 'newPasscode', 'Enter New Passcode', 'numeric', true, 4)
                        }
                    </View>
                </View>
                <Text style={[style.headerTextStyle, { marginTop: 20 }]}>BILLING INFO</Text>
                {
                    this.billingAndShippingInfo('billing')
                }
                <Text style={[style.headerTextStyle, { marginTop: 20 }]}>SHIPPING INFO</Text>
                {
                    this.billingAndShippingInfo('shipping')
                }
                <View style={{
                    width: '100%',
                    alignItems: 'flex-end'
                }}
                >
                    <TouchableOpacity
                        onPress={saveProfileInformation}
                        style={style.pillShapedButton}
                    >
                        <Text
                            style={[style.textStyle, {
                                paddingBottom: 0,
                                textAlign: 'center',
                                fontSize: 18,
                            }]}
                        >Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

ProfileScreen.propTypes = {
    handleText: PropTypes.func,
    handleTextChange: PropTypes.func.isRequired,
    saveProfileInformation: PropTypes.func.isRequired,
    selectDropDownData: PropTypes.func.isRequired,
    currentState: PropTypes.object.isRequired,
};
ProfileScreen.defaultProps = {
    handleText: () => {},
};
