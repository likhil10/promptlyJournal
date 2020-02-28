import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-simple-modal';
import PropTypes from 'prop-types';
import style from './commonStyle';
import Constant from '../../utility/constants';


const QuestionModal = (props) => {
    const {
        open, close, message, approve
    } = props;
    return (
        <Modal
            open={open}
            closeOnTouchOutside={false}
            modalStyle={{ backgroundColor: Constant.WHITE_COLOR }}
        >
            <View style={[style.centeredItems, style.padding20]}>
                <Text style={style.subHeaderTextStyle}>{message}</Text>
                <View style={style.flexDirectionRow}>
                    <TouchableOpacity
                        onPress={close}
                        style={[style.padding10, style.noButton]}
                    >
                        <Text style={style.buttonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={approve}
                        style={[style.padding10, style.yesButton]}
                    >
                        <Text style={[style.buttonText, { color: Constant.WHITE_COLOR }]}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default QuestionModal;

QuestionModal.propTypes = {
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    approve: PropTypes.func,
};

QuestionModal.defaultProps = {
    approve: () => {},
};
