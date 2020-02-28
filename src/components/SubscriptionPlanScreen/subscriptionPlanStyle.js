import { StyleSheet } from 'react-native';

const TextColor = '#736063';
const subscriptionPlanStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        color: TextColor,
        fontFamily: 'Lato-Regular',
    },
    subHeading: {
        fontSize: 12,
        color: TextColor
    },
    offer: {
        height: '45%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
        backgroundColor: '#716064',
    },
    tryText: {
        color: '#fff',
        fontFamily: 'Lato-Regular',
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 10,
    },
    freeText: {
        fontFamily: 'Lato-Regular',
        fontSize: 34,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 10,
    },
    cancelText: {
        fontFamily: 'Bodoni',
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 15
    },
    alreadyUser: {
        fontFamily: 'Lato-Regular',
        fontSize: 15,
        color: '#fff',
        marginBottom: 10,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: '#fff',
        width: '30%',
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: TextColor,
        fontSize: 15,
        opacity: 1
    },
    subPlan: {
        fontFamily: 'Lato-Regular',
        width: '100%',
        height: '30%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    subPlanText: {
        fontFamily: 'Lato-Regular',
        fontSize: 20,
        color: TextColor,
        letterSpacing: 2
    },
    cardContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        height: '90%',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '30%',
        height: '100%',
        borderWidth: 0.75,
        borderRadius: 5,
        borderColor: '#716064',
        color: '#8c7f84',
    },
    cardContent: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starterText: {
        fontSize: 10,
        color: TextColor,
        letterSpacing: 2,
    },
    billedText: {
        fontSize: 10,
        color: TextColor,
    },
    underline: {
        borderBottomWidth: 0.2,
        backgroundColor: TextColor,
        height: 0.5,
        width: 20,
        marginTop: 5,
    },
    moneyContainer: {
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        height: 40,
        marginBottom: 10,
    },
    money: {
        fontSize: 40,
        color: TextColor
    },
    amount: {
        fontSize: 25,
        marginTop: 6,
        color: TextColor
    },
    amountUnderlined: {
        fontSize: 24,
        marginTop: 6,
        height: 28,
        color: TextColor,
        borderColor: '#8c7f84',
    },
    monthly: {
        fontSize: 7,
        height: 10,
        color: TextColor,
    },
    button: {
        marginTop: 10,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12.5,
        width: '60%',
        backgroundColor: '#716062',
    },
    buttonText: {
        color: '#fff',
        fontSize: 10,
    },
    roundText: {
        color: '#fff',
        fontSize: 8,
        textAlign: 'center'
    },
    round: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        borderRadius: 17.5,
        backgroundColor: '#716062',
        position: 'absolute',
        right: 0,
        top: -15,
    },
    bottomContainer: {
        height: '25%',
        width: '100%',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
    },
    margin: {
        marginTop: 10,
    },
    starterPlan: {
        alignItems: 'center',
        marginTop: '5%',
        width: '31%',
        flexDirection: 'column',
    },
    borderVertical: {
        height: 16,
        width: 1,
        backgroundColor: TextColor,
    },
    borderHorizontal: {
        height: 1,
        width: '100%',
        backgroundColor: TextColor,
    },
    starterPlanText: {
        color: TextColor,
        fontSize: 8,
        width: '99%',
        height: 15,
        textAlign: 'center',
        // paddingTop: 2,
    },
    downDash: {
        alignSelf: 'flex-start',
        width: '50%',
        borderRightWidth: 1,
        borderColor: TextColor,
        height: '10%',
    },
    singleBook: {
        height: '100%',
        width: 8,
    },
    standardPlan: {
        alignItems: 'center',
        marginTop: '5%',
        width: '63%',
        flexDirection: 'column',
    },
    standardPlanText: {
        color: TextColor,
        fontSize: 8,
        width: '100%',
        height: 15,
        textAlign: 'center',
        // paddingTop: 3,
        borderWidth: 1,
        borderTopColor: '#fff',
        borderTopWidth: 0,
        borderColor: TextColor,
    },
    image: {
        alignItems: 'center',
        height: 30,
        width: 33,
        marginTop: 8
    },
    books: {
        height: '100%',
        width: '100%'
    },


});
export default subscriptionPlanStyle;
