import { Dimensions, StyleSheet } from 'react-native';
import constant from '../../utility/constants';

const { width, height } = Dimensions.get('window');
const TextColor = '#736063';
const SecondaryColor = '#ece4dc';
const WhiteColor = '#ffffff';

const settingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WhiteColor,
    },
    topSection: {
        height: height * 0.3,
    },
    underline: {
        marginVertical: 15,
        backgroundColor: '#736063',
        height: 1,
    },
    rightSection: {
        flex: 13
    },
    leftSection: {
        flex: 1
    },
    pillShapedButton: {
        // width: 60,
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        width: '35%',
        height: 40,
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        marginVertical: 10,
        margin: 5
    },
    changePlanButton: {
        backgroundColor: 'white',
        marginVertical: 20,
        width: '30%',
        borderColor: '#736063',
        borderWidth: 1,
        borderRadius: 30,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    manageText: {
        fontFamily: 'Bodoni',
        fontSize: 17,
        width: '100%',
        color: TextColor,
        marginTop: 10,
        marginBottom: 15
    },
    smallText: {
        color: TextColor,
        fontSize: 10,
        letterSpacing: 1,
    },
    marginTop: {
        marginTop: 70,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
        // borderWidth: 0.75,
        borderRadius: 5,
        // borderColor: '#716064',
        color: '#8c7f84',
        backgroundColor: SecondaryColor,
    },
    centerContainer: {
        alignItems: 'center',
    },
    contentContainer: {
        backgroundColor: WhiteColor,
        width: width * 0.95,
    },
    profileContainer: {
        alignItems: 'center',
        alignSelf: 'baseline',
    },
    profileCircle: {
        width: 80,
        height: 80,
        borderRadius: 80 / 2,
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center'
    },
    profileTextStyle: {
        fontFamily: constant.SUB_HEADER_FONT,
        fontSize: 18,
        color: TextColor,
        letterSpacing: 2,
        alignSelf: 'center',
        paddingTop: 5,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    paddingVertical: {
        paddingVertical: 15,
    },
    settingsBox: {
        paddingVertical: 25,
        borderBottomWidth: 1,
    },
    headerTextStyle: {
        color: TextColor,
        fontFamily: constant.SUB_HEADER_FONT,
        fontSize: 18,
        letterSpacing: 2,
    },
    textStyle: {
        paddingBottom: 10,
        color: TextColor,
        fontSize: 16,
        fontFamily: constant.TEXT_FONT,
        letterSpacing: 1,
    },
    heightIncreased: {
        fontSize: 16,
        paddingBottom: 0,
        lineHeight: 25,
    },
    linkTextStyle: {
        color: TextColor,
        fontSize: 16,
        fontFamily: constant.TEXT_FONT,
        letterSpacing: 1,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    profileImageContainer: {
        alignItems: 'center',
        margin: 10
    },
    editProfileCircle: {
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center'
    },
    editProfileImage: {
        width: 140,
        height: 140,
        borderRadius: 140 / 2,
    },
    trashIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        backgroundColor: '#dedede',
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerWrapper: {
        borderBottomWidth: 2,
        borderColor: 'white',
    },
    headerText: {
        textAlign: 'center',
        fontWeight: '500',

        fontSize: 16,
        color: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    contentWrapper: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'gray',
    },
    inactive: {
        backgroundColor: 'black',
    },


    onePartitionBlock: {
        width: width * 0.43
    },
    secondPartitionBlock: {
        width: width * 0.43,
        marginLeft: width * 0.03
    },
    dropDownTextBlock: {
        width: width * 0.8,
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
        fontSize: 17,
        color: TextColor,
        paddingHorizontal: 10
    },
    alignRightSide: {
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    dropDownStyle: {
        height: 150,
        width: width * 0.43,
        position: 'relative',
        left: width * 0.51,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 8,
    },
    dropDownImageBlock: {
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropDownListTextStyle: {
        height: 50,
        fontSize: 15,
        color: TextColor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    dropDownImageBlockForPartitionView: {
        width: width * 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropDownArrowStyle: {
        height: 20,
        width: 20,
    },
    partitionInputBlock: {
        height: 30,
        width: width * 0.43,
        backgroundColor: '#fff',
        borderRadius: 30,
        borderColor: '#a59a9c',
        borderWidth: 1,
        justifyContent: 'center'
    },
    dropDownStyleForGender: {
        width: width * 0.43,
        height: 150,
        borderColor: '#a59a9c',
        borderWidth: 1,
        borderRadius: 20,
        marginTop: 8,
    },
    logoutStyle: {
        borderColor: TextColor,
        borderRadius: 40,
        borderWidth: 1,
        width: '50%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    shareStyle: {
        borderColor: TextColor,
        borderRadius: 40,
        borderWidth: 1,
        width: '40%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15
    },
    passcodeButtonStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        width: '42%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 20
    },
    dropDownContainerStyle: {
        paddingVertical: 0,
        paddingHorizontal: 0,
        backgroundColor: '#ffffff',
    },
    dropDownMainContainerStyle: {
        marginTop: 0,
    },
});
export default settingStyle;
