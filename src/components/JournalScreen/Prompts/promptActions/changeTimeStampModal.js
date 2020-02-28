import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    NetInfo,
    AsyncStorage
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import commonStyle from '../../../Common/commonStyle';
import Constant from '../../../../utility/constants';
import promptStyles from './../promptStyle';
import { savePromptAction } from '../../../../actions/savePromptAction';
import { mixpanelTrack } from '../../../../utility/mixpanelHelperComponent';

export default class ChangeTimeStampModal extends Component {
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
            }, () => mixpanelTrack('Date Updated', this.state.email));
        });
    }

    hitChangeTimeAPI = (date) => {
        const { prompt, journal_id } = this.props;
        const { dispatch } = this.props.navigation;
        this.props.close();
        const body = {
            answer_date: moment(date.dateString)
                .format('YYYY/MM/DD'),
        };
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(savePromptAction(journal_id, prompt._id, body))
                        .then(() => {
                            this.props.hitGetPromptsAPI();
                            this.getEmail();
                            this.props.openAlertModalMessage(Constant.DATE_CHANGE_SUCCESS);
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
                        style={[commonStyle.modalButton, commonStyle.paddingHorizontal20]}
                    >
                        <Text
                            style={[commonStyle.textStyle, commonStyle.textCenter, promptStyles.messageText]}
                        >
                            {prompt && prompt.answeredDate && moment(prompt.answeredDate)
                                .format('MMMM DD, YYYY')}
                        </Text>
                    </View>
                    <Calendar
                        current={prompt && prompt.answeredDate && prompt.answeredDate}
                        onDayPress={(day) => this.hitChangeTimeAPI(day)}
                        markedDates={{
                            [moment(prompt.answeredDate)
                                .format('YYYY-MM-DD')]: {
                                selected: true,
                                text: { textDecorationLine: 'underline' }
                            }
                        }}
                        theme={{
                            textSectionTitleColor: Constant.TEXT_COLOR,
                            selectedDayBackgroundColor: Constant.TEXT_COLOR,
                            selectedDayTextColor: '#fff',
                            todayTextColor: Constant.TEXT_COLOR,
                            dayTextColor: Constant.TEXT_COLOR,
                            arrowColor: Constant.TEXT_COLOR,
                            monthTextColor: Constant.TEXT_COLOR,
                            fontFamily: Constant.TEXT_FONT,
                            textMonthFontFamily: Constant.TEXT_FONT,
                            textDayHeaderFontFamily: Constant.TEXT_FONT,
                            textDayFontSize: 16,
                            textMonthFontSize: 16,
                            textDayHeaderFontSize: 16
                        }}
                    />
                </View>
            </Modal>
        );
    }
}

ChangeTimeStampModal.propTypes = {
    dispatch: PropTypes.func.isRequired,
    close: PropTypes.func.isRequired,
    openAlertModalMessage: PropTypes.func.isRequired,
    hitGetPromptsAPI: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    journal_id: PropTypes.string.isRequired,
    prompt: PropTypes.string.isRequired,
    navigation: PropTypes.object.isRequired,
};
