import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    FlatList,
    NetInfo,
    AsyncStorage,
} from 'react-native';
import Modal from 'react-native-simple-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import commonStyle from '../../../Common/commonStyle';
import Constant from '../../../../utility/constants';
import JournalListItem from '../../journalListItem';
import Spinner from '../../../Common/spinner';
import { movePromptAction } from '../../../../actions/movePromptAction';
import { mixpanelTrackWithProperties } from '../../../../utility/mixpanelHelperComponent';

export default class MovePromptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            journalSelected: '',
            sectionSelected: '',
            subSectionSelected: '',
            promptedJournal: '',
            email: '',
            journalType: '',
        };
        this.initialState = this.state;
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrackWithProperties(this.state.email, 'Prompt Moved', { 'Journal Type': this.state.journalType }));
        });
    }

    modalDidClose = () => {
        this.props.close();
        this.setState(this.initialState);
    };

    hitMovePromptAPI = (body) => {
        const { prompt, journal_id } = this.props;
        const { dispatch } = this.props.navigation;
        this.props.close();
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(movePromptAction(journal_id, prompt._id, body))
                        .then(res => {
                            this.setState({
                                journalType: res[0].journalType,
                            }, () => this.getEmail());
                            this.props.hitGetPromptsAPI();
                            this.props.openAlertModalMessage(Constant.MOVE_PROMPT_SUCCESS);
                        })
                        .catch(err => {
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };


    /**
     * Method to select journal
     */
    selectJournal = (id) => {
        this.setState({ journalSelected: id });
    };

    movePrompts = (section, subSection) => {
        const body = {
            destination_journal_id: this.state.journalSelected,
            section,
            subsection: subSection
        };
        this.hitMovePromptAPI(body);
    };

    render() {
        const {
            open, close, journalData, fetchingData
        } = this.props;
        const {
            journalSelected, sectionSelected, subSectionSelected, promptedJournal
        } = this.state;
        return (
            <Modal
                open={open}
                modalStyle={commonStyle.modalStyle}
                modalDidClose={this.modalDidClose}
            >
                <View style={commonStyle.modelContainer}>
                    <View style={commonStyle.leftContainer}>
                        <TouchableOpacity
                            onPress={close}
                        >
                            <Ionicons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyle.modalCenterContainer}>
                        <View style={commonStyle.modalContentContainer}>
                            <View style={commonStyle.flexContainer}>
                                {!fetchingData && <FlatList
                                    data={journalData}
                                    extraData={journalSelected}
                                    renderItem={({ item }) =>
                                        (<JournalListItem
                                            item={item}
                                            customModalJournal={0}
                                            selectJournal={this.selectJournal}
                                            getPrompts={this.movePrompts}
                                            journalSelected={journalSelected}
                                            promptedJournal={promptedJournal}
                                            sectionSelected={sectionSelected}
                                            subSectionSelected={subSectionSelected}
                                            id={item._id}
                                            hidePencil={false}
                                        />)
                                    }
                                    ListEmptyComponent={() =>
                                        (
                                            <Text
                                                style={[commonStyle.subHeaderTextStyle, commonStyle.textCenter]}
                                            >
                                                {Constant.BLANK_JOURNAL_TEXT}
                                            </Text>)
                                    }
                                    bounces={false}
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item, index) => index.toString()}
                                />}
                            </View>
                            <Spinner
                                animating={fetchingData}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

MovePromptModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journal_id: PropTypes.string.isRequired,
    journalData: PropTypes.array,
    prompt: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    fetchingData: PropTypes.bool.isRequired,
};

MovePromptModal.defaultProps = {
    journalData: [],
};
