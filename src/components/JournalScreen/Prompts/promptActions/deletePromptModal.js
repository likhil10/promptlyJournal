import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    AsyncStorage
} from 'react-native';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import commonStyle from '../../../Common/commonStyle';
import Constant from '../../../../utility/constants';
import promptStyles from './../promptStyle';
import { deletePromptAction } from '../../../../actions/deletePromptAction';
import { mixpanelTrackWithProperties } from '../../../../utility/mixpanelHelperComponent';

export default class DeletePromptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            journalType: '',
        };
    }
    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrackWithProperties(this.state.email, 'Prompt Deleted', { 'Journal Type': this.state.journalType }));
        });
    };

    hitDeletePromptAPI = () => {
        const { prompt, journal_id } = this.props;
        const { dispatch } = this.props.navigation;
        this.props.close();
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(deletePromptAction(journal_id, prompt._id))
                        .then(res => {
                            this.setState({
                                journalType: res[0].journalType,
                            }, () => this.getEmail());
                            this.props.hitGetPromptsAPI();
                            this.props.openAlertModalMessage(Constant.DELETE_PROMPT_SUCCESS);
                        })
                        .catch(err => {
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };

    modalDidClose = () => {
        this.props.close();
    };

    render() {
        const { open, close } = this.props;
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
                    <View style={{ marginBottom: 10 }}>
                        <Text
                            style={[commonStyle.textStyle, commonStyle.textCenter, promptStyles.messageText]}
                        >
                            {'Are you sure you want to delete this prompt?'}
                        </Text>
                        <Text
                            style={[commonStyle.subHeaderTextStyle, commonStyle.textCenter, commonStyle.messageBoldText]}
                        >
                            {'THIS CAN NOT BE UNDONE.'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => this.hitDeletePromptAPI()}
                        style={[commonStyle.modalButton]}
                    >
                        <Text
                            style={[commonStyle.buttonText, { color: Constant.TEXT_COLOR }]}
                        >{'DELETE'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

DeletePromptModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journal_id: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
};
