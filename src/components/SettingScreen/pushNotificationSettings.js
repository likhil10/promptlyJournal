import React, { Component } from 'react';
import {
    Text,
    View,
    Keyboard,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import ModalDropdown from 'react-native-modal-dropdown';
import PropTypes from 'prop-types';
import styles from './settingStyle';

const { width } = Dimensions.get('window');

export default class PushNotificationSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // frequency: ['1 time', '2 times', '3 times', '4 times', '5 times', '6 times', '7 times',
            //     '8 times', '9 times', '10 times'],
            // period: ['a day', 'a week', 'a month', 'a year'],
            timeZone: ['EST', 'CST', 'MST', 'PST'],
            selectedTimeZone: '',
            // checked: false,
        };
    }

    displayRow= (data) => (
        <Text style={{
            textAlign: 'center',
            paddingVertical: 10
        }}
        >{data.name}
        </Text>
    );

    selectData = (rowId, rowData) => {
        this.setState({
            selectedTimeZone: rowData
        }, () => this.props.selectTimeZone(this.state.selectedTimeZone));
    };

    renderButtonTextValue = (rowData) => rowData.name;

    renderDropDownMenu = () => {
        const {
            settingPageInfo, selectDropDownData, frequencyPeriods, frequencyTimes
        } = this.props;
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.onePartitionBlock}>
                    <View style={[styles.partitionInputBlock, styles.dropDownBlockStyle]}>
                        <View style={styles.dropDownTextBlockForPartitionView}>
                            <ModalDropdown
                                ref={el => { this.frequencyTimes = el; }}
                                textStyle={[styles.dropDownFieldTextStyle, { textAlign: 'center' }]}
                                options={settingPageInfo.frequencyTimes}
                                dropdownStyle={styles.dropDownStyleForGender}
                                dropdownTextStyle={styles.dropDownListTextStyle}
                                renderButtonText={this.renderButtonTextValue}
                                defaultValue={(frequencyTimes) || 'Select Frequency'}
                                onDropdownWillShow={() => Keyboard.dismiss()}
                                placeholderColor={{ color: '#ccc' }}
                                onSelect={(rowId, rowData) => {
                                    selectDropDownData(rowId, rowData, 'frequencyTimes', 'frequencyTimesId');
                                }}
                                renderRow={this.displayRow}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.secondPartitionBlock}>
                    <View style={styles.onePartitionBlock}>
                        <View style={[styles.partitionInputBlock, styles.dropDownBlockStyle]}>
                            <View style={styles.dropDownTextBlockForPartitionView}>
                                <ModalDropdown
                                    ref={el => { this.frequencyPeriods = el; }}
                                    textStyle={[styles.dropDownFieldTextStyle, { textAlign: 'center' }]}
                                    options={settingPageInfo.frequencyPeriods}
                                    dropdownStyle={styles.dropDownStyle}
                                    dropdownTextStyle={styles.dropDownListTextStyle}
                                    renderButtonText={this.renderButtonTextValue}
                                    defaultValue={(frequencyPeriods) || 'Select Period'}
                                    placeholderColor={{ color: '#ccc' }}
                                    onSelect={(rowId, rowData) => {
                                        selectDropDownData(rowId, rowData, 'frequencyPeriods', 'frequencyPeriodsId');
                                    }}
                                    renderRow={this.displayRow}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    };

    renderDynamicCheckboxField = (value) => {
        const { handleCheckboxPress, renderDays } = this.props;
        return (
            <View key={value._id} style={{ width: '33%' }}>
                <CheckBox
                    title={value.value}
                    textStyle={{ color: '#736063', backgroundColor: '#ffffff', }}
                    checked={renderDays.map((e) => e.day_id)
                        .indexOf(value._id) !== -1}
                    checkedColor="#736063"
                    uncheckedColor="#736063"
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderWidth: 0,
                        padding: 0
                    }}
                    onPress={() => handleCheckboxPress(value)}
                />
            </View>
        );
    };

    renderTimeCheckbox = (value) => {
        const { handleTimeCheckboxPress, renderTime } = this.props;
        const checkboxTitle = value.time + value.unit;
        return (
            <View key={value._id} style={{ width: '33%' }}>
                <CheckBox
                    title={checkboxTitle}
                    textStyle={{ color: '#736063', backgroundColor: '#ffffff', }}
                    checked={renderTime.map((e) => e.time_id)
                        .indexOf(value._id) !== -1}
                    checkedColor="#736063"
                    uncheckedColor="#736063"
                    containerStyle={{
                        backgroundColor: '#ffffff',
                        borderWidth: 0,
                        padding: 0
                    }}
                    onPress={() => handleTimeCheckboxPress(value)}
                />
            </View>
        );
    };

    renderDays = () => {
        const { settingPageInfo } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap'
            }}
            >
                {
                    settingPageInfo.availableDaysOfWeek.map((value, index) => (this.renderDynamicCheckboxField(value, index)))
                }
            </View>
        );
    };

    renderTime = () => {
        const { settingPageInfo } = this.props;
        return (
            <View style={{
                flexDirection: 'row',
                width: '100%',
                flexWrap: 'wrap',
                borderColor: '#ffffff',
            }}
            >
                {
                    settingPageInfo.availableTimesOfDay.map((value, index) => (this.renderTimeCheckbox(value, index)))
                }
            </View>
        );
    };

    render() {
        const { savePushNotification, selectDropDown, timeZoneValue } = this.props;
        return (
            <View style={{ marginBottom: 20 }}>
                <View>
                    <Text style={[styles.textStyle, { marginBottom: 10 }]}>Frequency of push notification prompts</Text>
                    {
                        this.renderDropDownMenu()
                    }
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: '#736063',
                        width: '35%',
                        marginVertical: 20
                    }}
                    />
                </View>
                <View>
                    <Text style={[styles.textStyle, {
                        marginBottom: 10,
                        paddingTop: 0
                    }]}
                    >
                        Days of the week I&apos;m available for push notification prompts
                    </Text>
                    {
                        this.renderDays()
                    }
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: '#736063',
                        width: '35%',
                        marginVertical: 20
                    }}
                    />
                </View>
                <View>
                    <Text style={[styles.textStyle, {
                        marginBottom: 10,
                        paddingTop: 0
                    }]}
                    >
                        Times on those days I&apos;d like to be prompted
                    </Text>
                    {
                        this.renderTime()
                    }
                    <View style={{
                        borderWidth: 0.5,
                        borderColor: '#ffffff',
                        width: '35%',
                        marginVertical: 20
                    }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                    >
                        <Text style={[styles.textStyle, {
                            marginVertical: 7,
                            paddingTop: 0
                        }]}
                        >Time Zone:
                        </Text>
                        <View style={[styles.onePartitionBlock, {
                            marginTop: 3,
                            marginLeft: 3
                        }]}
                        >
                            <View style={[styles.partitionInputBlock, styles.dropDownBlockStyle]}>
                                <View style={[{
                                    width: width * 0.43,
                                    justifyContent: 'center'
                                }]}
                                >
                                    <ModalDropdown
                                        ref={el => { this.gender = el; }}
                                        textStyle={[styles.dropDownFieldTextStyle, { paddingLeft: width * 0.16 }]}
                                        options={this.state.timeZone}
                                        dropdownStyle={[styles.dropDownStyleForGender]}
                                        dropdownTextStyle={styles.dropDownListTextStyle}
                                        defaultValue={(timeZoneValue) || 'Select'}
                                        onDropdownWillShow={() => Keyboard.dismiss()}
                                        placeholderColor={{ color: '#ccc' }}
                                        onSelect={(rowId, rowData) => {
                                            selectDropDown(rowId, rowData, 'timeZoneValue');
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        width: '100%',
                        alignItems: 'flex-end'
                    }}
                    >
                        <TouchableOpacity
                            onPress={savePushNotification}
                            style={styles.pillShapedButton}
                        >
                            <Text
                                style={[styles.textStyle, {
                                    paddingBottom: 0,
                                    textAlign: 'center',
                                    fontSize: 18,
                                }]}
                            >Save
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

PushNotificationSettings.propTypes = {
    selectTimeZone: PropTypes.func.isRequired,
    handleTimeCheckboxPress: PropTypes.func.isRequired,
    handleCheckboxPress: PropTypes.func.isRequired,
    renderTime: PropTypes.array.isRequired,
    renderDays: PropTypes.array.isRequired,
    settingPageInfo: PropTypes.object.isRequired,
    selectDropDownData: PropTypes.func.isRequired,
    savePushNotification: PropTypes.func.isRequired,
    selectDropDown: PropTypes.func.isRequired,
    frequencyPeriods: PropTypes.string.isRequired,
    frequencyTimes: PropTypes.string.isRequired,
    timeZoneValue: PropTypes.string.isRequired
};
