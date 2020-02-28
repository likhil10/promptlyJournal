import React, { Component } from 'react';
import {
    View,
    TouchableOpacity,
    NetInfo,
    Keyboard,
    AsyncStorage,
    Text
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import Constant from '../../../utility/constants';
import style from '../journalStyle';
import AlertModal from '../../Common/AlertModal';
import TextBox from '../../Common/textBox';
import { deleteJournalAction } from '../../../actions/deleteJournalAction';
import { getJournalsAction } from '../../../actions/getJournalsAction';
import { mixpanelTrack } from '../../../utility/mixpanelHelperComponent';

export default class DeleteJournalModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openAlert: false,
            message: '',
            deleteText: '',
            flagDelete: true,
            journalId: props.journalId ? props.journalId : '',
            email: '',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.journalId !== nextProps.journalId) {
            this.setState({
                journalId: nextProps.journalId,
            });
        }
    }

    setTextOnClose = () => {
        this.setState({
            flagDelete: true,
            deleteText: ''
        });
    };

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrack('Journal Deleted', this.state.email.trim()));
        });
    };

    closeModal = () => {
        const { clearJournal, notRefresh } = this.props;
        this.setState({
            openAlert: false,
            deleteText: ''
        }, () => { this.props.close(); clearJournal && clearJournal(); !notRefresh && this.hitGetJournalAPI(); });
    };

    /**
     * Method to set state of the text input value.
     */
    handleTextChange = field => (text) => {
        const newState = {};
        newState[field] = text;
        this.setState(newState);
    };

    hitGetJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        dispatch(getJournalsAction())
            .then(() => {
                this.navigateToDashboard();
            })
            .catch(err => {
                this.showAlert(err);
            });
    };

    DeleteJournalAPI = () => {
        if (this.state.deleteText.trim().toUpperCase() === 'DELETE') {
            Keyboard.dismiss();
            this.hitDeleteJournalAPI();
        } else {
            this.setState({
                flagDelete: false
            });
        }
    };

    navigateToDashboard = () => {
        Keyboard.dismiss();
        const { navigate } = this.props.navigation;
        navigate('DashboardScreen');
    };

    hitDeleteJournalAPI = () => {
        const { dispatch } = this.props.navigation;
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(deleteJournalAction(this.state.journalId))
                        .then(() => {
                            this.getEmail();
                            this.props.close();
                            this.setState({
                                deleteText: '',
                            });
                            this.props.showSuccessDelete();
                        })
                        .catch(err => {
                            this.showAlert(err);
                        });
                } else {
                    this.showAlert(Constant.NETWORK_ERROR);
                }
            });
    };

    showAlert = (message) => {
        this.setState({
            openAlert: true,
            message
        });
    };

    render() {
        const { open } = this.props;
        const { deleteText, flagDelete } = this.state;
        return (
            <Modal
                open={open}
                modalStyle={style.modalStyle}
                closeOnTouchOutside={false}
            >
                <View style={style.leftContainer}>
                    <TouchableOpacity
                        onPress={() => { this.setTextOnClose(); this.closeModal(); }}
                    >
                        <Ionicons name="md-close" size={23} color={Constant.TEXT_COLOR} />
                    </TouchableOpacity>
                </View>
                <View style={[style.centeredItems]}>
                    <Text style={[style.textStyle, style.textCenter, style.messageText, { textAlign: 'center' }, { fontSize: 20 }]}>{Constant.PLEASE_NOTE}</Text>
                    <Text style={[style.textStyle, style.textCenter, style.messageText, { textAlign: 'center' }]}>
                        This will delete all your entries and you can not get them back
                    </Text>
                    <View style={style.middleLine} />
                    <View style={{ height: 70 }}><TextBox
                        placeholder=""
                        icon="delete-forever"
                        style={{
                            height: 50, width: 70, borderColor: '#000', border: 1, borderRadius: 2
                        }}
                        handleText={this.handleTextChange('deleteText')}
                        value={deleteText}
                        onSubmitEditing={() => {
                            Keyboard.dismiss();
                        }}
                    />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center' }}>
                        <Text
                            style={(flagDelete) ? [style.subHeaderTextStyle, style.textCenter, style.messageBoldText, { color: Constant.TEXT_COLOR }] :
                                [style.subHeaderTextStyle, style.textCenter, style.messageBoldText, { color: '#f00' }]}
                        >
                        Type &apos;DELETE&apos; to delete the journal
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { this.DeleteJournalAPI(); }}
                        style={style.deleteStyle}
                    >
                        <Text style={[style.buttonText, {
                            textAlign: 'center',
                            fontSize: 18,
                            letterSpacing: 1,
                            padding: 5,
                            color: Constant.TEXT_COLOR
                        }]}
                        >{'Delete'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.openAlert}
                    close={this.closeModal}
                />
            </Modal>
        );
    }
}

DeleteJournalModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    showSuccessDelete: PropTypes.func.isRequired,
    clearJournal: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journalId: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
};
