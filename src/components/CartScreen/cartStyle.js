import {
    Dimensions,
    Platform,
    StyleSheet
} from 'react-native';
import Constant from '../../utility/constants';

const { height, width } = Dimensions.get('window');

const WhiteColor = '#ffffff';
const BackgroundColor = '#e4e1e1';
const TextColor = '#736063';

const cartStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WhiteColor,
    },
    paddingTopMost: {
        paddingTop: Platform.OS === 'ios' ? height * 0.05 : 0,
    },
    headerTextStyle: {
        fontFamily: Constant.SUB_HEADER_FONT,
        fontSize: 18,
        color: TextColor,
        letterSpacing: 2,
        textAlign: 'center',
    },
    justifyAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 14,
        letterSpacing: 1,
    },
    textInput: {
        textAlign: 'center',
        letterSpacing: 1,
        borderWidth: 1,
        borderColor: '#736063',
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 14,
        color: TextColor,
    },
    amountContainer: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 20,
        alignItems: 'center'
    },
    itemContainer: {
        paddingHorizontal: '5%',
        paddingVertical: 20,
        backgroundColor: BackgroundColor,
        width: '100%',
        flexDirection: 'row'
    },
    cartBookContainer: {
        alignSelf: 'center',
        height: width / 3.2,
        width: '75%',
    },
    bookImage: {
        height: '100%',
        width: '100%',
    },
    overlayView: {
        height: '100%',
        width: '100%',
        opacity: 0.6,
        alignItems: 'center'
    },
    coverTextContainer: {
        height: '60%',
        width: '80%'
    },
    firstLine: {
        fontSize: 3,
        fontFamily: Constant.HEADER_FONT,
        marginVertical: 3,
        letterSpacing: 2,
        color: TextColor,
        textAlign: 'center'
    },
    secondLine: {
        fontSize: 2,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 2,
        marginVertical: 3,
        color: TextColor,
        textAlign: 'center'
    },
    thirdLine: {
        fontSize: 3,
        fontFamily: Constant.TEXT_FONT,
        marginVertical: 3,
        letterSpacing: 1,
        color: TextColor,
        textAlign: 'center'
    },
    buttonBox: {
        borderRadius: 40,
        backgroundColor: BackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        paddingVertical: 20,
        width: '100%'
    },
    buttonText: {
        color: TextColor,
        fontSize: 16,
    },
    flexRowContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5
    },
    amountTextStyle: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 18,
        letterSpacing: 1,
        textAlign: 'right'
    },
    underlines: {
        width: '100%',
        borderWidth: 1,
        marginVertical: 15,
        borderColor: TextColor
    },
    totalTextStyle: {
        color: TextColor,
        fontFamily: Constant.TEXT_FONT,
        fontSize: 25,
        letterSpacing: 1,
        textAlign: 'right'
    },
    width60: {
        width: '60%'
    },
    width40: {
        width: '40%'
    },
    orderAmountContainer: {
        paddingHorizontal: 20,
        width: '100%',
    },
    upperSection: {
        width: '90%',
    },
    accordTouchBody: {
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    themeButtonText: {
        color: WhiteColor,
        fontSize: 14,
        fontWeight: 'bold'
    },
    themeButtonBox: {
        borderRadius: 40,
        backgroundColor: TextColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
        paddingVertical: 20,
        width: '100%'
    },
    subHeadingTextStyle: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 18,
        letterSpacing: 1,
        textAlign: 'left'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10
    },
    boxContainer: {
        width: 40,
    },
    checkBoxStyle: {
        width: 15,
        height: 15
    },
    boxContainerStyle: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        padding: 0,
        marginLeft: 0
    },
    shippingOption: {
        backgroundColor: '#ffffff',
        marginVertical: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.6,
        shadowRadius: 2,
        elevation: 2,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center'
    },
    paymentBox: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderColor: '#219653',
        borderWidth: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 10,
        paddingVertical: 10,
        width: '100%'
    },
    paymentBoxText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    },
    tabIconStyle: {
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    linkContainer: {
        alignSelf: 'baseline',
        marginTop: 20
    },
    headerLine: {
        borderWidth: 1,
        borderColor: '#736063',
        width: '8%',
        marginTop: 15,
        alignSelf: 'center'
    },
    headerContainer: {
        marginVertical: 20,
        width: '100%'
    },
    bookLine: {
        borderColor: TextColor,
        borderWidth: 0.2,
        width: '20%',
        marginVertical: 2
    },
});
export default cartStyle;
