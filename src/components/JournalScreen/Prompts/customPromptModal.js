import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    NetInfo,
    Platform,
    TextInput,
    Text,
    FlatList,
    ScrollView,
    Image,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-simple-modal';
import _ from 'lodash';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import ActionSheet from 'react-native-actionsheet';
import commonStyle from '../../Common/commonStyle';
import Constant from '../../../utility/constants';
import styles from '../journalStyle';
import { openCameraAndGallery } from '../../../utility/helperComponent';
import { createCustomPromptAction } from '../../../actions/createCustomPrompt';
import CustomPromptsImageItem from './customPromptImageItem';
import Spinner from '../../Common/spinner';
import JournalListItem from '../journalListItem';
import AlertModal from '../../Common/AlertModal';
import {
    mixpanelTrack,
    mixpanelTrackWithProperties
} from '../../../utility/mixpanelHelperComponent';
import { editPromptAction } from '../../../actions/editPromptAction';

const IMAGE_ICON = require('../../../assets/icons/image-icon-transparent.png');

const textHeight = 19;

export default class CustomPromptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            answer: '',
            height: textHeight,
            lines: 1,
            journalSelected: '',
            sectionSelected: '',
            subSectionSelected: '',
            promptedJournal: '',
            promptImages: !props.customModalHeading === 'CUSTOM ENTRY' ? props.images : [],
            journalType: '',
            spinner: false,
            open: false,
            email: '',
        };
        this.initialState = this.state;
    }

    componentWillReceiveProps(nextProps) {
        if (!(this.props.customModalHeading === 'CUSTOM ENTRY') && this.state.answer !== nextProps.answer) {
            this.setState({
                answer: nextProps.answer,
            });
        }
    }

    getContentHeight = (event) => {
        const { nativeEvent: { contentSize: { height } } } = event;
        const lines = Math.round(height / textHeight);
        const visibleHeight = textHeight * lines;
        this.setState({ height: visibleHeight, lines });
    };

    getPrompts = (section, subSection) => {
        this.setState({
            promptedJournal: this.state.journalSelected,
            sectionSelected: section,
            subSectionSelected: subSection
        });
        this.props.getPrompts(this.state.journalSelected, section, subSection);
    };


    setPropertyPicturesData = (data) => {
        const promptImages = [];
        if (data.length > Constant.JOURNAL_IMAGE_LIMIT) {
            this.setState({ spinner: false });
            this.setState({
                open: true,
                message: Constant.IMAGE_UPLOAD_LIMIT
            });
        } else {
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
                    open: true,
                    message: Constant.IMAGE_UPLOAD_SIZE_LIMIT
                });
            }
            this.setState({ spinner: false });
            this.setState({ promptImages });
        }
    };

    trackMixPanel = () => {
        const { promptImages, journalType } = this.state;
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => {
                mixpanelTrack('Custom Prompt Created', this.state.email);
                if (promptImages && promptImages.length) {
                    promptImages.map(() => mixpanelTrackWithProperties(
                        this.state.email, 'Prompt Image Uploaded',
                        { 'Journal Type': journalType }
                    ));
                }
            });
        });
    };

    hitCreateCustomPromptAPI = (body) => {
        const { dispatch } = this.props.navigation;
        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected) {
                dispatch(createCustomPromptAction(body))
                    .then(() => {
                        this.trackMixPanel();
                        this.props.openModal();
                    })
                    .catch(err => {
                        if (err === 'Journal not available') {
                            this.props.showAlert(Constant.SELECT_JOURNAL);
                        } else {
                            this.setState({
                                open: true,
                                message: err
                            });
                        }
                    });
            } else {
                this.setState({
                    open: true,
                    message: Constant.NETWORK_ERROR
                });
            }
        });
    };

    movePrompts = (section, subSection) => {
        this.setState({
            promptedJournal: this.state.journalSelected,
            sectionSelected: section,
            subSectionSelected: subSection
        });
    };

    /**
     * Method to select journal
     */
    selectJournal = (id, journalType) => {
        this.setState({
            journalSelected: id,
            journalType: journalType === undefined ? this.state.journalType : journalType
        });
    };

    validateCustomPrompt = () => {
        const { journalSelected, sectionSelected } = this.state;
        if (journalSelected !== '' && sectionSelected !== '') {
            this.createPrompt();
        } else {
            this.setState({
                open: true,
                message: Constant.SELECT_JOURNAL
            });
        }
    };

    /**
     * Method to set state of the text input value.
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    modalDidOpen = () => {
        this.setState({ answer: '', promptImages: [] });
    };

    hitEditPromptAPI = () => {
        const { journal_id, prompt_id } = this.props;
        const { dispatch } = this.props.navigation;
        const body = {
            prompt_id,
            answer: this.state.answer,
        };
        dispatch(editPromptAction(journal_id, body))
            .then(() => {
                this.props.openSuccessModal();
            });
    };

    createPrompt = () => {
        const {
            answer, promptImages, sectionSelected, subSectionSelected, journalSelected, journalType
        } = this.state;
        const body = {
            journal_type: journalType,
            journal_id: journalSelected,
            section: sectionSelected,
            subsection: subSectionSelected,
            prompt_name: 'Custom Entry',
            answer,
            section_order: '1',
            images: promptImages
        };
        this.hitCreateCustomPromptAPI(body);
    };


    requestCameraPermission = (index) => {
        this.setState({ spinner: false });
        if (index === 0 || index === 1) {
            openCameraAndGallery(index, true).then(res => {
                this.setPropertyPicturesData(index === 0 && Platform.OS === 'ios' ? [res] : res);
            }).catch(() => {
                this.setState({ spinner: false });
            });
        } else {
            this.setState({ spinner: false });
        }
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    };

    /**
     * Method to open action sheet.
     */
    showActionSheet = () => {
        this.setState({}, () => this.ActionSheet.show());
    };

    modalDidClose = () => {
        this.props.close();
        this.setState(this.initialState);
    };


    render() {
        const {
            open, close, journalData, customModalHeading
        } = this.props;
        const {
            answer, promptImages, spinner, journalSelected, promptedJournal, sectionSelected, subSectionSelected
        } = this.state;
        return (
            <Modal
                open={open}
                modalStyle={commonStyle.modalStyle}
                modalDidClose={this.modalDidClose}
                modalDidOpen={this.modalDidOpen}
                closeOnTouchOutside={false}
            >
                <View style={commonStyle.modelContainer}>
                    <View style={commonStyle.leftContainer}>
                        <TouchableOpacity
                            onPress={() => close()}
                        >
                            <Ionicons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView>
                        <View style={[{ paddingHorizontal: 10, paddingTop: 20 }]}>
                            <Text style={commonStyle.subHeaderTextStyle}>{`${customModalHeading}`}</Text>
                            <View style={styles.modalTextAreaContainer}>
                                <View style={{ paddingTop: Platform.OS === 'ios' ? 6 : 0 }}>
                                    {_.times(this.state.lines, (count) => <View key={count} style={styles.hr} />)}
                                </View>
                                <TextInput
                                    style={[styles.textArea, Platform.OS === 'ios' ? '' : { height: this.state.height }]}
                                    underlineColorAndroid="transparent"
                                    value={answer}
                                    multiline
                                    autoCorrect
                                    spellCheck={false}
                                    scrollEnabled={false}
                                    autoCapitalCheckize="none"
                                    bounces={false}
                                    showsVerticalScrollIndicator={false}
                                    onChangeText={this.handleTextChange('answer')}
                                    onContentSizeChange={(event) => this.getContentHeight(event)}
                                />
                            </View>
                            <View
                                style={[{
                                    marginVertical: 10, flexDirection: 'row', width: '100%', flexWrap: 'wrap',
                                }]}
                            >
                                {
                                    promptImages.length > 0 && promptImages.map((item) => (
                                        <CustomPromptsImageItem
                                            key={item.image}
                                            image={item}
                                            {...this.props}
                                        />
                                    ))

                                }
                                {
                                    <TouchableOpacity
                                        onPress={() => this.showActionSheet()}
                                        style={[styles.horizontalListItemContainer, { marginVertical: 10 }]}
                                    >
                                        <View style={{ alignItems: 'center' }}>
                                            <Image
                                                source={IMAGE_ICON}
                                                style={{ height: 40, width: 40, resizeMode: 'contain' }}
                                            />
                                            <Text
                                                style={[commonStyle.subHeaderTextStyle, commonStyle.textAlignCenter, { fontSize: 12 }]}
                                            >{'UPLOAD'}
                                            </Text>
                                            <Text
                                                style={[commonStyle.subHeaderTextStyle, commonStyle.textAlignCenter, { fontSize: 12 }]}
                                            >{'PICTURES'}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>

                            { customModalHeading === 'CUSTOM ENTRY' &&
                            <View style={[commonStyle.modalCenterContainer]}>
                                <View style={[commonStyle.modalContentContainer]}>
                                    <View style={[commonStyle.flexContainer]}>
                                        {<FlatList
                                            data={journalData}
                                            extraData={journalSelected}
                                            renderItem={({ item }) =>
                                                (<JournalListItem
                                                    customModalJournal={1}
                                                    item={item}
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
                                                    >{Constant.BLANK_JOURNAL_TEXT}
                                                    </Text>)
                                            }
                                            bounces={false}
                                            showsHorizontalScrollIndicator={false}
                                            keyExtractor={(item, index) => index.toString()}
                                        />}
                                    </View>
                                </View>
                            </View>}
                        </View>
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.saveStyle}
                        onPress={() => (customModalHeading === 'CUSTOM ENTRY' ? this.validateCustomPrompt() : this.hitEditPromptAPI())}
                    >
                        <Text style={styles.textSaveStyle}>Save</Text>
                    </TouchableOpacity>
                </View>
                <ActionSheet
                    ref={o => { this.ActionSheet = o; }}
                    title="Which one do you like?"
                    options={['Camera', 'Gallery', 'Cancel']}
                    cancelButtonIndex={2}
                    onPress={(index) => {
                        this.requestCameraPermission(index);
                    }}
                />
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
                <Spinner
                    animating={spinner}
                />
            </Modal>
        );
    }
}

CustomPromptModal.propTypes = {
    customModalHeading: PropTypes.string.isRequired,
    answer: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func,
    getPrompts: PropTypes.func,
    openModal: PropTypes.func,
    hitGetPromptsAPI: PropTypes.func,
    open: PropTypes.bool,
    journal_id: PropTypes.string,
    prompt_id: PropTypes.string,
    prompt: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    journalData: PropTypes.array.isRequired,
    images: PropTypes.array,
    showAlert: PropTypes.func.isRequired,
    openSuccessModal: PropTypes.func,
};

CustomPromptModal.defaultProps = {
    open: false,
    answer: '',
    images: [],
    prompt: '',
    journal_id: '',
    prompt_id: '',
    hitGetPromptsAPI: () => {},
    openSuccessModal: () => {},
    openModal: () => {},
    getPrompts: () => {},
    openAlertModalMessage: () => {},
};
