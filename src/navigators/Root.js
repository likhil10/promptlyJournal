import React from 'react';
import { Image } from 'react-native';
import {
    createBottomTabNavigator,
    createStackNavigator
} from 'react-navigation';
import { connect } from 'react-redux';
import {
    createReactNavigationReduxMiddleware,
    reduxifyNavigator
} from 'react-navigation-redux-helpers';
import Constants from '../utility/constants';
import SplashScreen from '../components/Common/splashScreen';
import ChooseSubscriptionScreen from '../components/InAppPurchaseScreen/chooseSubscriptionScreen';
import PurchaseScreen from '../components/InAppPurchaseScreen/purchaseScreen';
import ChangeSubscriptionPlan from '../components/SettingScreen/changeSubscriptionPlanScreen';
import LoginScreen from '../components/LoginScreen/loginScreen';
import SwiperScreen from '../components/OnBoardingScreens/swiperScreen';
import DashboardScreen from '../components/DashboardScreen/dashboardScreen';
import ForgotPasswordScreen from '../components/ForgotPasswordScreen/forgotPasswordScreen';
import ForgotPasscodeScreen from '../components/ForgotPasscodeScreen/forgotPasscodeScreen';
import AddJournalScreen from '../components/AddJournalScreen/addJournalSceen';
// import PrintScreen from '../components/PrintingPricingScreen/printScreen';
import JournalScreen from '../components/JournalScreen/journalScreen';
import Setting from '../components/SettingScreen/settings';
import SecureLoginScreen from '../components/SecureLoginScreen/secureLoginScreen';
import SelectSubscriptionPlanScreen from '../components/SubscriptionPlanScreen/selectSubscriptionPlanScreen';
import PrintScreen from '../components/PrintingPricingScreen/printingPricingScreen';
// import CartScreen from '../components/CartScreen/cartScreen';
// import OrderScreen from '../components/OrderScreen/orderScreen';
import commonStyle from '../components/Common/commonStyle';

const TAB_ICON_PRINT = require('../assets/icons/print_icon.png');
const TAB_ICON_PRINT_TRANSPARENT = require('../assets/icons/print_trasparent.png');


// const Print = createStackNavigator({
//     PrintScreen: { screen: PrintScreen },
//     CartScreen: { screen: CartScreen },
// }, {
//     headerMode: 'none',
//     headerBackTitle: null,
// });


/**
 * Screens for the tab Navigator.
 */

const DashboardScreenNavigator = createBottomTabNavigator({
    JournalScreen: { screen: JournalScreen },
    AddJournalScreen: { screen: AddJournalScreen },
    DashboardScreen: { screen: DashboardScreen },
    PrintScreen: {
        screen: PrintScreen,
        navigationOptions: ({ navigation }) =>
            ({
                tabBarIcon: () => (
                    <Image
                        source={!navigation.isFocused() ? TAB_ICON_PRINT_TRANSPARENT : TAB_ICON_PRINT}
                        style={commonStyle.tabIconStyle}
                    />
                ),
                tabBarOnPress({ defaultHandler }) {
                    navigation.popToTop();
                    defaultHandler();
                }
            })
    },
    SettingScreen: { screen: Setting },
}, {
    tabBarOptions: {
        style: {
            height: 60,
        },
        showLabel: false,
        inactiveTintColor: Constants.TEXT_COLOR,
        activeTintColor: Constants.TEXT_COLOR,
    },
    initialRouteName: 'DashboardScreen',
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
    lazy: false,
});

/**
 * Root stack for all the screens.
 */
const Root = createStackNavigator({
    SplashScreen: { screen: SplashScreen },
    SecureLoginScreen: { screen: SecureLoginScreen },
    LoginScreen: { screen: LoginScreen },
    SelectSubscriptionPlanScreen: { screen: SelectSubscriptionPlanScreen },
    AddJournalScreen: { screen: AddJournalScreen },
    DashboardScreenNavigator: { screen: DashboardScreenNavigator },
    JournalScreen: { screen: JournalScreen },
    ForgotPasswordScreen: { screen: ForgotPasswordScreen },
    ForgotPasscodeScreen: { screen: ForgotPasscodeScreen },
    ChooseSubscriptionScreen: { screen: ChooseSubscriptionScreen },
    ChangeSubscriptionPlan: { screen: ChangeSubscriptionPlan },
    PurchaseScreen: { screen: PurchaseScreen },
    SwiperScreen: { screen: SwiperScreen },
    // OrderScreen: { screen: OrderScreen, },
}, {
    headerMode: 'none',
    headerBackTitle: null,
    navigationOptions: {
        headerStyle: {
            backgroundColor: Constants.THEME_COLOR,
            shadowColor: 'transparent',
            shadowRadius: 0,
            elevation: 0,
            shadowOffset: {
                height: 0
            },
        }
    }
});


const middlewareNavigator = createReactNavigationReduxMiddleware(
    'root',
    state => state.nav
);
const RootNavigator = reduxifyNavigator(Root, 'root');
const mapStateToProps = state => ({
    state: state.nav,
});
const AppNavigator = connect(mapStateToProps)(RootNavigator);
export {
    AppNavigator,
    Root,
    middlewareNavigator
};
