import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, AsyncStorage,
} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import commonStyle from '../Common/commonStyle';
import style from './journalStyle';
import Constant from '../../utility/constants';


export default class JournalSubSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flagSelect: false
        };
    }

    setValueToAsyncStorage = async () => {
        await AsyncStorage.setItem('IS_JOURNAL_SELECTED', 'false');
    };

    selectItem = (subSection) => {
        const { flagSelect } = this.state;
        this.setValueToAsyncStorage();
        this.props.getPrompts(this.props.section, subSection.name);
        this.setState({ flagSelect: !flagSelect });
    };

    render() {
        const { subSection, promptedJournal } = this.props;
        return (
            <TouchableOpacity
                onPress={() => this.selectItem(subSection)}
                style={style.linkContainer}
            >
                <View style={style.sectionsRightContainer} />
                <View
                    style={(subSection.name === this.props.selectedSubSection) && promptedJournal ? [{ backgroundColor: Constant.TEXT_COLOR }, commonStyle.padding3] : commonStyle.padding3}
                >
                    <Text style={(subSection.name === this.props.selectedSubSection) && promptedJournal ? [commonStyle.subHeaderTextStyle, {
                        fontSize: 12,
                        color: '#fff'
                    }] : [commonStyle.subHeaderTextStyle, { fontSize: 12 }]}
                    >{_.toUpper(subSection.name)}
                    </Text>
                </View>
            </TouchableOpacity>

        );
    }
}

JournalSubSection.propTypes = {
    section: PropTypes.string.isRequired,
    subSection: PropTypes.object.isRequired,
    getPrompts: PropTypes.func.isRequired,
    selectedSubSection: PropTypes.string,
    promptedJournal: PropTypes.bool,
};

JournalSubSection.defaultProps = {
    selectedSubSection: '',
    promptedJournal: false
};
