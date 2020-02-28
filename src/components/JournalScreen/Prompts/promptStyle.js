import { StyleSheet } from 'react-native';
import constant from '../../../utility/constants';

const promptStyle = StyleSheet.create({
    editImageContainer: {
        backgroundColor: '#393939',
        flex: 1,
        width: '100%',
        padding: 20
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center'
    },
    endContainer: {
        alignItems: 'flex-end',
        padding: 10
    },
    messageText: {
        fontSize: 18,
        color: constant.TEXT_COLOR
    },
    writtenByText: {
        color: constant.TEXT_COLOR,
        fontSize: 20
    },
});
export default promptStyle;
