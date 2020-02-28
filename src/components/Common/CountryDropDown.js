import React, { Component } from 'react';
import {
    Keyboard,
    Text,
    View,
    TouchableHighlight
} from 'react-native';
import PropTypes from 'prop-types';
import ModalDropdown from 'react-native-modal-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './commonStyle';
import constant from '../../utility/constants';


export default class CountryDropDown extends Component {
    displayRow= (data) => (
        <TouchableHighlight underlayColor="#E0D4C1" >
            <Text style={styles.rowTextStyle}>{data.countryName}</Text>
        </TouchableHighlight>
    );

    renderButtonTextValue = (rowData) => rowData.countryName;

    render() {
        const { value, containerStyle, textStyle } = this.props;
        return (
            <ModalDropdown
                ref={el => { this.ModalDropdown = el; }}
                {...this.props}
                textStyle={[styles.dropDownFieldTextStyle]}
                dropdownStyle={styles.dropDownStyle}
                dropdownTextStyle={styles.dropDownListTextStyle}
                renderButtonText={this.renderButtonTextValue}
                onDropdownWillShow={() => Keyboard.dismiss()}
                renderRow={this.displayRow}
                renderSeparator={() => (<View />)}
            >
                <View style={[styles.dropDownContainerStyle, containerStyle]}>
                    <View style={{ width: '90%' }}>
                        <Text style={[styles.dropDownTextStyle, textStyle]} numberOfLines={1}>{(value) || 'Select Country'}</Text>
                    </View>
                    <View style={{ width: '10%', justifyContent: 'flex-start' }}>
                        <FontAwesome
                            name="angle-down"
                            size={25}
                            color={constant.TEXT_COLOR}
                        />
                    </View>
                </View>
            </ModalDropdown>
        );
    }
}

CountryDropDown.propTypes = {
    value: PropTypes.string,
    containerStyle: PropTypes.object,
    textStyle: PropTypes.object,
};

CountryDropDown.defaultProps = {
    value: '',
    containerStyle: {},
    textStyle: {}
};
