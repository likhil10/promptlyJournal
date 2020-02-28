import React, { Component } from 'react';
import {
    FlatList,
    Image,
    NetInfo,
    View,
    InteractionManager,
    Keyboard,
    Platform,
    AsyncStorage
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ActionSheet from 'react-native-actionsheet';
import commonStyle from '../Common/commonStyle';
import Constant from '../../utility/constants';
import JournalListModal from './journalListModal';
import TabHeader from '../Common/tabHeader';
import Background from '../Common/background';
import { getPromptsAction } from '../../actions/getPromptsAction';
import { getPromptsNotificationAction } from '../../actions/getPromptsNotificationAction';
import { selectedJournalAction } from '../../actions/selectedJournalAction';
import Spinner from '../Common/spinner';
import PromptsItem from './Prompts/promptsItem';
import { savePromptAction } from '../../actions/savePromptAction';
import EditImageModal from './Prompts/editImageModal';
import QuestionModal from '../Common/questionModal';
import DeleteJournalModal from './Prompts/deleteJournalModal';
import DuplicatePromptModal from './Prompts/promptActions/duplicatePromptModal';
import DeletePromptModal from './Prompts/promptActions/deletePromptModal';
import WrittenByPromptModal from './Prompts/promptActions/writtenByPromptModal';
import MovePromptModal from './Prompts/promptActions/movePromptModal';
import ChangeTimeStampModal from './Prompts/promptActions/changeTimeStampModal';
import { openCameraAndGallery } from '../../utility/helperComponent';
import { propmtImageUploadAction } from '../../actions/promptImageUploadAction';
import AlertModal from '../Common/AlertModal';
import ImageModal from '../Common/ImageModal';
import { getJournalsAction } from '../../actions/getJournalsAction';
import { mixpanelTrackWithProperties } from '../../utility/mixpanelHelperComponent';
import { togglePromptFlag } from '../../actions/togglePromptFlag';
import CustomPromptModal from './Prompts/customPromptModal';

const TAB_ICON = require('../../assets/icons/icon_1.png');
const TAB_ICON_TRANSPARENT = require('../../assets/icons/journal_transparent.png');

class JournalScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        tabBarIcon: () => (
            <Image
                source={!navigation.isFocused() ? TAB_ICON_TRANSPARENT : TAB_ICON}
                style={commonStyle.tabIconStyle}
            />
        ),
        tabBarOnPress({ defaultHandler }) {
            navigation.state.params.openModal();
            defaultHandler();
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            open: true,
            editImageModal: false,
            exitPromptModal: false,
            imageSelected: '',
            editPromptSelected: '',
            journal: '',
            section: '',
            subSection: '',
            editPrompt: false,
            dataBlob: [],
            openAlertModal: false,
            openDuplicateModal: false,
            openDeleteModal: false,
            openWrittenByModal: false,
            openMoveModal: false,
            openTimeStampModal: false,
            openDeleteJournalModal: false,
            message: '',
            nextLineMessage: '',
            count: 0,
            openAlert: false,
            // message: '',
            openImage: false,
            uri: '',
            isDisabled: false,
            messageAlert: '',
            journalId: '',
            flag: false,
            totalYears: '',
            email: '',
            journalType: '',
            promptId: '',
            updatingImage: false,
            openCustomModal: false,
            customModalHeading: '',
            images: [],
            answer: '',
            hideSpinner: false
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                openModal: this.openModal
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        const { params } = nextProps.navigation.state;
        if (params) {
            if (params.id) {
                if ((params.id !== this.props.navigation.state.params.id) || (params.count !== this.state.count)) {
                    const itemLength = params.item.sections ? params.item.sections.length : '';
                    const { sections } = params.item;
                    if (params.count === 1) {
                        this.setState({
                            count: params.count,
                            journal: params.id,
                            section: params.section ? params.section : '',
                            subSection: params.subSection ? params.subSection : '',
                            promptId: params.promptid ? params.promptid : '',
                        }, () => { this.getPromptsAPIForNotification(); this.getPrompts(this.state.journal, this.state.section, nextProps.navigation.state.params.subSection ? nextProps.navigation.state.params.subSection : ''); });
                    } else if (params.count === 3) {
                        this.setState({
                            count: params.count,
                            journal: params.id,
                            section: params.section,
                            subSection: params.subSection,
                        }, () => this.getPrompts(this.state.journal, this.state.section, this.state.subSection ? this.state.subSection.name : ''));
                    } else {
                        this.setState({
                            count: params.count,
                            journal: params.item._id,
                            section: params.item.sections[params.item.sections.length - 1].section.name,
                            subSection: sections[itemLength - 1].section.subsection ? sections[itemLength - 1].section.subsection[sections[itemLength - 1].section.subsection.length - 1] : '',
                        }, () => this.getPrompts(this.state.journal, this.state.section, this.state.subSection ? this.state.subSection.name : ''));
                    }
                } else if (params.id === this.state.journal && params.count === 1 && this.state.promptId !== params.promptid) {
                    this.setState({
                        count: params.count,
                        journal: params.id,
                        section: params.section ? params.section : '',
                        subSection: params.subSection ? params.subSection : '',
                        promptId: params.promptid ? params.promptid : '',
                    }, () => { this.getPromptsAPIForNotification(); this.getPrompts(this.state.journal, this.state.section, nextProps.navigation.state.params.subSection ? nextProps.navigation.state.params.subSection : ''); });
                } else if (((this.state.journal === params.id && this.state.section !== params.section) || (this.state.journal === params.id && this.state.section === params.section && this.state.subSection === params.subSection)) && nextProps.promptFlag) {
                    this.setState({
                        count: params.count,
                        journal: params.id,
                        section: params.section,
                        subSection: params.subSection,
                    }, () => this.getPrompts(this.state.journal, this.state.section, this.state.subSection ? this.state.subSection.name : ''));
                } else {
                    this.setState({
                        open: false,
                    });
                }
            }
        }
        if (nextProps.navigation.state && nextProps.navigation.state.params
            && nextProps.navigation.state.params.openJournalModal && !this.state.open) {
            InteractionManager.runAfterInteractions(() => {
                this.props.navigation.setParams({
                    openJournalModal: false
                });
            });
            nextProps.navigation.state.params.openModal();
        }
    }

    setPropertyPicturesData = (data) => {
        const promptImages = [];
        let imageLarge = false;
        data.forEach((promptImage) => {
            if (promptImage.size < Constant.MAX_IMAGE_SIZE) {
                const pic = `data:${promptImage.mime};base64,${promptImage.data}`;
                promptImages.push({ image: pic });
            } else {
                imageLarge = true;
            }
        });

        if (imageLarge) {
            this.setState({
                openAlert: true,
                messageAlert: Constant.IMAGE_UPLOAD_SIZE_LIMIT
            });
        }

        if (promptImages.length > 0) {
            this.hitPromptUploadImageAPI(promptImages);
        }
    };

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL)
            .then((email) => {
                this.setState({
                    email,
                }, () => mixpanelTrackWithProperties(this.state.email.trim(), 'Prompt Saved', { 'Journal Type': this.state.journalType }));
            });
    };

    getPrompts = (journal, section, subSection) => {
        // this.closeModal();
        this.setState({
            journal,
            section,
            subSection,
            exitPromptModal: false,
        }, () => {
            this.closeModal(); this.hitGetPromptsAPI();
        });
    };

    getPromptsAPIForNotification = () => {
        const { journal, promptId } = this.state;
        const { dispatch } = this.props.navigation;
        const journalData = {
            journal_id: journal,
            prompt_id: promptId,
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    if (!this.state.openDeleteJournalModal) {
                        dispatch(getPromptsNotificationAction(journalData))
                            .then(res => {
                                this.setState({
                                    openCustomModal: true,
                                    answer: res.answer,
                                    images: res.images,
                                    customModalHeading: res.name,
                                });
                            })
                            .catch(err => {
                                this.setState({
                                    openAlert: true,
                                    messageAlert: err
                                });
                            });
                    }
                } else {
                    this.setState({
                        openAlert: true,
                        messageAlert: Constant.NETWORK_ERROR
                    });
                }
            });
    };

    hitGetPromptsAPI = (hideSpinner) => {
        !hideSpinner && this.listRef.scrollToPosition(0, 0);
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
                    if (!this.state.openDeleteJournalModal) {
                        this.setState({ hideSpinner: !!hideSpinner });
                        dispatch(getPromptsAction(journalData))
                            .then(res => {
                                const selectedJournalData = this.props.journalData.find(x => x._id === journal);
                                dispatch(selectedJournalAction(selectedJournalData))
                                    .then(() => {
                                        this.setState({
                                            dataBlob: res[0].prompts,
                                            totalYears: res[res.length - 1].totalYears > 0 ? res[res.length - 1].totalYears === 1 ? `${res[res.length - 1].totalYears} year` : `${res[res.length - 1].totalYears} years` : '',
                                            hideSpinner: false
                                        });
                                    });
                            })
                            .catch(err => {
                                this.setState({
                                    openAlert: !hideSpinner,
                                    messageAlert: err,
                                    hideSpinner: false
                                });
                            });
                    }
                } else {
                    this.setState({
                        openAlert: !hideSpinner,
                        messageAlert: Constant.NETWORK_ERROR,
                        hideSpinner: false
                    });
                }
            });
    };


    openModal = () => {
        Keyboard.dismiss();
        this.setState({
            open: true,
            editImageModal: false,
            editPrompt: false,
            exitPromptModal: false,
            openAlertModal: false,
            openDuplicateModal: false,
            openDeleteModal: false,
            openWrittenByModal: false,
            openMoveModal: false,
            openTimeStampModal: false,
            openDeleteJournalModal: false
        });
    };

    openModalImage = () => {
        this.setState({
            openAlert: true,
            messageAlert: Constant.IMAGE_UPLOAD_SUCCESS,
        });
    };

    openImagesModal = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message,
        });
    };


    closeModal = () => {
        const { journal, section } = this.state;
        if (journal && section) {
            // this.hitGetPromptsAPI();
            this.props.navigation.dispatch(togglePromptFlag(false));
            this.setState({ open: false }, () => this.hitGetPromptsAPI());
        } else {
            this.setState({ open: false }, () => this.hitGetJournalAPI());
        }
    };


    closeDeleteJournalModal = () => this.setState({ openDeleteJournalModal: false });

    showSuccessDelete = () => {
        this.setState({
            openAlert: true,
            messageAlert: Constant.DELETE_JOURNAL_SUCCESS,
            flag: true,
        });
    };

    closeAllModal = () => {
        this.setState({
            openAlert: false,
        }, () => {
            this.clearJournal(); this.hitGetJournalAPI();
        });
    };

    openDeleteJournalModal = (item) => {
        this.setState({
            open: false,
            journalId: item,
            openDeleteJournalModal: true
        });
    };


    hitSavePromptAPI = (prompt_id) => {
        const { journal } = this.state;
        const { dispatch } = this.props.navigation;
        const body = {
            is_save: true,
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(savePromptAction(journal, prompt_id, body))
                        .then(res => {
                            this.setState({
                                journalType: res[0].journalType
                            }, () => this.getEmail());
                            this.setState({
                                dataBlob: res[0].prompts,
                                openAlert: true,
                                messageAlert: Constant.PROMPT_SAVE_SUCCESS
                            });
                        })
                        .catch(err => {
                            this.setState({
                                openAlert: true,
                                messageAlert: err
                            });
                        });
                } else {
                    this.setState({
                        openAlert: true,
                        messageAlert: Constant.NETWORK_ERROR
                    });
                }
            });
    };

    hitGetJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        if (this.state.openDeleteJournalModal === false) {
            dispatch(getJournalsAction())
                .then(() => {
                    this.navigateToDashboard();
                })
                .catch(err => {
                    this.showAlert(err);
                });
        }
    };

    editImage = (prompt, image) => {
        this.setState({
            imageSelected: image,
            editPromptSelected: prompt,
        }, () => this.openEditImageModal());
    };

    openPrintedModal = (message, nextLineMessage) => {
        this.setState({
            message,
            nextLineMessage,
        }, () => this.openAlertModal());
    };

    openDuplicatePromptModal = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.openDuplicateModal());
    };

    openDeletePromptModal = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.openDeleteModal());
    };

    openWrittenByPromptModal = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.openWrittenByModal());
    };

    openMovePromptModal = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.openMoveModal());
    };

    openChangeTimeStampModal = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.openTimeStampModal());
    };

    trackMixPanel = (promptImages) => {
        const { journalSelected } = this.props;
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => promptImages && promptImages.length && promptImages.map(() =>
                mixpanelTrackWithProperties(
                    this.state.email, 'Prompt Image Uploaded',
                    { 'Journal Type': journalSelected && journalSelected.journalType ? journalSelected.journalType : '' }
                )));
        });
    };

    hitPromptUploadImageAPI = (promptImages) => {
        const { editPromptSelected, journal } = this.state;
        const { dispatch } = this.props.navigation;
        const body = {
            prompt_id: editPromptSelected._id,
            images: promptImages,
        };
        dispatch(propmtImageUploadAction(journal, body))
            .then(() => {
                this.hitGetPromptsAPI();
                this.setState({
                    openAlert: true,
                    messageAlert: Constant.IMAGE_UPLOAD_SUCCESS
                });
                this.trackMixPanel(promptImages);
            })
            .catch(err => {
                this.setState({
                    openAlert: true,
                    messageAlert: err
                });
            });
    };

    showSpinner = () => this.setState({ updatingImage: true });

    hideSpinner = () => this.setState({ updatingImage: false });

    openEditImageModal = () => this.setState({ editImageModal: true });

    closeEditImageModal = () => this.setState({ editImageModal: false });

    openQuestionModal = () => this.setState({ exitPromptModal: true });

    closeQuestionModal = () => this.setState({ exitPromptModal: false });

    openAlertModal = () => this.setState({ openAlertModal: true });

    closeAlertModal = () => this.setState({ openAlertModal: false });

    openDuplicateModal = () => this.setState({ openDuplicateModal: true });

    closeDuplicateModal = () => this.setState({ openDuplicateModal: false });

    openDeleteModal = () => this.setState({ openDeleteModal: true });

    closeDeleteModal = () => this.setState({ openDeleteModal: false });

    openWrittenByModal = () => this.setState({ openWrittenByModal: true });

    closeWrittenByModal = () => this.setState({ openWrittenByModal: false });

    openMoveModal = () => this.setState({ openMoveModal: true });

    closeMoveModal = () => this.setState({ openMoveModal: false });

    openTimeStampModal = () => this.setState({ openTimeStampModal: true });

    closeTimeStampModal = () => this.setState({ openTimeStampModal: false });

    requestCameraPermission = (index) => {
        if (index === 0 || index === 1) {
            openCameraAndGallery(index, true)
                .then(res => {
                    this.setPropertyPicturesData(index === 0 && Platform.OS === 'ios' ? [res] : res);
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    /**
     * Method to open action sheet.
     */
    showActionSheet = (prompt) => {
        this.setState({
            editPromptSelected: prompt,
        }, () => this.ActionSheet.show());
    };


    clearJournal = () => {
        this.setState({
            journal: ''
        });
    };


    navigateToEditJournal = (journalData) => {
        this.props.navigation.navigate('AddJournalScreen', {
            item: journalData.journalType,
            name: journalData.journalName,
            data: journalData,
            noContent: true,
            count: 1,
        });
    };

    navigateToDashboard = () => {
        const { navigate } = this.props.navigation;
        navigate('DashboardScreen');
    };

    closeAlert = () => {
        this.setState({
            openAlert: false
        });
    };

    openImage = (uri) => {
        this.setState({
            openImage: true,
            uri,
        });
    };

    closeImage = () => {
        this.setState({
            openImage: false
        }, () => {
            this.hitGetPromptsAPI();
        });
    };

    openAlertModalMessage = (msg) => {
        this.setState({
            openAlert: true,
            messageAlert: msg,
        });
    };

    openSearchAlertModal = () => {
        this.setState({
            openAlert: true,
            messageAlert: Constant.COMING_SOON,
        });
    };

    showAlert = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message
        });
    };

    closeCustomModal = () => {
        this.setState({ openCustomModal: false }, () => this.hitGetPromptsAPI());
    }

    openSuccessModal = () => {
        this.closeCustomModal();
        this.setState({
            openAlert: true,
            messageAlert: Constant.PROMPT_SAVE_SUCCESS
        });
    }

    render() {
        const {
            open, dataBlob, journal, editImageModal, imageSelected, editPromptSelected, editPrompt, exitPromptModal,
            openAlertModal, nextLineMessage, message, openDuplicateModal, openDeleteModal, openWrittenByModal, openMoveModal,
            openTimeStampModal, openDeleteJournalModal, section, subSection, isDisabled, journalId, totalYears, promptId,
            openCustomModal, customModalHeading, images, answer, hideSpinner
        } = this.state;
        const { journalSelected, journalData } = this.props;
        return (
            <Background
                journalType={journalSelected && journalSelected.journalType ? journalSelected.journalType : 'default'}
            >
                <TabHeader
                    openDeleteJournal={journal && section ? this.openDeleteJournalModal : false}
                    openModal={this.openModal}
                    journalData={journalSelected}
                    openImage={this.openImage}
                    totalYears={totalYears}
                    data={this.props}
                    disabled={isDisabled}
                    openAlertModal={this.openSearchAlertModal}
                    displayText=""
                    section={section}
                    subSection={subSection}
                />
                <KeyboardAwareScrollView
                    ref={ref => { this.listRef = ref; }}
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    enableResetScrollToCoords={false}
                    bounces={false}
                >
                    <View style={commonStyle.flexContainer}>
                        {/* <Text style={commonStyle.promptSectionTextStyle}> */}
                        {/* {section && subSection ? `${section.toUpperCase()} | ${subSection.name ? subSection.name.toUpperCase() : subSection.toUpperCase()}` : section.toUpperCase()} */}
                        {/* </Text> */}
                        <FlatList
                            data={dataBlob}
                            extraData={open}
                            renderItem={({ item }) =>
                                (<PromptsItem
                                    ref={ref => { this.PromptsItemRef = ref; }}
                                    {...this.props}
                                    prompt_id={promptId}
                                    openImagesModal={this.openImagesModal}
                                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                                    hitSavePromptAPI={this.hitSavePromptAPI}
                                    editImage={this.editImage}
                                    exitPrompt={this.openQuestionModal}
                                    openPrintedModal={this.openPrintedModal}
                                    openDuplicatePromptModal={this.openDuplicatePromptModal}
                                    openDeletePromptModal={this.openDeletePromptModal}
                                    openWrittenByPromptModal={this.openWrittenByPromptModal}
                                    openMovePromptModal={this.openMovePromptModal}
                                    openChangeTimeStampModal={this.openChangeTimeStampModal}
                                    showActionSheet={this.showActionSheet}
                                    item={item}
                                    editPrompt={open ? editPrompt : ''}
                                    journal_id={journal}
                                    key={item._id}
                                />)
                            }
                            contentContainerStyle={commonStyle.paddingBottom20}
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                </KeyboardAwareScrollView>
                <QuestionModal
                    {...this.props}
                    open={exitPromptModal}
                    close={this.closeQuestionModal}
                    message="Are you sure you want to delete this prompt?"
                />
                <AlertModal
                    {...this.props}
                    open={openAlertModal}
                    close={this.closeAlertModal}
                    message={message}
                    nextLineMessage={nextLineMessage}
                />
                <DuplicatePromptModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    open={openDuplicateModal}
                    close={this.closeDuplicateModal}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    prompt={editPromptSelected}
                    journal_id={journal}
                />
                <DeletePromptModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    open={openDeleteModal}
                    close={this.closeDeleteModal}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    prompt={editPromptSelected}
                    journal_id={journal}
                />
                <WrittenByPromptModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    open={openWrittenByModal}
                    close={this.closeWrittenByModal}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    prompt={editPromptSelected}
                    journal_id={journal}
                />
                <MovePromptModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    open={openMoveModal}
                    journalData={journalData}
                    fetchingData={this.props.fetching}
                    close={this.closeMoveModal}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    prompt={editPromptSelected}
                    journal_id={journal}
                />
                <ChangeTimeStampModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    open={openTimeStampModal}
                    journalData={journalData}
                    fetchingData={this.props.fetching}
                    close={this.closeTimeStampModal}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    prompt={editPromptSelected}
                    journal_id={journal}
                />
                <EditImageModal
                    {...this.props}
                    openAlertModalMessage={this.openAlertModalMessage}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    open={editImageModal}
                    openAlert={this.openImagesModal}
                    close={this.closeEditImageModal}
                    journal_id={journal}
                    imageSelected={imageSelected}
                    editPromptSelected={editPromptSelected}
                    showSpinner={this.showSpinner}
                    hideSpinner={this.hideSpinner}
                />
                <JournalListModal
                    open={open}
                    close={this.closeModal}
                    journalData={journalData}
                    fetchingData={this.props.fetching}
                    subSection={this.state.subSection ? this.state.subSection : ''}
                    section={this.state.section ? this.state.section : ''}
                    journal={this.state.journal ? this.state.journal : ''}
                    count={journalData}
                    navigate={this.props.navigation.navigate}
                    getPrompts={this.getPrompts}
                    closeDeleteJournalModal={this.closeDeleteJournalModal}
                    openDeleteJournalModal={this.openDeleteJournalModal}
                    navigateToEditJournal={this.navigateToEditJournal}
                />
                <DeleteJournalModal
                    {...this.props}
                    open={openDeleteJournalModal}
                    journal={journal}
                    journalId={journalId}
                    section={section}
                    subSection={subSection}
                    close={this.closeDeleteJournalModal}
                    showSuccessDelete={this.showSuccessDelete}
                    journalData={journalSelected}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                    clearJournal={this.clearJournal}
                />
                <ActionSheet
                    ref={o => { this.ActionSheet = o; }}
                    title="Which one do you like?"
                    options={['Camera', 'Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        this.requestCameraPermission(index);
                    }}
                />
                <CustomPromptModal
                    {...this.props}
                    open={openCustomModal}
                    customModalHeading={customModalHeading}
                    journal_id={journal}
                    prompt_id={promptId}
                    section={section}
                    answer={answer}
                    images={images}
                    showAlert={this.showAlert}
                    subSection={subSection}
                    close={this.closeCustomModal}
                    openSuccessModal={this.openSuccessModal}
                    journalData={journalData}
                    hitGetPromptsAPI={this.hitGetPromptsAPI}
                />
                <AlertModal
                    message={this.state.messageAlert}
                    open={this.state.openAlert}
                    close={this.state.flag ? this.closeAllModal : this.closeAlert}
                />
                <ImageModal
                    data={this.props.navigation}
                    open={this.state.openImage}
                    uri={this.state.uri}
                    close={this.closeImage}
                    journal={journalSelected}
                    openModal={this.openModalImage}
                />
                <Spinner
                    animating={(this.props.fetching2 && !hideSpinner) || this.props.promptsFetching || this.state.updatingImage}
                />
            </Background>
        );
    }
}

