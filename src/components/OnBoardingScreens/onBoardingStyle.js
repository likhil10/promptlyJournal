import { Dimensions } from 'react-native';
import constant from '../../utility/constants';

const React = require('react-native');

const { height, width } = Dimensions.get('window');

const TextColor = '#736063';
const WhiteColor = '#ffffff';

const onBoardingStyle = React.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: WhiteColor,
    },
    heightWidth: {
        height,
        width,
    },
    swipeScreen: {
        flex: 1,
    },
    imageStyle: {
        width,
        height: 200,
        resizeMode: 'contain'
    },
    codeInput: {
        color: TextColor,
        borderColor: TextColor,
        fontSize: 50,
        fontWeight: '400'
    },
    justifyAlign: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardSize: {
        height: height * 0.25,
    },
    cardContainer: {
        marginVertical: 20,
        width,
        height: height * 0.4,
        // backgroundColor: constant.BACKGROUND_COLOR,
        backgroundColor: '#f6f4f5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardContent: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderRadius: 7,
        backgroundColor: '#f3ebd9',
        borderColor: '#716064',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 1,
        elevation: 1,
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
        color: '#8c7f84',
    },
    marginVertical20: {
        marginVertical: 20,
    },
    marginVertical15: {
        marginVertical: 15,
        letterSpacing: 1,
    },
    text: {
        color: TextColor,
        fontFamily: constant.HEADER_FONT,
        fontSize: 19,
        letterSpacing: 2,
    },
    size15: {
        fontSize: 15,
    },
    flexRow: {
        flexDirection: 'row',
    },
    nextStyle: {
        borderColor: '#e1e1e1',
        borderRadius: 40,
        borderWidth: 2,
        width: '42%',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginVertical: 10
    },
    textInput: {
        width: width * 0.8,
        height: height * 0.1,
        fontSize: 35,
        letterSpacing: 60,
        backgroundColor: WhiteColor,
    },
});
module.exports = onBoardingStyle;
