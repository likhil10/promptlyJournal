import { StyleSheet, Dimensions } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const TextColor = '#736063';
const BackgroundColor = '#f6f6f6';

const inAppStyle = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BackgroundColor,
    },
    midSection: {
        width: '85%',
        // height: '90%',
    },
    justifyAlign: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    spaceEvenly: {
        justifyContent: 'space-evenly',
    },
    border: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: TextColor,
    },
    cards: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: TextColor,
        borderRadius: 10,
    },
    expandedCards: {
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: TextColor,
        borderRadius: 10,
    },
    planName: {
        color: TextColor,
        padding: 10,
        fontSize: 25,
        textAlign: 'center',
    },
    greaterFont: {
        fontSize: 30,
        paddingLeft: 0,
        paddingBottom: 5,
        width: '90%',
        paddingTop: 5,
        // marginBottom: 5,
    },
    normalText: {
        margin: 3,
        fontSize: 15,
        color: TextColor,
    },
    normalTextBold: {
        margin: 3,
        fontSize: 15,
        color: TextColor,
        fontWeight: 'bold',
        width: '100%',
    },
    section: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subSection: {
        marginLeft: 30,
    },
    bullet: {
        color: TextColor,
        fontSize: 20,
    },
    flexRow: {
        flexDirection: 'row',
    },
    justifiedText: {
        textAlign: 'justify',
    },
    setWidth: {
        width: '80%',
    },
    purchaseButton: {
        backgroundColor: '#736063',
        height: '10%',
        width: deviceWidth * 0.4,
        marginVertical: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
        letterSpacing: 1,
    },
});

export default inAppStyle;
