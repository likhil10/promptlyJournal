import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { CheckBox } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import style from './printingStyles';
import commonStyle from '../Common/commonStyle';
import Constant from '../../utility/constants';
import Config from '../../utility/config';
import DatePickerBox from '../Common/datePickerBox';


class Interior extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fromDate: props.fromDate ? props.fromDate : '',
            toDate: props.toDate ? props.toDate : '',
        };
    }

    handleTextChange = field => (text) => {
        this.props.handleTextChange(field, text);
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    renderCards = (item) => (
        <TouchableOpacity
            onPress={() => this.props.toggleSelectJournal(item._id)}
            key={item._id}
        >
            <View style={commonStyle.listItemContainers}>
                <CheckBox
                    style={style.checkBoxStyle}
                    checkedColor="#736063"
                    uncheckedColor="#736063"
                    containerStyle={[style.containerStyle, { backgroundColor: '#fafafa' }]}
                    checked={this.props.selectedJournal === item._id}
                    onPress={() => this.props.toggleSelectJournal(item._id)}
                />
                <View style={commonStyle.imageCircle}>
                    <Image
                        source={{ uri: `${Config.BASE_URL}${item.image}` }}
                        style={commonStyle.imageCircle}
                    />
                </View>
                <View style={commonStyle.contentCenter}>
                    <Text style={commonStyle.subHeaderTextStyle}>{_.toUpper(item.journalName)}</Text>
                    <Text
                        style={[commonStyle.italicTextStyle, commonStyle.paddingTop5]}
                    >{_.startCase(item.journalType + (item.journalType === Constant.CHILDHOOD_JOURNAL ? ' History' : ' Journal'))}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        const { journalData, printBy, togglePrintByOption } = this.props;
        const { fromDate, toDate } = this.state;
        return (
            <View style={[style.container, style.justifyAlign, { paddingHorizontal: 20 }]}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={commonStyle.marginVertical10}>
                        <View style={commonStyle.marginVertical10}>
                            <Text style={[commonStyle.subHeaderTextStyle, { fontWeight: '900' }]}>JOURNAL SELECTION</Text>
                            <View style={[style.underlines, commonStyle.marginVertical10]} />
                            <Text style={[commonStyle.underlineTextStyle]}>
                                Click on the journal you would like to print entries from. You can add 1 book to your cart at a time.
                            </Text>
                            {
                                journalData && journalData.length ? journalData.map((value) => (this.renderCards(value))) :
                                    <Text style={[commonStyle.underlineTextStyle, { paddingVertical: 10, fontSize: 16 }]}>
                                     No Journal Available
                                    </Text>
                            }
                        </View>
                        <View style={commonStyle.marginVertical10}>
                            <Text style={commonStyle.subHeaderTextStyle}>PRINT BY...</Text>
                            <View style={[style.underlines, commonStyle.marginVertical10]} />
                            <View>
                                <View style={style.rowContainer}>
                                    <View style={style.boxContainer}>
                                        <CheckBox
                                            style={style.checkBoxStyle}
                                            checkedColor="#736063"
                                            uncheckedColor="#736063"
                                            containerStyle={[style.containerStyle]}
                                            checked={printBy === 'all'}
                                            onPress={() => togglePrintByOption('all')}
                                        />
                                    </View>
                                    <Text style={commonStyle.subHeaderTextStyle} onPress={() => togglePrintByOption('all')}>
                                        ALL ENTRIES
                                    </Text>
                                </View>
                                <View style={style.rowContainer}>
                                    <View style={style.boxContainer}>
                                        <CheckBox
                                            style={style.checkBoxStyle}
                                            checkedColor="#736063"
                                            uncheckedColor="#736063"
                                            containerStyle={[style.containerStyle]}
                                            checked={printBy === 'date'}
                                            onPress={() => togglePrintByOption('date')}
                                        />
                                    </View>
                                    <Text style={[commonStyle.subHeaderTextStyle]} onPress={() => togglePrintByOption('date')}>
                                        DATE RANGE
                                    </Text>
                                </View>
                                <View style={style.rowContainer}>
                                    <View style={style.boxContainer} />
                                    <View>
                                        <DatePickerBox
                                            placeholder="FROM"
                                            handleText={this.handleTextChange('fromDate')}
                                            value={fromDate}
                                            calendarIcon="color"
                                            customStyle={style.datePickerStyle}
                                            disabled={printBy !== 'date'}
                                        />
                                        <DatePickerBox
                                            placeholder="TO"
                                            handleText={this.handleTextChange('toDate')}
                                            value={toDate}
                                            calendarIcon="color"
                                            customStyle={style.datePickerStyle}
                                            disabled={printBy !== 'date'}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

Interior.propTypes = {
    journalData: PropTypes.array,
    handleTextChange: PropTypes.func.isRequired,
    togglePrintByOption: PropTypes.func.isRequired,
    toggleSelectJournal: PropTypes.func.isRequired,
    fromDate: PropTypes.string,
    toDate: PropTypes.string,
    printBy: PropTypes.string,
    selectedJournal: PropTypes.string,
};

Interior.defaultProps = {
    fromDate: '',
    toDate: '',
    printBy: '',
    selectedJournal: '',
    journalData: []
};

const mapStateToProps = (state) => ({
    journalData: state.getJournalReducer.journalData,
});

export default connect(mapStateToProps)(Interior);
