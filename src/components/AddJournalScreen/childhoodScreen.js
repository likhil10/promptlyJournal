import React, { Component } from 'react';
import {
    AsyncStorage,
    Image,
    Keyboard,
    NetInfo,
    Platform,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import moment from 'moment';
import style from './addJournalStyles';
import Config from '../../utility/config';
import commonStyle from '../Common/commonStyle';
import settingStyle from '../SettingScreen/settingStyle';
import Constant from '../../utility/constants';
import { openCameraAndGallery, validateName } from '../../utility/helperComponent';
import TextBox from '../Common/textBox';
import DatePickerBox from '../Common/datePickerBox';
import ButtonBox from '../Common/buttonBox';
import { createJournalAction } from '../../actions/createJournalAction';
import { updateJournalAction } from '../../actions/updateJournalAction';
import {
    incrementJournalCount,
    mixpanelTrack,
    mixpanelTrackWithProperties
} from '../../utility/mixpanelHelperComponent';
import _ from "lodash";

export default class ChildhoodScreen extends Component {
    constructor(props) {
        super(props);
        const dueDate = props.navigation.state.params.data ? props.navigation.state.params.data.setting.childhood.dueDate : '';
        this.state = {
            imageURL: props.save ? `${Config.BASE_URL}${props.navigation.state.params.data.image}` : Constant.DEFAULT_JOURNAL_IMAGE,
            imageData: '',
            firstDate: props.save ? moment(dueDate).format('MM-DD-YYYY') : '',
            secondDate: '',
            journalName: '',
            email: '',
            yesContent: false,
            noContent: props.noContent,
            showSelect: !props.save,
            save: props.save,
        };
    }

    setPropertyPicturesData = (data) => {
        const pic = `data:${data.mime};base64,${data.data}`;
        let source = '';
        if (Platform.OS === 'android') {
            source = data.path;
        } else {
            source = data.path.replace('file://', '');
        }
        this.setState({
            imageURL: source,
            imageData: pic,
        });
    };
    getJournalBody = (journalSelected) => {
        const {
            journalName, firstDate, secondDate, imageData
        } = this.state;
        const journalData = {
            journal_type: journalSelected,
            image: imageData,
        };
        const trimJournalName = journalName.replace(/\s+/g, ' ');
        journalData.first_name = trimJournalName;
        journalData.due_date = firstDate;
        journalData.birth_date = secondDate;
        return journalData;
    };
    getUpdateJournalBody = () => {
        const {
            journalName, secondDate, imageData
        } = this.state;
        const journalData = {
            birth_date: secondDate,
            first_name: journalName,
            image: imageData,
        };
        const trimJournalName = journalName.replace(/\s+/g, ' ');
        journalData.first_name = trimJournalName;
        return journalData;
    };

    trackMixPanel = (save) => {
        AsyncStorage.getItem(Constant.EMAIL)
            .then((email) => {
                const message = save ? 'Journal Updated' : 'Journal Created';
                this.setState({
                    email,
                }, () => {
                    mixpanelTrack(`Childhood ${message}`, this.state.email.trim());
                    mixpanelTrackWithProperties(this.state.email.trim(), message, { 'Journal Type': 'childhood' }, incrementJournalCount(this.state.email.trim()))
                });
            });
    }

    hitCreateJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        const {
            yesContent, noContent, firstDate, secondDate, journalName
        } = this.state;
        const body = this.getJournalBody('childhood');
        let message;
        if (yesContent && firstDate === '') {
            message = Constant.DUE_DATE_EMPTY;
        } else if (noContent && journalName.trim() === '') {
            message = Constant.FIRST_NAME_EMPTY;
        } else if (noContent && !validateName(journalName.trim())) {
            message = Constant.FIRST_NAME_INVALID;
        } else if (noContent && secondDate === '') {
            message = Constant.BIRTH_DATE_EMPTY;
        }
        if (message) {
            this.props.showAlert(message);
        } else {
            dispatch(createJournalAction(body))
                .then(() => {
                    this.trackMixPanel(false);
                    this.props.openCreateJournalSuccessModal();
                })
                .catch(err => {
                    this.props.showAlert(err);
                });
        }
    };

    hitUpdateJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        const {
            noContent, secondDate, journalName
        } = this.state;
        const body = this.getUpdateJournalBody();
        let message;
        if (noContent && journalName.trim() === '') {
            message = Constant.FIRST_NAME_EMPTY;
        } else if (noContent && !validateName(journalName.trim())) {
            message = Constant.FIRST_NAME_INVALID;
        } else if (noContent && secondDate === '') {
            message = Constant.BIRTH_DATE_EMPTY;
        }
        if (message) {
            this.props.showAlert(message);
        } else {
            dispatch(updateJournalAction(body, this.props.journalId))
                .then(() => {
                    this.trackMixPanel(true);
                    this.props.openUpdateJournalSuccessModal();
                })
                .catch(err => {
                    this.props.showAlert(err);
                });
        }
    };

    handleSubmit = () => {
        Keyboard.dismiss();
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected && this.state.save) {
                    this.hitUpdateJournalAPI();
                } else if (isConnected && !this.state.save) {
                    this.hitCreateJournalAPI();
                } else {
                    this.props.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    showYesContent = () => {
        this.setState({
            yesContent: true,
            noContent: false,
            showSelect: false,
        });
    };

    showNoContent = () => {
        this.setState({
            yesContent: false,
            noContent: true,
            showSelect: false,
            firstDate: '',
        });
    };


    /**
     * Method to open action sheet.
     */
    showActionSheet = () => {
        this.setState({}, () => this.ActionSheet.show());
    };

    deleteProfileImage = () => {
        this.setState({
            imageURL: Constant.DEFAULT_JOURNAL_IMAGE,
            imageData: '',
        });
    };

    requestCameraPermission = (index) => {
        if (index === 0 || index === 1) {
            openCameraAndGallery(index, false)
                .then(res => {
                    this.setPropertyPicturesData(res);
                }).catch((err) => {
                    console.log(err);
                });
        }
    };

    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    render() {
        const {
            imageURL, firstDate, secondDate, journalName, yesContent, noContent, showSelect, save,
        } = this.state;
        return (
            <View style={[commonStyle.paddingTop5, style.deviceHeight, { backgroundColor: '#b6afb2' }]}>
                <View style={style.centerContainer}>
                    <Text style={[commonStyle.subHeaderTextStyle, commonStyle.paddingVertical20, { color: '#ffffff' }]}>
                        {`${save ? 'UPDATE JOURNAL' : 'CREATE A NEW JOURNAL'}`}
                    </Text>
                    <View style={settingStyle.profileImageContainer}>
                        <View>
                            <View
                                style={settingStyle.editProfileCircle}
                            >
                                <Image
                                    source={{ uri: imageURL }}
                                    style={settingStyle.editProfileImage}
                                />
                            </View>
                            <TouchableOpacity
                                style={settingStyle.trashIcon}
                                onPress={() => (imageURL === Constant.DEFAULT_JOURNAL_IMAGE ? this.showActionSheet() : this.deleteProfileImage())}
                            >
                                <FontAwesomeIcons
                                    name={imageURL === Constant.DEFAULT_JOURNAL_IMAGE ? 'pencil' : 'trash-o'}
                                    size={25}
                                    color={Constant.TEXT_COLOR}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                >
                    {!save &&
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{
                            textAlign: 'center',
                            color: '#ffffff',
                            fontSize: 28,
                            fontFamily: Constant.TEXT_FONT,
                            marginBottom: 2
                        }}
                        >Are you pregnant?
                        </Text>
                        <View style={{
                            width: '100%',
                            // height: '50%',
                            marginVertical: 10,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                        >
                            <TouchableOpacity style={yesContent ? style.selectedButton : style.selectButton} activeOpacity={0.8} disabled={save} onPress={this.showYesContent}>
                                <Text style={style.buttonText}>YES</Text>
                            </TouchableOpacity>
                            { yesContent &&
                            <View>
                                <Text style={{
                                    color: '#ffffff',
                                    marginHorizontal: 20,
                                    marginTop: 20,
                                    fontSize: 16,
                                    fontFamily: Constant.SUB_HEADER_FONT,
                                    marginBottom: 2
                                }}
                                >Please note that you cannot edit your journal&apos;s date once created. If you happen to make a mistake, delete your journal and create a new one.
                                </Text>
                                <View style={{
                                    alignItems: 'flex-start',
                                    flexDirection: 'row',
                                }}
                                >
                                    <DatePickerBox
                                        placeholder="Select Due Date"
                                        handleText={this.handleTextChange('firstDate')}
                                        value={firstDate}
                                    />
                                    <View style={commonStyle.linkContent}>
                                        <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>*Required</Text>
                                    </View>
                                </View>
                                <Text style={{
                                    color: '#ffffff',
                                    marginHorizontal: 20,
                                    fontSize: 16,
                                    fontFamily: Constant.SUB_HEADER_FONT,
                                    marginBottom: 2
                                }}
                                >Once your baby is born, you can enter the name and the date of birth by editing the journal, meanwhile, you&apos;ll find the journal by the name of &apos;Baby&apos;.
                                </Text>
                                <View style={{
                                    flexDirection: 'row',
                                    alignSelf: 'center',
                                    justifyContent: 'center',
                                    width: '90%',
                                    marginTop: 20,
                                    marginBottom: 40,
                                }}
                                >
                                    <ButtonBox
                                        isPurple
                                        // disabled={this.props.fetching}
                                        buttonText={save ? 'Save' : 'Create'}
                                        handleSubmit={() => this.handleSubmit()}
                                    />
                                    <TouchableOpacity
                                        activeOpacity={0.8}
                                        onPress={this.props.clearJournal}
                                        style={[commonStyle.linkContainer, { alignSelf: 'center' }]}
                                    >
                                        <View style={commonStyle.linkContent}>
                                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>Select another journal</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            }

                            <TouchableOpacity style={noContent ? style.selectedButton : style.selectButton} activeOpacity={0.8} onPress={this.showNoContent}>
                                <Text style={style.buttonText}>NO</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                    {noContent &&
                    <View>
                        <Text style={{
                            color: '#ffffff',
                            marginHorizontal: 20,
                            // marginTop: 20,
                            fontSize: 16,
                            fontFamily: Constant.SUB_HEADER_FONT,
                            marginBottom: 2
                        }}
                        >{save ? 'Please note that you can not edit your journal\'s date or name once updated - you only get 1 shot. Double check that your information is correct before you click "Update".' : 'Please note that you cannot edit your journal\'s name and date once created. Double check your information is correct before you click "CREATE".'}
                        </Text>
                        {save &&
                        <View style={{
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                        }}
                        >
                            <DatePickerBox
                                placeholder="Select Due Date"
                                handleText={this.handleTextChange('firstDate')}
                                value={firstDate}
                                disabled={save}
                            />

                        </View>
                        }
                        {/* <Text style={{ */}
                        {/* color: '#ffffff', */}
                        {/* marginHorizontal: 20, */}
                        {/* fontSize: 16, */}
                        {/* fontFamily: Constant.SUB_HEADER_FONT, */}
                        {/* marginBottom: 2 */}
                        {/* }} */}
                        {/* >{`${save ? 'Please note that you can edit your journal\'s details only once.' : 'Please note that you can not edit your journal\'s name and dates once created.'}`} */}
                        {/* </Text> */}
                        <TextBox
                            autoCapitalize="words"
                            placeholder="Child's First Name"
                            handleText={this.handleTextChange('journalName')}
                            maxLength={30}
                            value={journalName || ''}
                            icon="account"
                        />
                        <Text style={{
                            color: '#ffffff',
                            marginHorizontal: 20,
                            fontSize: 16,
                            fontFamily: Constant.SUB_HEADER_FONT,
                            marginBottom: 5
                        }}
                        >This is how the name will appear in all prompts.
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'flex-start',
                        }}
                        >
                            <DatePickerBox
                                placeholder="Select Birth Date"
                                handleText={this.handleTextChange('secondDate')}
                                value={secondDate}
                            />
                            <View style={commonStyle.linkContent}>
                                <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>*Required</Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            width: '90%',
                            marginTop: 20,
                        }}
                        >
                            <ButtonBox
                                isPurple
                                // disabled={this.props.fetching}
                                buttonText={save ? 'Update' : 'Create'}
                                handleSubmit={() => (save ? this.hitUpdateJournalAPI() : this.handleSubmit())}
                            />
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={this.props.clearJournal}
                                style={[commonStyle.linkContainer, { alignSelf: 'center' }]}
                            >
                                {!save &&
                                <View style={commonStyle.linkContent}>
                                    <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>Select another
                                        journal
                                    </Text>
                                </View>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    }
                    {showSelect &&
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.props.clearJournal}
                        style={[commonStyle.linkContainer, { alignSelf: 'center' }]}
                    >
                        <View style={commonStyle.linkContent}>
                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>Select another journal</Text>
                        </View>
                    </TouchableOpacity>
                    }
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
            </View>
        );
    }
}

ChildhoodScreen.propTypes = {
    journalId: PropTypes.string.isRequired,
    image: PropTypes.string,
    showAlert: PropTypes.func.isRequired,
    noContent: PropTypes.bool.isRequired,
    save: PropTypes.bool.isRequired,
    clearJournal: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    openCreateJournalSuccessModal: PropTypes.func.isRequired,
    openUpdateJournalSuccessModal: PropTypes.func.isRequired,
};
ChildhoodScreen.defaultProps = {
    image: '',
};

