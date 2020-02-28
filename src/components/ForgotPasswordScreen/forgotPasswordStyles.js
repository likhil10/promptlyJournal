import { StyleSheet } from 'react-native';
import constant from '../../utility/constants';

const TextColor = '#736063';
const forgotPasswordStyle = StyleSheet.create({

    textStyle: {
        color: TextColor,
        fontFamily: constant.TEXT_FONT,
        fontSize: 20,
        marginHorizontal: 20,
    },
    linkContainer: {
        flexDirection: 'row',
        margin: 20,
        alignSelf: 'baseline'
    },
});
export default forgotPasswordStyle;
