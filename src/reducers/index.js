/**
 * Entry point for the reducers that will be used in the component.
 */
import { combineReducers } from 'redux';
import { Root } from '../navigators/Root';
import checkNetworkReducer from './checkNetworkReducer';
import loginReducer from './loginReducer';
import logoutReducer from './logoutReducer';
import signupReducer from './signupReducer';
import generateCodeReducer from './generateCodeReducer';
import resetPasswordReducer from './resetPasswordReducer';
import changePasswordReducer from './changePasswordReducer';
import fetchProfileReducer from './fetchProfileReducer';
import updateProfileReducer from './updateProfileReducer';
import getJournalReducer from './getJournalReducer';
import createJournalReducer from './createJournalReducer';
import getPromptsReducer from './getPromptsReducer';
import getPromptsNotificationReducer from './getPromptsNotificationReducer';
import promptImageUploadReducer from './promptImageUploadReducer';
import selectedJournalReducer from './selectedJournalReducer';
import savePromptReducer from './savePromptReducer';
import editPromptImageReducer from './editPromptImageReducer';
import editPromptReducer from './editPromptReducer';
import deletePromptImageReducer from './deletePromptImageReducer';
import rotateImageReducer from './rotateImageReducer';
import duplicatePromptReducer from './duplicatePromptReducer';
import deletePromptReducer from './deletePromptReducer';
import movePromptReducer from './movePromptReducer';
import changeAuthorReducer from './changeAuthorReducer';
import createCustomPromptReducer from './createCustomPromptReducer';
import saveProfileScreenReducer from './saveProfileScreenReducer';
import fetchProfileDetailsReducer from './fetchProfileDetailsReducer';
import savePushSettingsReducer from './savePushSettingsReducer';
import secureLoginReducer from './secureLoginReducer';
import subscriptionPlanReducer from './subscriptionPlanReducer';
import deleteJournalReducer from './deleteJournalReducer';
import unsubscribeReducer from './unsubscribeReducer';
import updateSubscriptionReducer from './updateSubscriptionReducer';
import promptImageUpdateReducer from './promptImageUpdateReducer';
import generatePasscodeReducer from './generatePasscodeReducer';
import savePurchaseDetailsReducer from './savePurchaseDetailsReducer';
import tabBarOnPressDashboardReducer from './tabBarOnPressDashboardReducer';
import togglePrompt from './togglePromptFlag';
import passcodeReducer from './passcodeReducer';
import updateJournalReducer from './updateJournalReducer';
import referralReducer from './referralReducer';
import printingJournalSelect from './printingJournalSelect';
import addToCartReducer from './addToCartReducer';
import getCartReducer from './getCartReducer';
import brainTreePaymentReducer from './brainTreePaymentReducer';
import cartCheckoutReducer from './cartCheckoutReducer';
import deleteCartItemReducer from './deleteCartItemReducer';
import getUserOrders from './getUserOrders';
import changeNotificationStatus from './changeNotificationStatus';

/**
 *  Simply return the original `state` if `nextState` is null or undefined.
 * @param state
 * @param action
 * @returns {*}
 */
function nav(state, action) {
    const newState = Root.router.getStateForAction(action, state);
    return newState || state;
}

/**
 * Method contains combineReducer for combining reducers used in the components.
 * @type {Reducer<S>}
 */
const AppReducer = combineReducers({
    nav,
    checkNetworkReducer,
    loginReducer,
    logoutReducer,
    signupReducer,
    generateCodeReducer,
    resetPasswordReducer,
    fetchProfileReducer,
    updateProfileReducer,
    getJournalReducer,
    createJournalReducer,
    changePasswordReducer,
    getPromptsReducer,
    promptImageUploadReducer,
    selectedJournalReducer,
    savePromptReducer,
    editPromptImageReducer,
    deletePromptImageReducer,
    rotateImageReducer,
    duplicatePromptReducer,
    deletePromptReducer,
    movePromptReducer,
    changeAuthorReducer,
    createCustomPromptReducer,
    saveProfileScreenReducer,
    fetchProfileDetailsReducer,
    savePushSettingsReducer,
    secureLoginReducer,
    subscriptionPlanReducer,
    unsubscribeReducer,
    updateSubscriptionReducer,
    deleteJournalReducer,
    promptImageUpdateReducer,
    generatePasscodeReducer,
    savePurchaseDetailsReducer,
    tabBarOnPressDashboardReducer,
    togglePrompt,
    passcodeReducer,
    updateJournalReducer,
    getPromptsNotificationReducer,
    editPromptReducer,
    referralReducer,
    printingJournalSelect,
    addToCartReducer,
    getCartReducer,
    brainTreePaymentReducer,
    cartCheckoutReducer,
    deleteCartItemReducer,
    getUserOrders,
    changeNotificationStatus
});

const rootReducer = (state, action) => {
    if (action.type === 'LOG_OUT_SUCCESS') {
        state = undefined;
    }
    return AppReducer(state, action);
};

export default rootReducer;
