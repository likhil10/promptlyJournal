import React, { Component } from 'react';
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import style from './commonStyle';
import Constant from '../../utility/constants';
// import Ionicons from "react-native-vector-icons/Ionicons";

export default class AlertModal extends Component {
    modalDidClose = () => {
        this.props.close();
    };

    render() {
        const {
            open, message, nextLineMessage
        } = this.props;
        return (
            <Modal
                open={open}
                modalStyle={[{
                    backgroundColor: Constant.WHITE_COLOR, width: '80%', justifyContent: 'center', alignSelf: 'center'
                }, style.padding10]}
                modalDidClose={this.modalDidClose}
            >
                <View style={[style.centeredItems]}>
                    <Text style={[style.textStyle, style.textCenter, style.messageText]}>{message}</Text>
                    {nextLineMessage ?
                        <Text
                            style={[style.subHeaderTextStyle, style.textCenter, { fontFamily: Constant.TEXT_FONT, letterSpacing: 1 }]}
                        >{nextLineMessage}
                        </Text> : null}
                    <View style={style.middleLine} />
                    <TouchableOpacity
                        onPress={() => this.props.close()}
                        style={style.okButton}
                    >
                        <Text style={[style.buttonText, { textAlign: 'center', fontSize: 18, letterSpacing: 1 }]}>OK</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        );
    }
}

AlertModal.propTypes = {
    close: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    message: PropTypes.string,
    nextLineMessage: PropTypes.string,
};

AlertModal.defaultProps = {
    nextLineMessage: '',
    message: '',
};
