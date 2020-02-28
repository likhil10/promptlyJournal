import { Dimensions } from 'react-native';
import constant from '../../utility/constants';

const React = require('react-native');

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const TextColor = '#736063';
const journalStyle = React.StyleSheet.create({

    listItemContainer: {
        backgroundColor: '#f5f5f5',
        marginVertical: 10,
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        padding: 5
    },
    subHeaderTextStyle: {
        color: TextColor,
        fontSize: 16,
        fontFamily: constant.SUB_HEADER_FONT,
        fontStyle: 'italic',
        textAlign: 'center',
        width: '100%'
    },
    customListItemContainer: {
        marginVertical: 10,
        width: '80%',
        flex: 1,
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: TextColor,
        padding: 5
    },
    customListItemContainerEditButton: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 5,
        borderColor: TextColor,
    },
    sectionItemContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 5
    },
    rightContainer: {
        width: deviceWidth * 0.17,
    },
    sectionsRightContainer: {
        width: '12%',
    },
    imageCircle: {
        width: deviceHeight * 0.05,
        height: deviceHeight * 0.05,
        borderRadius: (deviceHeight * 0.05) / 2,
        backgroundColor: '#dedede',
        alignItems: 'center',
        margin: deviceHeight * 0.01,
        justifyContent: 'center'
    },
    headerImage: {
        width: deviceHeight * 0.05,
        height: deviceHeight * 0.05,
        borderRadius: (deviceHeight * 0.05) / 2,
    },
    leftContainer: {
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 2
    },
    journalItemContainer: {
        marginHorizontal: 20
    },
    downArrowIcon: {
        lineHeight: 16,
        height: 10,
        paddingRight: 5
    },
    linkContainer: {
        flexDirection: 'row',
        alignSelf: 'baseline',
        paddingVertical: 5
    },
    listPromptItemContainer: {
        backgroundColor: '#ffffff',
        marginTop: 10,
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 20,
        borderRadius: 10
    },
    rightPromptContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderLeftColor: '#e5e5e5',
    },
    middlePromptContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftPromptContainer: {
        flex: 10,
        paddingHorizontal: 20,
        justifyContent: 'center',
    },
    textStyle: {
        color: constant.TEXT_COLOR,
        fontSize: 18,
        fontFamily: constant.TEXT_FONT,
        letterSpacing: 1
    },
    deleteStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        width: '30%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10
    },
    textSaveStyle: {
        color: constant.TEXT_COLOR,
        fontSize: 20,
        fontFamily: constant.TEXT_FONT,
        letterSpacing: 1,
        textAlign: 'center',
        padding: 5,
    },
    saveStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        width: '25%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginTop: 5,
    },
    flexEndContainer: {
        alignItems: 'flex-end',
        flex: 1,
        justifyContent: 'center',
    },
    promptHeaderContainer: {
        flex: 4,
    },
    horizontalListItemContainer: {
        backgroundColor: 'transparent',
        marginRight: 10,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: TextColor,
        borderWidth: 1,
        padding: 10
    },
    promptImage: {
        width: '100%',
        height: '100%',

    },
    customPromptImage: {
        width: '100%',
        height: '100%',

    },
    optionsIconStyle: {
        width: deviceWidth * 0.1,
        height: deviceWidth * 0.1,
        resizeMode: 'contain',
        marginHorizontal: 5
    },
    textAreaContainer: {
        position: 'relative',
        // flex: 1,
        width: '100%',
        marginTop: 10,
    },
    hr: {
        height: 19,
        borderBottomWidth: 0.5,
        borderColor: constant.TEXT_COLOR
    },
    textArea: {
        fontSize: 16,
        lineHeight: 19,
        position: 'absolute',
        flex: 1,
        padding: 0,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
        borderColor: '#fff',
        width: '100%',
        color: constant.TEXT_COLOR,
        letterSpacing: 1
    },
    iconHeight50: {
        height: 50
    },
    imageContainer: {
        marginRight: 10,
        position: 'relative',
        height: 100,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.4)'
    },
    customImageContainer: {
        marginTop: 10,
        height: 100,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.4)',
        marginRight: 10
    },
    imageIconContainer: {
        zIndex: 1,
        backgroundColor: 'rgba(115, 96, 99, .7)',
        padding: 5
    },
    imageIconContainerTransparent: {
        zIndex: 1,
        padding: 5
    },
    iconLabel: {
        color: '#fff',
        fontSize: 9
    },
    textInput: {
        color: '#fff',
        fontSize: 16,
        fontFamily: constant.PARAGRAPH_TEXT_FONT,
        borderBottomWidth: 1,
        borderColor: '#fff',
        padding: 0
    },
    modalTextAreaContainer: {
        position: 'relative',
        width: '100%',
        marginTop: 10,
    }

});
module.exports = journalStyle;
