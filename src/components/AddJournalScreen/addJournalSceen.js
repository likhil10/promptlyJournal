import React, { Component } from 'react';
import {
    Image,
    InteractionManager,
    Keyboard,
    NetInfo,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationEvents } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PropTypes from 'prop-types';
import commonStyle from '../Common/commonStyle';
import Spinner from '../../components/Common/spinner';
import TabHeader from '../Common/tabHeader';
import SelectJournal from './selectJournal';
import JournalSettings from './journalSettings';
import Background from '../Common/background';
import CustomPromptModal from '../JournalScreen/Prompts/customPromptModal';
import { getPromptsAction } from '../../actions/getPromptsAction';
import { selectedJournalAction } from '../../actions/selectedJournalAction';
import Constant from '../../utility/constants';
import AlertModal from '../Common/AlertModal';
import { getJournalsAction } from '../../actions/getJournalsAction';
import ChildhoodScreen from './childhoodScreen';

const TAB_ICON = require('../../assets/icons/icon_2.png');
const TAB_ICON_TRANSPARENT = require('../../assets/icons/plus_transparent.png');

class AddJournalScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: () => (
            <Image
                source={!navigation.isFocused() ? TAB_ICON_TRANSPARENT : TAB_ICON}
                style={commonStyle.tabIconStyle}
            />
        ),
        tabBarOnPress({ defaultHandler }) {
            navigation.state.params.clearSelectedJournal();
            defaultHandler();
        }
    });
    constructor(props) {
        super(props);
        this.state = {
            typeSelected: '',
            name: '',
            data: '',
            firstDate: '',
            secondDate: '',
            openCustomModal: props.journalData ? props.journalData.length !== 0 : false,
            journal: '',
            section: '',
            subSection: '',
            isDisabled: true,
            openAlert: false,
            messageAlert: '',
            nextLineMessage: '',
            responseSuccess: false,
            noContent: false,
            journalId: '',
            customModalHeading: '',
            save: false,
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                clearSelectedJournal: this.openCustomModal
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.navigation.state.params) {
            this.setState({
                openCustomModal: nextProps.navigation.state.params.addJournalFlag,
                noContent: nextProps.navigation.state.params.noContent,
            });
            if (nextProps.navigation.state.params.data) {
                if (nextProps.navigation.state.params.count === 1 && this.state.journalId !== nextProps.navigation.state.params.data._id) {
                    this.setState({
                        save: true,
                        typeSelected: nextProps.navigation.state.params.item,
                        noContent: nextProps.navigation.state.params.noContent,
                        journalId: nextProps.navigation.state.params.data._id,
                    });
                }
            }
        }
    }

    openModal = () => {
        this.closeCustomModal();
        this.setState({
            openAlert: true,
            messageAlert: Constant.CUSTOM_PROMPT_SUCCESS
        });
    }

    closeCustomModal = () => {
        this.setState({ openCustomModal: false });
    }

    openCustomModal = () => {
        this.setState({ openCustomModal: this.props.journalData ? this.props.journalData.length !== 0 : true, customModalHeading: 'CUSTOM ENTRY' });
    }

    hitGetPromptsAPI = () => {
        this.listRef.scrollToPosition(0, 0);
        const { journal, section, subSection } = this.state;
        const { dispatch } = this.props.navigation;
        const journalData = {
            journal,
            section,
            subSection,
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(getPromptsAction(journalData))
                        .then(() => {
                            const selectedJournalData = this.props.journalData.find(x => x._id === journal);
                            dispatch(selectedJournalAction(selectedJournalData))
                                .then(() => {
                                    // this.setState({ dataBlob: res[0].prompts });
                                });
                        })
                        .catch(err => {
                            this.showAlert(err);
                        });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    closeModal = () => {
        this.setState({
            openAlert: false,
            nextLineMessage: '',
        }, () => this.hitGetJournalAPI());
    };


    navigateToDashboard = () => {
        Keyboard.dismiss();
        const { navigate } = this.props.navigation;
        if (this.state.responseSuccess) {
            this.setState({
                responseSuccess: false,
            });
            navigate('DashboardScreen');
        }
    }

    hitGetJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        if (this.state.responseSuccess) {
            dispatch(getJournalsAction())
                .then(() => {
                    this.clearSelectedJournal();
                    this.setState({
                        firstDate: '',
                        secondDate: ''
                    }, () => this.navigateToDashboard());
                })
                .catch(err => {
                    this.setState({
                        responseSuccess: false,
                    });
                    this.props.showAlert(err);
                });
        }
    };

    /**
     * Method to select journal type
     */
    typeSelected = (type) => {
        this.setState({ typeSelected: type });
    };
    /**
     * Method to clear journal type
     */
    clearSelectedJournal = () => {
        this.setState({
            typeSelected: '', save: false, noContent: false, journalId: ''
        });
    };

    showAlert = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message
        });
    };

    openCreateJournalSuccessModal = () => {
        this.setState({
            openAlert: true,
            messageAlert: 'PLEASE NOTE:',
            responseSuccess: true,
            nextLineMessage: Constant.CREATE_JOURNAL_SUCCESS_NOTE,
        });
    }

    openUpdateJournalSuccessModal = () => {
        this.setState({
            openAlert: true,
            messageAlert: Constant.SAVE_JOURNAL_SUCCESS,
            responseSuccess: true,
        });
    }

    render() {
        const {
            journalData, journalSelected
        } = this.props;
        const {
            openCustomModal, journal, section, subSection, isDisabled, noContent, journalId, customModalHeading, save,
        } = this.state;
        return (
            <Background
                journalType={journalSelected && journalSelected.journalType ? journalSelected.journalType : 'default'}
            >
                <View style={(this.state.typeSelected === Constant.CHILDHOOD_JOURNAL || this.state.typeSelected === Constant.EVERYDAY_JOURNAL) ? { flex: 1, height: '100%', backgroundColor: '#b6afb2' } : { flex: 1, height: '100%' }}>
                    <TabHeader
                        journalData={journalSelected}
                        disabled={isDisabled}
                        openAlertModal={() => this.showAlert(Constant.COMING_SOON)}
                        displayText="Add Journal"
                    />
                    <NavigationEvents
                        onDidBlur={() => this.clearSelectedJournal()}
                    />
                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps="handled"
                        bounces={false}
                    >

                        {!this.state.typeSelected ?
                            <SelectJournal
                                typeSelected={this.typeSelected}
                            />
                            :
                            this.state.typeSelected === 'childhood' ?
                                <ChildhoodScreen
                                    {...this.props}
                                    clearJournal={this.clearSelectedJournal}
                                    openCreateJournalSuccessModal={this.openCreateJournalSuccessModal}
                                    openUpdateJournalSuccessModal={this.openUpdateJournalSuccessModal}
                                    showAlert={this.showAlert}
                                    save={save}
                                    noContent={noContent}
                                    journalId={journalId}
                                />
                                :
                                (this.state.typeSelected === 'love story' || this.state.typeSelected === 'adoption' || this.state.typeSelected === 'travel' || this.state.typeSelected === 'everyday') &&
                            <JournalSettings
                                {...this.props}
                                journalSelected={this.state.typeSelected}
                                journalPropsName={this.state.name}
                                journalFirstDate={this.state.firstDate}
                                journalSecondDate={this.state.secondDate}
                                journalData={this.state.data}
                                clearJournal={this.clearSelectedJournal}
                                openCreateJournalSuccessModal={this.openCreateJournalSuccessModal}
                                showAlert={this.showAlert}
                                save={save}
                            />
                        }
                    </KeyboardAwareScrollView>

                    <CustomPromptModal
                        {...this.props}
                        open={openCustomModal}
                        customModalHeading={customModalHeading}
                        journal={journal}
                        section={section}
                        showAlert={this.showAlert}
                        subSection={subSection}
                        close={this.closeCustomModal}
                        openModal={this.openModal}
                        journalData={journalData}
                        hitGetPromptsAPI={this.hitGetPromptsAPI}
                    />
                    <AlertModal
                        message={this.state.messageAlert}
                        nextLineMessage={this.state.nextLineMessage}
                        open={this.state.openAlert}
                        close={this.closeModal}
                    />
                    <Spinner
                        animating={this.props.fetching}
                    />
                </View>
            </Background>
        );
    }
}

AddJournalScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    journalSelected: PropTypes.object.isRequired,
    showAlert: PropTypes.func,
    journalData: PropTypes.array,
};

AddJournalScreen.defaultProps = {
    journalData: [],
    showAlert: () => {}
};

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected,
    fetching: state.createJournalReducer.fetching || state.getJournalReducer.fetching || state.getPromptsReducer.fetching || state.updateJournalReducer.fetching
        || state.createCustomPromptReducer.fetching,
    journalSelected: state.selectedJournalReducer.journalSelected,
    journalData: state.getJournalReducer.journalData,
});


export default connect(mapStateToProps)(AddJournalScreen);
