import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';
import FontAwesome5Icons from 'react-native-vector-icons/FontAwesome5';
import Constant from '../../utility/constants';
import commonStyle from '../Common/commonStyle';
import style from './journalStyle';
import Config from '../../utility/config';
import JournalSection from './journalSection';


export default class JournalListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSection: false,
            // showSection: false,
            selectedItem: '',
            selectedSection: '',
            selectedSubSection: '',
            flagSelect: false,
        };
    }

    componentDidMount() {
        this.getJournalDetails();
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps && nextProps.journalSelected && nextProps.journalSelected === this.state.selectedItem) {
            this.setState({
                showSection: true,
                selectedSection: nextProps.sectionSelected,
                selectedSubSection: nextProps.subSectionSelected
            });
        } else {
            this.setState({
                showSection: false,
                selectedSection: nextProps.sectionSelected,
                selectedSubSection: nextProps.subSectionSelected
            });
        }
    }


    getJournalDetails = () => {
        if (this.props.promptedJournal === this.props.id) {
            this.setState({
                showSection: true,
                // showSection: true,
                selectedSection: this.props.sectionSelected,
                selectedSubSection: this.props.subSectionSelected,
                selectedItem: this.props.promptedJournal,
            }, () => this.props.selectJournal(this.props.promptedJournal));
        }
    };

    selectItemOpenJournalModal = (item) => {
        this.setState({
            showSection: false,
            selectedItem: item._id,
        }, () => {
            this.props.openDeleteJournalModal(item._id);
        });
    };


    selectItem = (item) => {
        this.setState({
            // showSection: false,
            selectedItem: this.state.selectedItem === item._id ? '' : item._id,
        }, () => {
            this.props.selectJournal(item._id, item.journalType);
        });
        if (item.sections.length === 0) {
            this.setState({
                flagSelect: !this.state.flagSelect,
            });
        }
        if (this.props.journalSelected === this.state.selectedItem) {
            this.setState({
                showSection: !this.state.showSection,
            });
        }
    };

    render() {
        const {
            showSection, selectedSection, selectedSubSection
        } = this.state;
        const {
            item, customModalJournal, promptedJournal
        } = this.props;
        return (
            <View style={customModalJournal ? { marginRight: 40 } : style.journalItemContainer}>
                <TouchableOpacity
                    onPress={() => this.selectItem(item)}
                    // style={customModalJournal ? style.customListItemContainer : style.listItemContainer}>
                    style={style.listItemContainer}
                >
                    <View style={style.rightContainer}>
                        <View style={style.imageCircle}>
                            <Image
                                source={{ uri: `${Config.BASE_URL}${item.image}` }}
                                style={style.imageCircle}
                            />
                        </View>
                    </View>
                    <View style={[commonStyle.contentCenter]}>
                        <Text
                            style={[commonStyle.subHeaderTextStyle, commonStyle.textFont14]}
                        >{_.toUpper(item.journalName)}
                        </Text>
                        <Text
                            style={[commonStyle.italicTextStyle, commonStyle.textFont12, commonStyle.paddingTop5]}
                        >{_.startCase(item.journalType + (item.journalType === Constant.CHILDHOOD_JOURNAL ? ' History' : ' Journal'))}
                        </Text>
                    </View>
                    { (item.journalType === 'childhood' && !(item.setting.childhood.childBirthDate) && this.props.hidePencil) &&
                     <TouchableOpacity
                         onPress={() => this.props.navigateToEditJournal(item)}
                         // navigateToEditJournal(item)}
                         style={style.customListItemContainerEditButton}
                     >
                         <View style={style.leftContainer}>
                             <FontAwesome5Icons name="pencil-alt" size={12} color={Constant.TEXT_COLOR} />
                         </View>
                     </TouchableOpacity>
                    }
                    {this.props.hidePencil &&
                    <TouchableOpacity
                        onPress={() => this.selectItemOpenJournalModal(item)}
                        style={style.customListItemContainerEditButton}
                    >
                        <View style={style.leftContainer}>
                            <FontAwesome5Icons name="trash-alt" size={20} color={Constant.TEXT_COLOR} />
                        </View>
                    </TouchableOpacity>}
                </TouchableOpacity>
                {this.props.hidePencil && showSection && item.journalType === Constant.EVERYDAY_JOURNAL ?
                    <Text style={[style.textStyle, { textAlign: 'center', fontSize: 14 }]}>
                        New prompts will be added to these categories every month.
                    </Text> : null
                }
                {showSection &&
                item.sections.map((section) => (
                    <JournalSection
                        section={section.section}
                        selectedSection={selectedSection}
                        selectedSubSection={selectedSubSection}
                        promptedJournal={promptedJournal === item._id}
                        key={section.section.name}
                        getPrompts={this.props.getPrompts}
                        // flagSelect={this.state.flagSelect}
                    />
                ))
                }
                {this.state.flagSelect &&
                <Text style={style.subHeaderTextStyle}>
                    No Sections/Subsections available
                </Text>
                }
            </View>
        );
    }
}

JournalListItem.propTypes = {
    navigateToEditJournal: PropTypes.func,
    subSectionSelected: PropTypes.string,
    hidePencil: PropTypes.bool.isRequired,
    customModalJournal: PropTypes.number.isRequired,
    journalSelected: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    sectionSelected: PropTypes.string.isRequired,
    selectJournal: PropTypes.func.isRequired,
    getPrompts: PropTypes.func.isRequired,
    openDeleteJournalModal: PropTypes.func,
    promptedJournal: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};
JournalListItem.defaultProps = {
    openDeleteJournalModal: () => {},
    navigateToEditJournal: () => {},
    subSectionSelected: ''
};