JournalScreen.propTypes = {
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    navigation: PropTypes.object.isRequired,
    journalSelected: PropTypes.object.isRequired,
    journalData: PropTypes.array,
    fetching2: PropTypes.bool.isRequired,
    promptsFetching: PropTypes.bool.isRequired,
    promptFlag: PropTypes.bool.isRequired
};
JournalScreen.defaultProps = {
    journalData: [],
};

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected,
    fetching: state.getJournalReducer.fetching,
    fetching2: state.getPromptsReducer.fetching,
    promptsFetching: state.promptImageUploadReducer.fetching
        || state.savePromptReducer.fetching || state.deletePromptImageReducer.fetching || state.deletePromptReducer.fetching
        // || state.editPromptReducer.fetching
        || state.duplicatePromptReducer.fetching || state.deletePromptImageReducer.fetching || state.movePromptReducer.fetching
        || state.changeAuthorReducer.fetching || state.createCustomPromptReducer.fetching || state.promptImageUpdateReducer.fetching
        || state.getJournalReducer.fetching || state.deleteJournalReducer.fetching || state.rotateImageReducer.fetching,
    journalData: state.getJournalReducer.journalData,
    journalSelected: state.selectedJournalReducer.journalSelected,
    promptFlag: state.togglePrompt.promptFlag,
});

export default connect(mapStateToProps)(JournalScreen);
