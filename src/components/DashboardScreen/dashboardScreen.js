import React, { Component } from 'react';
import {
    Image,
    NetInfo,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager,
    AsyncStorage,
    Linking,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import PropTypes from 'prop-types';
import Rate, { AndroidMarket } from 'react-native-rate';
import commonStyle from '../Common/commonStyle';
import styles from './dashboardStyle';
import Constant from '../../utility/constants';
import Icon from '../../utility/iconConstant';
import Spinner from '../../components/Common/spinner';
import JournalItem from './journalItem';
import FooterItem from './footerItem';
import { getJournalsAction } from '../../actions/getJournalsAction';
import WelcomeModal from '../Common/welcomeModal';
import { pushNotificationService } from '../../utility/pushNotificationService';
import { tabBarOnPressDashboard } from '../../actions/tabBarOnPressDashboardAction';
import { togglePromptFlag } from '../../actions/togglePromptFlag';
import AlertModal from '../Common/AlertModal';
import ReferralModal from '../Common/referralModal';
import DeleteJournalModal from '../JournalScreen/Prompts/deleteJournalModal';
import { changeNotificationStatus } from '../../actions/changeNotificationStatus';

const LOGO = require('../../assets/logo.png');

const HEADER_IMAGE = require('../../assets/dashboradHeader.png');
const PRINT_TEASER = require('../../assets/icons/print-teaser.png');
const SET_UP_PASSCODE = require('../../assets/icons/set-up-passcode.png');
const NEED_HELP = require('../../assets/icons/need-help.png');

class DashboardScreen extends Component {
    static navigationOptions = () => ({
        tabBarIcon: () => (
            <Image
                source={LOGO}
                style={styles.tabIconStyle}
            />
        ),
        tabBarOnPress: ({ navigation, defaultHandler }) => {
            defaultHandler();
            navigation.dispatch(tabBarOnPressDashboard());
        }

    });

    constructor(props) {
        super(props);
        this.state = {
            openWelcomeModal: false,
            dataBlob: [],
            count: 3,
            openReferralModal: false,
            openedReferral: false,
            open: false,
            rated: false,
            message: '',
            loading: false,
            journalId: '',
            openDeleteJournalModal: false,
            refreshData: false,
            footerDataBlob: [
                {
                    text: 'GET WRITING IN YOUR JOURNAL',
                    icon: Icon.JOURNAL_ICON,
                    navigate: 'JournalScreen'
                },
                {
                    text: 'START A NEW JOURNAL',
                    icon: Icon.ADD_ICON,
                    navigate: 'AddJournalScreen'
                },
                {
                    text: 'PRINT MY JOURNAL',
                    icon: Icon.PRINT_ICON,
                    navigate: 'PrintScreen'
                },
                {
                    text: 'MANAGE SUBSCRIPTION',
                    icon: Icon.PROFILE_ICON_2,
                    navigate: 'SettingScreen'
                },
            ]
        };
    }

    componentDidMount() {
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    this.removeJournalSelectedFlagFromAsyncStorage();
                    this.hitGetJournalsAPI();
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            })
            .catch(err => {
                this.showAlert(err);
            });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.profileData.profileInfo) {
            if ((nextProps.profileData.profileInfo.loginWithPasscodeCount === 3) && this.state.rated === false) {
                this.setState({
                    rated: true,
                }, () => {
                    const options = {
                        AppleAppID: '1437266252',
                        GooglePackageName: 'com.promptlyjournals',
                        preferredAndroidMarket: AndroidMarket.Google,
                        preferInApp: true,
                        openAppStoreIfInAppFails: true,
                    };
                    Rate.rate(options, success => {
                        if (success) {
                            // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
                            this.setState({
                                rated: true,
                            });
                        }
                    });
                });
            } else if ((nextProps.profileData.profileInfo.loginWithPasscodeCount === 5) && this.state.openedReferral === false) {
                this.setState({
                    openReferralModal: true,
                    openedReferral: true,
                });
            }
        }
        if (nextProps.journalData) {
            this.setState({ dataBlob: nextProps.journalData });
        }
    }

    setValueToAsyncStorage = async () => {
        await AsyncStorage.setItem('IS_JOURNAL_SELECTED', 'false');
    };

    handleJournalData = (data, item) => {
        this.setValueToAsyncStorage();
        if (item.sections.length !== 0) {
            const itemLength = item.sections ? item.sections.length : '';
            this.props.navigation.dispatch(togglePromptFlag(true));
            if (item.journalType === Constant.EVERYDAY_JOURNAL) {
                this.props.navigation.navigate('JournalScreen', {
                    item,
                    section: item.sections[0].section.name,
                    subSection: item.sections[0].section.subsection ? item.sections[0].section.subsection[0] : '',
                    count: this.state.count,
                    id: item._id
                });
            } else {
                this.props.navigation.navigate('JournalScreen', {
                    item,
                    section: item.sections[item.sections.length - 1].section.name,
                    subSection: item.sections[itemLength - 1].section.subsection ? item.sections[itemLength - 1].section.subsection[item.sections[itemLength - 1].section.subsection.length - 1] : '',
                    count: this.state.count,
                    id: item._id
                });
            }
        } else {
            this.setState({
                open: true,
                message: Constant.EMPTY_SECTION,
            });
        }
    };

    closeReferralModal = () => {
        this.setState({ openReferralModal: false });
    };

    openWelcomeModal = () => {
        this.setState({ openWelcomeModal: true });
    };

    closeWelcomeModal = () => {
        this.setState({ openWelcomeModal: false });
        InteractionManager.runAfterInteractions(() => {
            this.props.navigation.setParams({
                showHelpBlock: false
            });
        });
    };

    removeJournalSelectedFlagFromAsyncStorage = async () => {
        await AsyncStorage.removeItem('IS_JOURNAL_SELECTED');
    };

    hitGetJournalsAPI = () => {
        const { dispatch } = this.props.navigation;
        dispatch(getJournalsAction())
            .then(res => {
                this.setState({
                    dataBlob: res,
                    refreshData: false
                }, () => pushNotificationService(this.props, this.state.dataBlob));
                if (this.props.navigation.state.params
                    && this.props.navigation.state.params.showHelpBlock) {
                    this.openWelcomeModal();
                }
            })
            .catch(err => {
                this.setState({ refreshData: false });
                this.showAlert(err);
            });
    };

    closeModal = () => {
        this.setState({
            open: false
        }, () => this.state.refreshData && this.hitGetJournalsAPI());
    };

    showAlert = (message) => {
        this.setState({
            open: true,
            message
        });
    };

    navigateToSettings = () => {
        this.props.navigation.navigate('SettingScreen', { activeScreen: 'profileScreen' });
    };
    navigateToPrintScreen = () => {
        this.props.navigation.navigate('PrintScreen');
    };

    openDeleteJournalModal = (item) => {
        this.setState({
            open: false,
            journalId: item,
            openDeleteJournalModal: true
        });
    };

    closeDeleteJournalModal = () => this.setState({ openDeleteJournalModal: false });

    showSuccessDelete = () => {
        this.setState({
            refreshData: true,
        }, () => this.showAlert(Constant.DELETE_JOURNAL_SUCCESS));
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

    changeNotificationStatus = (journalData, status) => {
        const { dispatch } = this.props.navigation;
        const data = {
            status
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(changeNotificationStatus(journalData._id, data))
                        .then(() => {
                            this.setState({
                                refreshData: true,
                            }, () => this.showAlert(Constant.NOTIFICATION_STATUS_SUCCESS));
                        })
                        .catch(err => {
                            this.showAlert(err);
                        });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    render() {
        const { isJournalScreenButtonEnabled } = this.props;
        const { openDeleteJournalModal, journalId } = this.state;
        return (
            <View style={styles.container}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                >
                    <View style={styles.headerContainer}>
                        <Image
                            source={HEADER_IMAGE}
                            style={styles.headerImage}
                        />
                    </View>
                    <View style={commonStyle.centerContainer}>
                        <Text style={[styles.subHeaderTextStyle, commonStyle.padding10]}>GET WRITING</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.state.dataBlob}
                            extraData={this.state.dataBlob.length}
                            renderItem={({ item }) =>
                                (
                                    <TouchableOpacity
                                        onPress={(data = this.state.dataBlob) => { this.handleJournalData(data, item); }}
                                    >
                                        <JournalItem
                                            item={item}
                                            openDeleteJournalModal={this.openDeleteJournalModal}
                                            navigateToEditJournal={this.navigateToEditJournal}
                                            changeNotificationStatus={this.changeNotificationStatus}
                                        />
                                    </TouchableOpacity>
                                )
                            }
                            ListEmptyComponent={() =>
                                (
                                    <Text
                                        style={[commonStyle.subHeaderTextStyle, commonStyle.textCenter]}
                                    >{Constant.BLANK_JOURNAL_TEXT}
                                    </Text>
                                )
                            }
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={commonStyle.centerContainer}>
                        <Text style={[styles.subHeaderTextStyle, commonStyle.padding10]}>HOW DO I?</Text>
                    </View>
                    <View style={[commonStyle.flexContainer, commonStyle.paddingBottom20]}>
                        <FlatList
                            horizontal
                            data={this.state.footerDataBlob}
                            extraData={this.props}
                            renderItem={({ item }) =>
                                (<FooterItem
                                    {...this.props}
                                    item={item}
                                    isButtonEnabled={isJournalScreenButtonEnabled}
                                />)
                            }
                            bounces={false}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>
                    <View style={styles.helperContainer}>
                        <TouchableOpacity
                            onPress={() => this.navigateToSettings()}
                            style={styles.helperImages}
                        >
                            <Image
                                source={SET_UP_PASSCODE}
                                style={styles.helpImages}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => Linking.openURL(Constant.FAQ)}
                            style={styles.helperImages}
                        >
                            <Image
                                source={NEED_HELP}
                                style={styles.helpImages}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.marginBottom20}>
                        <TouchableOpacity
                            onPress={() => this.navigateToPrintScreen()}
                            style={styles.footerImageContainer}
                        >
                            <Image
                                source={PRINT_TEASER}
                                style={styles.footerImage}
                            />
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
                <WelcomeModal
                    open={this.state.openWelcomeModal}
                    close={this.closeWelcomeModal}
                />
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
                <Spinner
                    animating={this.props.fetching || this.state.loading}
                />
                <DeleteJournalModal
                    {...this.props}
                    open={openDeleteJournalModal}
                    journalId={journalId}
                    close={this.closeDeleteJournalModal}
                    showSuccessDelete={this.showSuccessDelete}
                    notRefresh
                    // clearJournal={this.clearJournal}
                />
                <ReferralModal
                    close={this.closeReferralModal}
                    open={this.state.openReferralModal}
                    shareContent={false}
                    data={this.props}
                />
            </View>
        );
    }
}

DashboardScreen.propTypes = {
    clearJournal: PropTypes.func,
    showAlert: PropTypes.func,
    journalSelected: PropTypes.string,
    navigation: PropTypes.object.isRequired,
    openCreateJournalSuccessModal: PropTypes.func,
    dispatch: PropTypes.func.isRequired,
    fetching: PropTypes.bool.isRequired,
    isJournalScreenButtonEnabled: PropTypes.bool.isRequired,
    journalData: PropTypes.array,
    profileData: PropTypes.object,
};

DashboardScreen.defaultProps = {
    journalData: [],
    openCreateJournalSuccessModal: () => {},
    journalSelected: '',
    showAlert: () => {},
    clearJournal: () => {},
    profileData: {},
};

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected,
    fetching: state.getJournalReducer.fetching || state.changeNotificationStatus.fetching,
    journalData: state.getJournalReducer.journalData,
    isJournalScreenButtonEnabled: state.tabBarOnPressDashboardReducer.isJournalScreenButtonEnabled,
    profileData: state.fetchProfileDetailsReducer.fetchProfileInfo,
});

export default connect(mapStateToProps)(DashboardScreen);
