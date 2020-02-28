import { Dimensions, StyleSheet } from 'react-native';
import Constant from '../../utility/constants';

const deviceHeight = Dimensions.get('window').height;

const addJournalStyle = StyleSheet.create({
    listItemContainer: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        flex: 1,
        borderRadius: 5,
    },
    deviceHeight: {
        height: '100%'
    },
    selectButton: {
        width: 120,
        backgroundColor: '#e4e3e1',
        height: 60,
        marginVertical: 5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        width: 120,
        backgroundColor: '#fff',
        height: 60,
        marginVertical: 5,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 15,
        color: '#736063',
        fontFamily: Constant.SUB_HEADER_FONT,
    },
    itemContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: deviceHeight * 0.04
    },
    centerContainer: {
        // flex: 1,
        alignItems: 'center',
        // paddingBottom: 15,
    },
    infoText: {
        color: '#ffffff',
        marginHorizontal: 20,
        fontSize: 16,
        fontFamily: Constant.SUB_HEADER_FONT,
        marginBottom: 5
    }


});
export default addJournalStyle;
