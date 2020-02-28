import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-simple-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import commonStyle from '../../../Common/commonStyle';
import Constant from '../../../../utility/constants';
import promptStyles from './../promptStyle';
import { duplicatePromptAction } from '../../../../actions/duplicatePromptAction';
import AlertModal from '../../../Common/AlertModal';
import { mixpanelTrackWithProperties } from '../../../../utility/mixpanelHelperComponent';

export default class DuplicatePromptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            message: '',
            email: '',
            journalType: '',
        };
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrackWithProperties(this.state.email, 'Prompt Copied', { 'Journal Type': this.state.journalType }));
        });
    }

    modalDidClose = () => {
        this.props.close();
    };

    hitDuplicatePromptAPI = (promptFilledOut) => {
        const { prompt, journal_id } = this.props;
        const { dispatch } = this.props.navigation;
        this.props.close();
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    const body = {
                        source_prompt_id: prompt._id,
                        source_journal_id: journal_id,
                        is_prompt_filled_out: promptFilledOut
                    };
                    dispatch(duplicatePromptAction(body))
                        .then(res => {
                            this.setState({
                                journalType: res[0].journalType,
                            }, () => this.getEmail());
                            this.props.hitGetPromptsAPI();
                            this.props.openAlertModalMessage(Constant.DUPLICATE_PROMPT_SUCCESS);
                        })
                        .catch(err => {
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };

    closeModal = () => {
        this.setState({
            open: false
        });
    }

    render() {
        const { open, close, prompt } = this.props;
        return (
            <Modal
                open={open}
                modalStyle={[{ backgroundColor: Constant.WHITE_COLOR }, commonStyle.padding10]}
                modalDidClose={this.modalDidClose}
            >
                <View style={[commonStyle.leftContainer]}>
                    <TouchableOpacity
                        onPress={close}
                    >
                        <Ionicons name="md-close" size={25} color={Constant.TEXT_COLOR} />
                    </TouchableOpacity>
                </View>
                <View style={[commonStyle.centeredItems]}>
                    <Text style={[commonStyle.textStyle, commonStyle.textCenter, promptStyles.messageText]}>
                        {prompt && prompt.isAnswer ? 'Would you like to duplicate....' : 'Are you sure you want to duplicate this prompt?'}
                    </Text>
                    {prompt && prompt.isAnswer &&
                    <View>
                        <TouchableOpacity
                            onPress={() => this.hitDuplicatePromptAPI(true)}
                            style={[commonStyle.modalButton]}
                        >
                            <Text
                                style={[commonStyle.buttonText, { color: Constant.TEXT_COLOR }]}
                            >
                                {'THE PROMPT FILLED OUT'}
                            </Text>
                        </TouchableOpacity>
                        <Text
                            style={[commonStyle.textStyle, commonStyle.textCenter, promptStyles.messageText]}
                        >
                            {'or....'}
                        </Text>
                    </View>
                    }
                    <TouchableOpacity
                        onPress={() => this.hitDuplicatePromptAPI(false)}
                        style={[commonStyle.modalButton]}
                    >
                        <Text
                            style={[commonStyle.buttonText, { color: Constant.TEXT_COLOR }]}
                        >
                            {prompt && prompt.isAnswer ? 'THE PROMPT BLANK' : 'DUPLICATE'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <AlertModal
                    message={this.state.message}
                    open={!!this.state.open}
                    close={this.closeModal}
                />
            </Modal>
        );
    }
}

DuplicatePromptModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journal_id: PropTypes.string.isRequired,
    prompt: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
};
