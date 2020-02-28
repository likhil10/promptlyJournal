import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    AsyncStorage,
} from 'react-native';
import Modal from 'react-native-simple-modal';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import commonStyle from '../../../Common/commonStyle';
import promptStyles from './../promptStyle';
import Constant from '../../../../utility/constants';
import { changeAuthorAction } from '../../../../actions/changeAuthorAction';
import { mixpanelTrack } from '../../../../utility/mixpanelHelperComponent';

export default class WrittenByPromptModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
        };
    }

    getEmail = () => {
        AsyncStorage.getItem(Constant.EMAIL).then((email) => {
            this.setState({
                email,
            }, () => mixpanelTrack('Author Updated', this.state.email));
        });
    };

    modalDidClose = () => {
        this.props.close();
    };

    hitChangeAuthorAPI = (authorId) => {
        const { prompt, journal_id } = this.props;
        const { dispatch } = this.props.navigation;
        this.props.close();
        const body = {
            aurhor_id: authorId,
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(changeAuthorAction(journal_id, prompt._id, body))
                        .then(() => {
                            this.props.hitGetPromptsAPI();
                            this.getEmail();
                            this.props.openAlertModalMessage(Constant.AUTHOR_CHANGE_SUCCESS);
                        })
                        .catch(err => {
                            this.props.openAlertModalMessage(err);
                        });
                } else {
                    this.props.openAlertModalMessage(Constant.NETWORK_ERROR);
                }
            });
    };

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
                    <View
                        style={[commonStyle.modalButton, commonStyle.padding5, commonStyle.paddingHorizontal20]}
                    >
                        <Text
                            style={[commonStyle.textStyle, promptStyles.writtenByText]}
                        >
                            {'Written by: '}{prompt && prompt.answeredBy && prompt.answeredBy.writtenBy && _.startCase(prompt.answeredBy.writtenBy)}
                        </Text>
                    </View>
                    {prompt && prompt.author && prompt.author.length > 0 &&
                    <View style={[commonStyle.paddingVertical5]}>
                        {
                            prompt.author.map((author) => (
                                <TouchableOpacity
                                    key={author.authorId}
                                    style={[commonStyle.centeredItems, commonStyle.flexDirectionRow]}
                                    onPress={() => this.hitChangeAuthorAPI(author.authorId)}
                                >
                                    <Text style={[{
                                        color: Constant.TEXT_COLOR,
                                        fontSize: 20,
                                        fontFamily: Constant.TEXT_FONT,
                                    }, commonStyle.paddingVertical5]}
                                    >
                                        {author && author.writtenBy && _.startCase(author.writtenBy)}
                                    </Text>
                                    {<Ionicons
                                        name="md-checkmark"
                                        size={25}
                                        color={prompt.answeredBy && author.writtenBy === prompt.answeredBy.writtenBy ? Constant.TEXT_COLOR : 'transparent'}
                                        style={{ marginLeft: 10 }}
                                    />}
                                </TouchableOpacity>
                            ))
                        }
                    </View>
                    }
                </View>
            </Modal>
        );
    }
}

WrittenByPromptModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journal_id: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
};
