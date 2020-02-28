import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity, AsyncStorage,
} from 'react-native';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import style from './journalStyle';
import JournalSubSection from './journalSubSection';

export default class JournalSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSubSections: false,
            flagSelect: false
        };
    }

    componentDidMount() {
        this.showSubSections();
    }

    setValueToAsyncStorage = async () => {
        await AsyncStorage.setItem('IS_JOURNAL_SELECTED', 'false');
    };

    showSubSections() {
        const { section, promptedJournal } = this.props;
        if (section.name === this.props.selectedSection && section.subsection.length > 0 && promptedJournal) {
            this.setState({
                showSubSections: true,
            });
        }
    }

    selectItem = (section) => {
        const { showSubSections, flagSelect } = this.state;
        // const {flagSelect} = this.props
        this.setValueToAsyncStorage();
        this.setState(
            { showSubSections: !showSubSections, flagSelect: !flagSelect },
            () => {
                if (section.subsection.length === 0) { this.props.getPrompts(section.name, null); }
            }
        );
    };


    render() {
        const { showSubSections } = this.state;
        const { section, selectedSubSection, promptedJournal } = this.props;
        return (
            <View
                style={style.linkContainer}
            >
                <View style={[style.sectionsRightContainer, { paddingTop: 5 }]}>
                    {section.subsection.length > 0 &&
                    <View style={style.leftContainer}>
                        <TouchableOpacity
                            onPress={() => this.selectItem(section)}
                        >
                            <FontAwesome5Icons
                                name="angle-down"
                                size={20}
                                color="#c8c8c8"
                                style={style.downArrowIcon}
                            />
                        </TouchableOpacity>
                    </View>
                    }
                </View>
                <View
                    style={((section.name === this.props.selectedSection) && (section.subsection.length === 0)) && promptedJournal ? [{ backgroundColor: Constant.TEXT_COLOR }, commonStyle.padding1] : [{ backgroundColor: '#fff', padding: 1, marginTop: 5 }]}
                >
                    <TouchableOpacity
                        onPress={() => this.selectItem(section)}
                    >
                        <Text
                            style={((section.name === this.props.selectedSection) && (section.subsection.length === 0)) && promptedJournal ? [commonStyle.subHeaderTextStyle, { fontSize: 11.5, color: '#fff' }] : [commonStyle.subHeaderTextStyle, { fontSize: 11.5 }]}
                        >{
                                _.toUpper(section.name)}
                        </Text>
                    </TouchableOpacity>
                    {showSubSections &&
                    section.subsection.map((subSection) => (
                        <JournalSubSection
                            section={section.name}
                            subSection={subSection}
                            selectedSubSection={selectedSubSection}
                            promptedJournal={promptedJournal}
                            key={subSection.name}
                            getPrompts={this.props.getPrompts}
                        />))
                    }
                </View>
            </View>

        );
    }
}

JournalSection.propTypes = {
    selectedSection: PropTypes.string.isRequired,
    selectedSubSection: PropTypes.string,
    promptedJournal: PropTypes.bool,
    section: PropTypes.object.isRequired,
    getPrompts: PropTypes.func.isRequired,
};

JournalSection.defaultProps = {
    selectedSubSection: '',
    promptedJournal: false
};
