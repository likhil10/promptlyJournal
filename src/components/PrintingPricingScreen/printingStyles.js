import {
    Dimensions,
    Platform
} from 'react-native';
import Constant from '../../utility/constants';

const React = require('react-native');

const { height, width } = Dimensions.get('window');

const TextColor = '#736063';
const ButtonBackground = '#725f62';
const WhiteColor = '#ffffff';
const BackgroundColor = '#eadac2';

const printingStyles = React.StyleSheet.create({
    container: {
        backgroundColor: WhiteColor,
        flex: 1,
    },
    paddingTopMost: {
        paddingTop: Platform.OS === 'ios' ? height * 0.05 : 0,
    },
    contentContainer: {
        backgroundColor: WhiteColor,
        width: width * 0.8,
        // paddingVertical: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 1,
    },
    pagePricing: {
        fontFamily: Constant.TEXT_FONT,
        color: TextColor,
    },
    containerStyle: {
        backgroundColor: '#ffffff',
        borderWidth: 0,
        padding: 0
    },
    firstLine: {
        fontSize: 8,
        fontFamily: Constant.HEADER_FONT,
        marginVertical: 3,
        letterSpacing: 2,
        color: TextColor,
        textAlign: 'center'
    },
    secondLine: {
        fontSize: 7,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 2,
        marginVertical: 3,
        color: TextColor,
        textAlign: 'center'
    },
    upperSection: {
        justifyContent: 'center',
        width: width * 0.9,
        marginLeft: width * 0.05,
    },
    thirdLine: {
        fontSize: 8,
        fontFamily: Constant.TEXT_FONT,
        marginVertical: 3,
        letterSpacing: 1,
        color: TextColor,
        textAlign: 'center'
    },
    checkedContainer: {
        backgroundColor: '#fcfcfc',
        width: width * 0.8,
        marginVertical: 15,
        // height: height * 0.3,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    },
    bindingImage: {
        height: height * 0.15,
        width: '35%',
        // resizeMode: 'contain',
    },
    topHeader: {
        position: 'relative',
        backgroundColor: BackgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 15,
        paddingHorizontal: 10
    },
    section: {
        width,
    },
    buttonFull: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedButton: {
        height: '100%',
        backgroundColor: ButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedText: {
        color: WhiteColor,
        fontFamily: Constant.HEADER_FONT,
        letterSpacing: 1,
        fontSize: 13,
    },
    unselectedText: {
        color: TextColor,
        fontFamily: Constant.HEADER_FONT,
        letterSpacing: 1,
        fontSize: 15,
        marginHorizontal: 10,
    },
    unselectedButton: {
        backgroundColor: WhiteColor,
        justifyContent: 'center',
        alignItems: 'center',
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
    },
    colorShade: {
        height: width * 0.15,
        width: width * 0.15,
        marginVertical: 5,
        marginHorizontal: 5,
        borderRadius: width * 0.75,
    },
    insideCover: {
        height: '100%',
        width: '100%',
        resizeMode: 'contain',
    },
    insideCoverContainer: {
        height: 100,
        width: '28%',
        marginVertical: 10,
        marginHorizontal: '2%',
        resizeMode: 'contain',
        backgroundColor: '#fff'
    },
    colorShadeShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 4,
    },
    topHeaderText: {
        color: WhiteColor,
        fontSize: 10,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 2,
        marginBottom: 5,
    },
    coverTextContent: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    coverPreview: {
        marginVertical: 10,
        width: '91%',
        flexDirection: 'row',
    },
    headerContent: {
        marginHorizontal: 5,
        alignItems: 'center',
    },
    bookImageContainer: {
        alignSelf: 'center',
        height: height < 750 ? '90%' : '80%',
        width: width / 3,
    },
    bookImage: {
        height: '100%',
        width: '100%'
    },
    overlayView: {
        height: '100%',
        width: '100%',
        opacity: 0.6,
        alignItems: 'center'
    },
    swiperStyle: {
        backgroundColor: '#f3f3f3',
        height: 500,
        alignItems: 'center',
        justifyContent: 'center'
    },
    swiperSection: {
        width: '70%',
        alignSelf: 'center',
        height: '80%',
        marginVertical: 10,
    },
    centerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '85%',
        alignSelf: 'center',
    },
    headerContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerImage: {
        height: 150,
        width: '100%'
    },
    heightWidth: {
        height,
        width,
    },
    swipeScreen: {
        flex: 1,
    },
    underlines: {
        backgroundColor: ButtonBackground,
        height: 1,
    },
    headerTextStyle: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 17,
        letterSpacing: 2,
        width: '80%',
    },
    imageStyle: {
        width,
        height: 200,
        resizeMode: 'contain'
    },
    justifyAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    justifyAligns: {
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textUnderline: {
        textDecorationLine: 'underline',
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 1,
    },
    coverText: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 1,
        width: '80%',
        marginVertical: 5,
        fontSize: 15,
        alignSelf: 'center',
    },
    headerText: {
        color: TextColor,
        fontFamily: Constant.HEADER_FONT,
        fontSize: 17,
        letterSpacing: 1,
        marginVertical: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    buttonText: {
        color: TextColor,
        fontSize: 25,
    },
    marginVertical: {
        marginVertical: 20,
    },
    marginVerticalSmall: {
        marginVertical: 15
    },
    paraContainer: {
        width: '100%',
        marginVertical: 10
    },
    paraText: {
        color: TextColor,
        fontFamily: Constant.HEADER_FONT,
        fontSize: 15,
        letterSpacing: 1,
        textAlign: 'center',
        width: '100%'
    },
    underline: {
        backgroundColor: '#dbd7d8',
        height: 2,
        width: '100%',
    },
    smallUnderline: {
        backgroundColor: WhiteColor,
        height: 1,
        width: 30,
        // marginTop: 5,
        // marginBottom: 10,
    },
    coverSection: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    coverSectionHeight: {
        justifyContent: 'flex-start',
        height: 300,
        width: '48%',
    },
    sectionText: {
        fontFamily: Constant.TEXT_FONT,
        fontSize: 16,
        color: TextColor,
        width: '100%',
        textAlign: 'center',
    },
    customText: {
        fontFamily: Constant.TEXT_FONT,
        fontSize: 20,
        color: TextColor,
        width: '100%',
        textAlign: 'center',
    },
    moneyContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        marginVertical: 5,
    },
    amount: {
        fontSize: 25,
        marginTop: 6,
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
    },
    money: {
        fontSize: 40,
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
    },
    footer: {
        width,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BackgroundColor,
        paddingVertical: 10
    },
    nextBackButtonView: {
        width: width * 0.2,
        height: '100%',
        flexDirection: 'column',
    },
    nextBackButton: {
        width: width * 0.08,
        height: width * 0.08,
        borderRadius: width * 0.04,
        backgroundColor: '#fff'
    },
    nextBackButtonText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        letterSpacing: 1
    },
    pageNumber: {
        fontSize: 12,
        color: '#fff',
        fontFamily: Constant.TEXT_FONT,
        letterSpacing: 1
    },
    printAmount: {
        fontSize: 17,
        color: '#fff',
        fontFamily: Constant.TEXT_FONT,
        letterSpacing: 1
    },
    middleFooter: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    amountUnderlined: {
        fontSize: 24,
        marginTop: 6,
        height: 28,
        color: TextColor,
        borderColor: '#8c7f84',
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
    },
    coverImage: {
        width: '100%',
        height: 130,
        resizeMode: 'contain',
    },
    icons: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexColumn: {
        flexDirection: 'column',
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    boxContainer: {
        width: 60,
    },
    datePickerStyle: {
        paddingVertical: 10,
        marginLeft: 0,
        padding: 0
    },
    checkBoxStyle: {
        width: 15,
        height: 15
    },
    printOrderAmount: {
        fontSize: 30,
        color: TextColor,
        fontFamily: Constant.TEXT_FONT,
        letterSpacing: 1
    },
    buttonBox: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 20,
        paddingHorizontal: 30
    },
    coverTextContainer: {
        height: '60%',
        width: '80%'
    },
    orderBookContainer: {
        alignSelf: 'center',
        height: 280,
        width: 200,
        marginBottom: 20
    },
    cartUnderLine: {
        backgroundColor: '#726e62',
        height: 2,
        width: '30%'
    },
    previewHeaderTextStyle: {
        color: TextColor,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontSize: 14,
        letterSpacing: 2,
    },
    pagingContainer: {
        paddingVertical: 15,
        width: '100%',
        alignItems: 'center',
    },
    pdfContainer: {
        flex: 1,
        width,
        backgroundColor: '#808080',
        paddingVertical: 15
    },
    projectContainer: {
        borderWidth: 1,
        borderColor: '#725f62',
        padding: 5,
        margin: 10
    },
    previewContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    cartIconStyle: {
        width: 25,
        height: 25,
        resizeMode: 'contain'
    },
    cartContent: {
        marginLeft: 15,
        // paddingRight: 25,
    },
    countIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    navItemStyle: {
        color: '#fff',
        fontSize: 10,
        fontFamily: Constant.PARAGRAPH_TEXT_FONT,
        fontWeight: 'bold'
    },
    inputStyle: {
        textAlign: 'center',
        letterSpacing: 1,
        borderBottomWidth: 1,
        borderColor: '#736063',
        padding: 0
    },
    previewText: {
        fontSize: 12,
        color: '#fff',
        fontFamily: Constant.TEXT_FONT,
        marginTop: 10,
        textAlign: 'center'
    },
    activityContainer: {
        alignItems: 'center',
        padding: 10
    },
    bookLine: {
        borderColor: TextColor,
        borderWidth: 0.5,
        width: '20%',
        marginVertical: 10
    },

});
module.exports = printingStyles;
