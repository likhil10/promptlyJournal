import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    Keyboard,
    NetInfo,
    Platform,
    AsyncStorage
} from 'react-native';
import FontAwesomeIcons from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Constant from '../../utility/constants';
import style from './addJournalStyles';
import commonStyle from '../Common/commonStyle';
import settingStyle from '../SettingScreen/settingStyle';
import TextBox from '../Common/textBox';
import DatePickerBox from '../Common/datePickerBox';
import ButtonBox from '../Common/buttonBox';
import {
    openCameraAndGallery,
    validateName
} from '../../utility/helperComponent';
import { createJournalAction } from '../../actions/createJournalAction';
import { getJournalsAction } from '../../actions/getJournalsAction';
import {
    incrementJournalCount,
    mixpanelTrack,
    mixpanelTrackWithProperties
} from '../../utility/mixpanelHelperComponent';

const journalMetaData = {
    [Constant.CHILDHOOD_JOURNAL]: {
        name: "Child's First",
        firstDate: 'Due',
        secondDate: 'Birth'
    },
    [Constant.LOVE_JOURNAL]: {
        name: "Spouse's First",
        firstDate: 'Birth',
        secondDate: 'Wedding'
    },
    [Constant.TRAVEL_JOURNAL]: {
        name: 'Trip',
        firstDate: 'Trip Start',
        secondDate: 'Trip End'
    },
    [Constant.ADOPTION_JOURNAL]: {
        name: "Child's First",
        firstDate: 'Birth',
        secondDate: 'Placement'
    },
    [Constant.EVERYDAY_JOURNAL]: {
        name: 'Journal',
        placeholderText: "Name your Journal (ie: Ashley's Journals)",
        firstDate: 'Birth',
    }
};

