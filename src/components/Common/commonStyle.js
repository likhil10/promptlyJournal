import { Dimensions, Platform, StyleSheet } from 'react-native';
import constant from '../../utility/constants';

const { height, width } = Dimensions.get('window');

const TextColor = '#736063';
const LabelColor = '#ddd5cd';
const SecondaryColor = '#ece4dc';
const SecondaryTextColor = '#666666';
const WhiteColor = '#ffffff';

const commonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WhiteColor,
    },
    containers: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: WhiteColor,
        borderRadius: 20
    },
    centerAndBackgroundWhite: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WhiteColor,
    },
    crossButton: {
        backgroundColor: TextColor,
        height: 40,
        width: 40,
        borderRadius: 20,
    },
    topText: {
        backgroundColor: '#e4ccb0',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 20,
    },
    height1: {
        height: height * 0.1,
    },
    text: {
        color: TextColor,
        letterSpacing: 2,
        marginVertical: 10,
        fontFamily: constant.SUB_HEADER_FONT,
    },
    texts: {
        color: TextColor,
        letterSpacing: 2,
        marginVertical: 10,
        marginHorizontal: 5,
        fontSize: 15,
        fontFamily: constant.HEADER_FONT,
    },
    giveGetText: {
        color: TextColor,
        letterSpacing: 2,
        fontSize: 15,
        fontWeight: 'bold',
        fontFamily: constant.SUB_HEADER_FONT,
    },
    upperContainer: {
        height: height * 0.35,
        width: '100%',
        overflow: 'hidden',
    },
    height40: {
        height: height * 0.4,
    },
    termsAndConditions: {
        color: TextColor,
        marginLeft: -10,
        marginRight: 10,
        fontSize: 15,
        fontFamily: constant.TEXT_FONT,
    },
    topImage: {
        width: '100%',
        height: height * 0.4,
    },
    topImageAndroid: {
        width: '100%',
        height: height * 0.35,
    },
    height: {
        height: height * 0.3,
    },
    borderRadius: {
        borderRadius: 20,
    },
    contentCenters: {
        marginTop: 40,
        width,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WhiteColor,
    },
    totalYearsStyle: {
        fontFamily: constant.SUB_HEADER_FONT,
        fontSize: 12,
        letterSpacing: 1,
        color: TextColor,
        // width: '100%',
    },
    dashboardContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    rightPromptContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#e5e5e5',
    },
    backgroundContainer: {
        flex: 1,
        backgroundColor: SecondaryColor,
    },
    modelContainer: {
        flex: 1,
        margin: 4,
    },
    leftContainer: {
        alignItems: 'flex-end'
    },
    modalCenterContainer: {
        flex: 1,
        alignItems: 'center',
    },
    modalLeftContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
    },
    modalContentContainer: {
        flex: 1,
        width: '100%'
    },
    modalStyle: {
        backgroundColor: '#fff',
        flex: 1,
        marginTop: Platform.OS === 'ios' ? height * 0.05 : height * 0.02,
    },
    modalStyles: {
        backgroundColor: 'transparent',
        width: '85%',
        justifyContent: 'center',
        alignSelf: 'center',
        // height: '90%',
        borderRadius: 20,
        overflow: 'visible'
    },
    welcomeModalStyle: {
        backgroundColor: 'rgba(115, 96, 99, .7)',
        flex: 1
    },
    flexContainer: {
        flex: 1
    },
    gifsContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    width100: {
        width: '100%'
    },
    centerContainer: {
        // flex: 1,
        paddingTop: Platform.OS === 'ios' ? height * 0.03 : 0,
        alignItems: 'center',
        paddingBottom: 15,
    },
    contentContainer: {
        backgroundColor: constant.THEME_COLOR,
        width: width * 0.9,
        paddingBottom: 15,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 0 },
        // shadowOpacity: 0.8,
        // shadowRadius: 1,
        // elevation: 1,
    },
    centerItemsContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerContainer: {
        backgroundColor: 'white',
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'ios' ? height * 0.03 : 0,
    },
    headerLeftContainer: {
        // flex: 1,
        width: width * 0.8,
        flexDirection: 'row',
        paddingLeft: width * 0.04,
        paddingVertical: 10,
    },
    headerRightContainer: {
        // flex: 1,
        width: width * 0.2,
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignItems: 'center'
    },
    carouselItem: {
        // backgroundColor: '#dddddd',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dotStyle: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ffffff'
    },
    inactiveDotStyle: {
        backgroundColor: '#a9a9a9'
    },
    headerIconContainer: {
        padding: 10,
    },
    imageCircle: {
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: height * 0.04,
        backgroundColor: '#dedede',
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageModal: {
        backgroundColor: '#fff',
        width: width * 0.8,
        height: width * 0.8,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    openedImage: {
        width: width * 0.6,
        height: width * 0.6,
    },
    headerImage: {
        width: height * 0.08,
        height: height * 0.08,
        borderRadius: height * 0.04,
    },
    headerIconStyle: {
        width: height * 0.06,
        height: height * 0.06,
        resizeMode: 'contain'
    },
    textStyle: {
        color: SecondaryTextColor,
        fontSize: 16,
        fontFamily: constant.TEXT_FONT,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    headerBox: {
        marginVertical: 10,
        alignItems: 'center',
    },
    headerSubscriptionInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
    headerTextStyle: {
        color: TextColor,
        fontFamily: constant.HEADER_FONT,
        letterSpacing: 2,
        fontSize: 25,
    },
    headerFontSize: {
        fontSize: 18,
        letterSpacing: 1,
    },
    fontSize18: {
        fontSize: 18,
        letterSpacing: 1,
    },
    subHeadingText: {
        color: TextColor,
        fontFamily: constant.TEXT_FONT,
        letterSpacing: 1,
        fontSize: 20,
    },
    subscriptionTextStyle: {
        color: TextColor,
        fontFamily: constant.HEADER_FONT,
        fontSize: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },
    spinnerStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        opacity: 0.8,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    loadingText: {
        fontSize: 16,
        color: TextColor,
        fontFamily: constant.TEXT_FONT,
        marginVertical: 10,
        textAlign: 'center'
    },
    iconStyle: {
        width: 200,
        height: 100,
        // marginLeft: 13,
        // marginRight: 8,
        marginVertical: 30,
        resizeMode: 'contain'
    },
    iconStyles: {
        width: 150,
        height: 50,
        // marginLeft: 13,
        // marginRight: 8,
        resizeMode: 'contain'
    },
    tabIconStyle: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    textInput: {
        color: TextColor,
        fontSize: 16,
    },
    textAreaInput: {
        color: TextColor,
        fontSize: 16,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
        borderBottomWidth: 1,
        borderColor: TextColor
    },
    textContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 3,
        paddingBottom: Platform.OS === 'android' ? 2 : 0
    },
    textBoxLabel: {
        color: LabelColor,
        fontWeight: '400',
        fontSize: 16,
    },
    isPurple: {
        alignSelf: 'baseline',
        flexDirection: 'row',
        height: 50,
        borderRadius: 30,
        backgroundColor: TextColor,
        margin: 10,
        marginRight: 10,
    },
    buttonBox: {
        alignSelf: 'baseline',
        flexDirection: 'row',
        height: 50,
        borderRadius: 30,
        backgroundColor: WhiteColor,
        margin: 10,
        marginRight: 10,
    },
    pillShapeButtonStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        // width: '35%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        marginVertical: 10,
        margin: 5
    },
    pillShapeRegisterButtonStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        // width: '40%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        marginVertical: 10,
        margin: 5
    },
    buttonContent: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30
    },
    buttonText: {
        fontSize: 15,
        color: TextColor,
        fontFamily: constant.HEADER_FONT,
        paddingVertical: 10
    },
    isPurpleText: {
        fontSize: 15,
        color: WhiteColor,
        fontFamily: constant.HEADER_FONT,
        paddingVertical: 10
    },
    whiteTexts: {
        fontSize: 15,
        color: WhiteColor,
        fontFamily: constant.SUB_HEADER_FONT,
        paddingVertical: 10,
        letterSpacing: 2,
        fontWeight: 'bold',
    },
    linkContainer: {
        flex: 1,
        alignSelf: 'baseline',
        flexDirection: 'row',
        margin: 5,
    },
    linkPasscodeContainer: {
        flex: 1,
        alignSelf: 'flex-end',
        // flexDirection: 'row',
        margin: 5,
    },
    linkContent: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    linkPasscodeContent: {
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
        // marginTop: 5
    },
    linkText: {
        fontSize: 14,
        color: TextColor,
        fontFamily: constant.SUB_HEADER_FONT,
    },
    flexRow: {
        flex: 1,
        flexDirection: 'row',
    },
    subHeaderTextStyle: {
        color: TextColor,
        fontSize: 16,
        letterSpacing: 2,
        fontFamily: constant.SUB_HEADER_FONT,
    },
    middleLine: {
        width: '90%',
        backgroundColor: constant.TEXT_COLOR,
        height: 1.5,
        marginTop: 8
    },
    welcomeHeaderTextStyle: {
        color: '#fff',
        fontSize: 14,
        letterSpacing: 2,
        fontFamily: constant.SUB_HEADER_FONT,
        padding: 5
    },
    italicTextStyle: {
        color: TextColor,
        fontSize: 14,
        fontFamily: constant.TEXT_FONT,
    },
    paddingTop5: {
        paddingTop: 5
    },
    padding10: {
        padding: 10
    },
    paddingVertical20: {
        paddingVertical: 20
    },
    paddingVertical5: {
        paddingVertical: 5
    },
    padding5: {
        padding: 5
    },
    padding3: {
        padding: 3
    },
    padding1: {
        padding: 1
    },
    paddingTop20: {
        paddingTop: 20
    },
    paddingTop10: {
        paddingTop: 10
    },
    paddingBottom20: {
        paddingBottom: 20
    },
    paddingTop30: {
        paddingTop: 30
    },
    padding20: {
        padding: 20
    },
    padding16: {
        padding: 16
    },
    marginTop10: {
        padding: 10
    },
    marginTop15: {
        marginTop: 15
    },
    marginHorizontal5: {
        marginHorizontal: 5
    },
    marginVertical5: {
        marginVertical: 5
    },
    paddingHorizontal20: {
        paddingHorizontal: 20
    },
    backColorWhite: {
        backgroundColor: '#fff'
    },
    marginVertical10: {
        marginVertical: 10
    },
    backColorFaded: {
        backgroundColor: 'rgba(255,255,255, 0.7)'
    },
    justifyFlexEnd: {
        justifyContent: 'flex-end'
    },
    textAlignCenter: {
        textAlign: 'center',
    },
    listItemContainer: {
        backgroundColor: '#fafafa',
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10
    },
    listItemContainers: {
        backgroundColor: '#fafafa',
        marginVertical: 10,
        width: width * 0.9,
        flexDirection: 'row',
        padding: 5,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    horizontalListItemContainer: {
        backgroundColor: '#fafafa',
        marginHorizontal: 10,
        width: width / 4,
        alignItems: 'center',
        borderRadius: 10,
        paddingTop: height * 0.01,
        flex: 1,
        height: height * 0.15
    },
    contentCenter: {
        flex: 1,
        justifyContent: 'center',
    },
    datePickerContainer: {
        padding: 10,
        width: width * 0.7,
        alignSelf: 'baseline',
        marginLeft: 10,
    },
    datePickerInput: {
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 3,
        alignItems: 'flex-start',
        padding: 16,
    },
    listContainer: {
        flex: 1,
        width: width * 0.9
    },
    textCenter: {
        textAlign: 'center'
    },
    textFont12: {
        fontSize: 12
    },
    textFont14: {
        fontSize: 14
    },
    textFont16: {
        fontSize: 16
    },
    topLeftContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
    topRightContainer: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    bottomLeftContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
    bottomRightContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    whiteText: {
        color: '#fff'
    },
    imageContain: {
        resizeMode: 'contain'
    },
    centeredItems: {
        //  flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf:'center'
    },
    yesButton: {
        backgroundColor: constant.TEXT_COLOR,
        margin: 20,
        borderRadius: 2,
        paddingHorizontal: 20
    },
    okButton: {
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 10,
        paddingBottom: 10,
    },
    saveImageButton: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        right: 10,
        top: 10,
        position: 'absolute'
    },
    noButton: {
        backgroundColor: constant.WHITE_COLOR,
        borderColor: constant.TEXT_COLOR,
        borderWidth: 1,
        borderRadius: 2,
        margin: 20,
        paddingHorizontal: 20
    },
    flexDirectionRow: {
        flexDirection: 'row'
    },
    messageText: {
        fontSize: 22,
        color: constant.TEXT_COLOR
    },
    messageBoldText: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalButton: {
        backgroundColor: constant.WHITE_COLOR,
        borderColor: constant.TEXT_COLOR,
        borderWidth: 1,
        borderRadius: 2,
        margin: 5,
        padding: 5
    },
    promptSectionTextStyle: {
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: 22,
        color: constant.TEXT_COLOR,
        letterSpacing: 1,
        paddingTop: 7
    },
    underlineTextStyle: {
        color: TextColor,
        fontSize: 14,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
    },
    inputText: {
        width: '100%',
        fontSize: 16,
        color: constant.TEXT_COLOR,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: '#e4e1e1'
    },
    dropDownTextBlock: {
        width: 8,
        justifyContent: 'center'
    },
    dropDownBlockStyle: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    dropDownTextBlockForPartitionView: {
        width: width * 0.43,
        justifyContent: 'center'
    },
    dropDownFieldTextStyle: {
        fontSize: 16,
        color: constant.TEXT_COLOR,
        paddingHorizontal: 10
    },
    dropDownStyle: {
        width: '80%',
        marginTop: 5,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: TextColor
    },
    dropDownContainerStyle: {
        width: '100%',
        marginTop: 10,
        paddingVertical: 15,
        paddingHorizontal: 5,
        backgroundColor: '#e4e1e18a',
        flexDirection: 'row'
    },
    dropDownTextStyle: {
        fontSize: 16,
        color: constant.TEXT_COLOR,
    },
    rowTextStyle: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        fontSize: 16,
        color: constant.TEXT_COLOR,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
    },
    selectedTextStyle: {
        color: 'red',
    }

});
export default commonStyle;
