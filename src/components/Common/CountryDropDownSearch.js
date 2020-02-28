import React, { Component } from 'react';
import {
    View,
    Platform,
    StyleSheet
} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import PropTypes from 'prop-types';
import constant from '../../utility/constants';


export default class CountryDropDownSearch extends Component {
    render() {
        const { containerStyle, textStyle, mainContainer } = this.props;
        return (
            <View style={[styles.mainContainer, mainContainer]}>
                <MultiSelect
                    ref={(component) => { this.multiSelect = component; }}
                    single
                    fixedHeight={false}
                    hideTags
                    displayKey="countryName"
                    uniqueKey="countryCode"
                    altFontFamily={constant.PARAGRAPH_TEXT_FONT}
                    fontFamily={constant.PARAGRAPH_TEXT_FONT}
                    selectText="Select Country"
                    searchInputPlaceholderText="Search Country..."
                    selectedItemTextColor="#3e1f1f"
                    selectedItemIconColor="#3e1f1f"
                    itemTextColor={constant.TEXT_COLOR}
                    itemFontFamily={constant.PARAGRAPH_TEXT_FONT}
                    flatListProps={{ nestedScrollEnabled: true }}
                    styleDropdownMenu={styles.styleDropdownMenu}
                    styleDropdownMenuSubsection={[styles.styleDropdownMenuSubsection, containerStyle]}
                    styleInputGroup={[styles.styleInputGroup]}
                    styleItemsContainer={styles.styleItemsContainer}
                    styleTextDropdown={[styles.styleTextDropdown, textStyle]}
                    styleSelectorContainer={[styles.styleSelectorContainer]}
                    styleTextDropdownSelected={[styles.styleTextDropdownSelected, textStyle]}
                    {...this.props}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        marginTop: 10
    },
    styleDropdownMenu: {
        marginBottom: 0,
    },
    styleDropdownMenuSubsection: {
        paddingHorizontal: 5,
        backgroundColor: '#e4e1e1',
        borderBottomWidth: 0
    },
    styleInputGroup: {
        backgroundColor: '#e4e1e1',
        paddingRight: 16,
        paddingVertical: Platform.OS === 'ios' ? 10 : 0,
    },
    styleItemsContainer: {
        borderWidth: 1,
        borderColor: constant.TEXT_COLOR,
        backgroundColor: 'transparent',
        height: 250
    },
    styleTextDropdown: {
        fontSize: 16,
        color: constant.TEXT_COLOR,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
        backgroundColor: 'transparent',
    },
    styleSelectorContainer: {
        marginBottom: 0,
        backgroundColor: 'transparent',
    },
    styleTextDropdownSelected: {
        fontSize: 16,
        color: constant.TEXT_COLOR
    },
});

CountryDropDownSearch.propTypes = {
    containerStyle: PropTypes.object,
    mainContainer: PropTypes.object,
    textStyle: PropTypes.object,
};

CountryDropDownSearch.defaultProps = {
    mainContainer: {},
    containerStyle: {},
    textStyle: {}
};
