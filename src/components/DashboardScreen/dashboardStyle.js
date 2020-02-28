import { Dimensions, Platform, StyleSheet } from 'react-native';
import constant from '../../utility/constants';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const TextColor = '#736063';
const dashboardStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: Platform.OS === 'ios' ? deviceHeight * 0.05 : 0,
    },
    subHeaderTextStyle: {
        color: TextColor,
        fontSize: 18,
        letterSpacing: 2,
        fontFamily: constant.SUB_HEADER_FONT,
    },
    couponContainer: {
        width: deviceWidth,
        backgroundColor: constant.TEXT_COLOR,
        padding: 15
    },
    whiteText: {
        color: '#fff'
    },
    headerImage: {
        height: 100,
        width: '100%'
    },
    footerImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    footerImageContainer: {
        height: 170,
        width: '100%',
    },
    footerBoxTextStyle: {
        color: TextColor,
        fontSize: 8,
        letterSpacing: 2,
        fontFamily: constant.SUB_HEADER_FONT,
        textAlign: 'center'
    },
    footerIconContainer: {
        // paddingTop: '5%',
        alignSelf: 'center',
        height: '50%'
    },
    helperContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        // height: 200,
        marginBottom: 20
    },
    helperImages: {
        width: '48%',
        height: 120,
        resizeMode: 'contain',
    },
    helpImages: {
        width: '100%',
        height: '100%',
        // resizeMode: 'contain',
    },
    footerTextContainer: {
        height: '50%'
    },
    footerIconStyle: {
        width: deviceHeight * 0.05,
        height: deviceHeight * 0.05,
        resizeMode: 'contain'
    },
    tabIconStyle: {
        width: 80,
        height: 80,
        resizeMode: 'contain'
    },
    marginBottom20: {
        marginBottom: 20
    },
    optionsIconStyle: {
        width: deviceWidth * 0.09,
        height: deviceWidth * 0.09,
        resizeMode: 'contain',
        marginHorizontal: 5
    },
    deleteIconStyle: {
        width: deviceWidth * 0.1,
        height: deviceWidth * 0.1,
        resizeMode: 'contain',
        marginHorizontal: 5
    },
    optionsTextStyle: {
        color: '#fff',
        fontSize: 14,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
        fontWeight: 'bold',
        marginBottom: 5
    },
    iconTextStyle: {
        color: constant.TEXT_COLOR,
        fontSize: 10,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
    }
});
export default dashboardStyle;