export default class JournalSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            save: false,
            journalName: '',
            imageURL: Constant.DEFAULT_JOURNAL_IMAGE,
            imageData: '',
            firstDate: '',
            secondDate: '',
            responseSuccess: false,
            email: '',
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
        switch (journalSelected) {
        case Constant.CHILDHOOD_JOURNAL:
            journalData.first_name = trimJournalName;
            journalData.due_date = firstDate;
            journalData.birth_date = secondDate;
            break;
        case Constant.LOVE_JOURNAL:
            journalData.first_name = trimJournalName;
            journalData.birth_date = firstDate;
            journalData.wedding_date = secondDate;
            break;
        case Constant.TRAVEL_JOURNAL:
            journalData.trip_name = trimJournalName;
            journalData.trip_start_date = firstDate;
            journalData.trip_end_date = secondDate;
            break;
        case Constant.ADOPTION_JOURNAL:
            journalData.first_name = trimJournalName;
            journalData.birth_date = firstDate;
            journalData.placement_date = secondDate;
            break;
        case Constant.EVERYDAY_JOURNAL:
            journalData.first_name = trimJournalName;
            journalData.birth_date = firstDate;
            break;
        default: {
            // Need to set the default state.
        }
        }
        return journalData;
    };

    trackMixPanel = () => {
        AsyncStorage.getItem(Constant.EMAIL)
            .then((email) => {
                this.setState({
                    email,
                }, () => {
                    if (this.props.journalSelected) {
                        mixpanelTrack(`${_.startCase(_.toLower(this.props.journalSelected))} Journal Created`, this.state.email.trim());
                    }
                    mixpanelTrackWithProperties(this.state.email.trim(), 'Journal Created', { 'Journal Type': this.props.journalSelected }, incrementJournalCount(this.state.email.trim()));
                });
            });
    }

    handleSubmit = () => {
        const {
            journalName, firstDate, secondDate
        } = this.state;
        Keyboard.dismiss();
        if (journalName.trim() === '') {
            this.props.showAlert(`${journalMetaData[this.props.journalSelected].name} Name is Required.`);
            this.setState({
                responseSuccess: false,
            });
        } else if (!validateName(journalName.trim())) {
            this.props.showAlert(`${journalMetaData[this.props.journalSelected].name} Name is Invalid.`);
            this.setState({
                responseSuccess: false,
            });
        } else if (firstDate === '' && journalMetaData[this.props.journalSelected].firstDate !== 'Due'
            && this.props.journalSelected !== Constant.EVERYDAY_JOURNAL) {
            this.props.showAlert(`${journalMetaData[this.props.journalSelected].firstDate} Date is Required.`);
            this.setState({
                responseSuccess: false,
            });
        } else if (secondDate === '' && this.props.journalSelected !== Constant.EVERYDAY_JOURNAL) {
            this.props.showAlert(`${journalMetaData[this.props.journalSelected].secondDate} Date is Required.`);
            this.setState({
                responseSuccess: false,
            });
        } else {
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        this.hitCreateJournalAPI();
                    } else {
                        this.props.showAlert(Constant.NETWORK_ERROR);
                        this.setState({
                            responseSuccess: false,
                        });
                    }
                });
        }
    };

    hitCreateJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        const body = this.getJournalBody(this.props.journalSelected);
        dispatch(createJournalAction(body))
            .then(() => {
                this.trackMixPanel();
                this.props.openCreateJournalSuccessModal();
            })
            .catch(err => {
                this.setState({
                    responseSuccess: false,
                });
                this.props.showAlert(err);
            });
    };

    hitGetJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        if (this.state.responseSuccess) {
            dispatch(getJournalsAction())
                .then(() => {
                    this.setState({
                        journalName: '',
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

    /**
     * Method for navigating to Dashboard Screen.
     */
    navigateToDashboard = () => {
        Keyboard.dismiss();
        const { navigate } = this.props.navigation;
        if (this.state.responseSuccess) {
            navigate('DashboardScreen');
        }
    };

    /**
     * Method to accept input values from TextInput as object.
     * @param field
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    render() {
        const {
            imageURL, journalName, firstDate, secondDate,
        } = this.state;
        return (
            <View style={commonStyle.paddingTop5}>
                <View style={style.centerContainer}>
                    <View style={commonStyle.paddingTop5}>
                        <Text style={[commonStyle.subHeaderTextStyle, commonStyle.paddingVertical20,
                            this.props.journalSelected === Constant.EVERYDAY_JOURNAL ? { color: '#fff' } : {}]}
                        >
                            CREATE A NEW JOURNAL
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
                </View>
                <Text style={{
                    color: '#ffffff',
                    marginHorizontal: 20,
                    fontSize: 16,
                    fontFamily: Constant.SUB_HEADER_FONT,
                    marginBottom: 2
                }}
                >Please note that you can not edit your journal&apos;s name and dates once created.
                </Text>
                <TextBox
                    autoCapitalize="words"
                    placeholder={this.props.journalSelected === Constant.EVERYDAY_JOURNAL ?
                        journalMetaData[this.props.journalSelected].placeholderText :
                        `${journalMetaData[this.props.journalSelected].name} Name`}
                    handleText={this.handleTextChange('journalName')}
                    maxLength={30}
                    value={journalName || ''}
                    icon="account"
                />
                <Text style={style.infoText}>
                    {
                        this.props.journalSelected === Constant.EVERYDAY_JOURNAL ?
                            'This is how your journal name will appear in the app.' :
                            'This is how the name will appear in all prompts.'
                    }
                </Text>
                <View style={[commonStyle.flexRow, {
                    alignItems: 'flex-start',
                    flex: 1
                }]}
                >
                    <DatePickerBox
                        placeholder={`Select ${journalMetaData[this.props.journalSelected].firstDate} Date`}
                        handleText={this.handleTextChange('firstDate')}
                        value={firstDate}
                    />
                    <View style={commonStyle.linkContent}>
                        {(journalMetaData[this.props.journalSelected].firstDate === 'Due'
                            || this.props.journalSelected === Constant.EVERYDAY_JOURNAL) ?
                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>Optional</Text> :
                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>*Required</Text>
                        }
                    </View>
                </View>
                {
                    this.props.journalSelected === Constant.EVERYDAY_JOURNAL ?
                        <Text style={style.infoText}>
                            This is so we can send you birthday prompts.
                        </Text> : null
                }
                { this.props.journalSelected !== Constant.EVERYDAY_JOURNAL ?
                    <View style={[commonStyle.flexRow, {
                        alignItems: 'flex-start',
                        flex: 1
                    }]}
                    >
                        <DatePickerBox
                            placeholder={`Select ${journalMetaData[this.props.journalSelected].secondDate} Date`}
                            handleText={this.handleTextChange('secondDate')}
                            value={secondDate}
                        />
                        <View style={commonStyle.linkContent}>
                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>*Required</Text>
                        </View>
                    </View> : null
                }
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: '90%',
                    marginTop: 20,
                }}
                >
                    <ButtonBox
                        disabled={this.props.fetching}
                        buttonText={this.state.save ? 'Save' : 'Create'}
                        handleSubmit={() => this.handleSubmit()}
                    />
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={this.props.clearJournal}
                        style={commonStyle.linkContainer}
                    >
                        <View style={commonStyle.linkContent}>
                            <Text style={[commonStyle.linkText, { color: '#ffffff' }]}>Select another journal</Text>
                        </View>
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
            </View>
        );
    }
}

JournalSettings.propTypes = {
    clearJournal: PropTypes.func.isRequired,
    showAlert: PropTypes.func.isRequired,
    journalSelected: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
    openCreateJournalSuccessModal: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
};
