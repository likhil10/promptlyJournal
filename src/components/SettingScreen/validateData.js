import _ from 'lodash';
import { equalString, isEmpty, validateName, isValidUSZipcode } from '../../utility/helperComponent';

export function checkProfileData(currentState) {
    const {
        firstName, lastName, oldPassword, newPassword, confirmPassword, oldPasscode, newPasscode, shippingZipCode,
        shippingContactNo, shippingCountry, shippingCity, shippingState, billingCountry,
        billingCity, billingState, billingZipCode, billingContactNo, billingAddressOne, billingAddressTwo, shippingAddressOne, shippingAddressTwo
    } = currentState;
    if (isEmpty(firstName)) {
        return { flag: false, msg: 'Please enter first name' };
    } else if (!isEmpty(firstName) && !validateName(firstName.trim())) {
        return { flag: false, msg: 'Please enter a valid first name' };
    } else if (isEmpty(lastName)) {
        return { flag: false, msg: 'Please enter last name' };
    } else if (!isEmpty(lastName) && !validateName(lastName.trim())) {
        return { flag: false, msg: 'Please enter a valid last name' };
    } else if (isEmpty(oldPassword) && !isEmpty(newPassword) && !isEmpty(confirmPassword)) {
        return { flag: false, msg: 'Please enter old password' };
    } else if (isEmpty(newPassword) && !isEmpty(oldPassword) && !isEmpty(confirmPassword)) {
        return { flag: false, msg: 'Please enter new password' };
    } else if (!isEmpty(newPassword) && newPassword.length < 8) {
        return { flag: false, msg: 'Password must be at least 8 characters long' };
    } else if (!isEmpty(oldPassword) && oldPassword.length < 8) {
        return { flag: false, msg: 'Password must be at least 8 characters long' };
    } else if (isEmpty(confirmPassword) && !isEmpty(oldPassword) && !isEmpty(newPassword)) {
        return { flag: false, msg: 'Please enter confirm password' };
    } else if (!equalString(newPassword, confirmPassword)) {
        return { flag: false, msg: 'Password doesn\'t match' };
    } else if (!isEmpty(oldPasscode) && oldPasscode.length < 4) {
        return { flag: false, msg: 'Please enter Valid 4 digit Passcode' };
    } else if (isEmpty(oldPasscode) && !isEmpty(newPasscode)) {
        return { flag: false, msg: 'Please enter a Valid 4 digit old Passcode' };
    } else if (!isEmpty(newPasscode) && newPasscode.length < 4) {
        return { flag: false, msg: 'Please enter a Valid 4 digit Passcode' };
    } else if (!isEmpty(billingAddressOne) && isEmpty(billingAddressOne.trim())) {
        return { flag: false, msg: 'Please enter a Valid Address' };
    } else if (!isEmpty(billingAddressTwo) && isEmpty(billingAddressTwo.trim())) {
        return { flag: false, msg: 'Please enter a Valid Address' };
    } else if (!isEmpty(billingCountry) && isEmpty(billingCountry.trim())) {
        return { flag: false, msg: 'Please enter a Valid Country name' };
    } else if (!isEmpty(billingCountry) && !validateName(billingCountry.trim())) {
        return { flag: false, msg: 'Please enter a Valid Country name' };
    } else if (!isEmpty(billingCity) && isEmpty(billingCity.trim())) {
        return { flag: false, msg: 'Please enter a Valid City name' };
    } else if (!isEmpty(billingCity) && !validateName(billingCity.trim())) {
        return { flag: false, msg: 'Please enter a Valid City name' };
    } else if (!isEmpty(billingState) && isEmpty(billingState.trim())) {
        return { flag: false, msg: 'Please enter a Valid state name' };
    } else if (!isEmpty(billingState) && !validateName(billingState.trim())) {
        return { flag: false, msg: 'Please enter a Valid state name' };
    } else if (!isEmpty(billingZipCode) && isEmpty(billingZipCode.trim())) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(billingZipCode) && !isValidUSZipcode(billingZipCode.trim())) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(billingZipCode) && billingZipCode.trim().length < 5) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(billingContactNo) && billingContactNo.length !== 14) {
        return { flag: false, msg: 'Please enter a Valid 10 digit Contact No.' };
    } else if (!isEmpty(billingContactNo) && billingContactNo === '(000) 000-0000') {
        return { flag: false, msg: 'Please enter a Valid 10 digit Contact No.' };
    } else if (!isEmpty(shippingAddressOne) && isEmpty(shippingAddressOne.trim())) {
        return { flag: false, msg: 'Please enter a Valid Address' };
    } else if (!isEmpty(shippingAddressTwo) && isEmpty(shippingAddressTwo.trim())) {
        return { flag: false, msg: 'Please enter a Valid Address' };
    } else if (!isEmpty(shippingCountry) && isEmpty(shippingCountry.trim())) {
        return { flag: false, msg: 'Please enter a Valid Country name' };
    } else if (!isEmpty(shippingCountry) && !validateName(shippingCountry.trim())) {
        return { flag: false, msg: 'Please enter a Valid Country name' };
    } else if (!isEmpty(shippingCity) && isEmpty(shippingCity.trim())) {
        return { flag: false, msg: 'Please enter a Valid City name' };
    } else if (!isEmpty(shippingCity) && !validateName(shippingCity.trim())) {
        return { flag: false, msg: 'Please enter a Valid City name' };
    } else if (!isEmpty(shippingState) && isEmpty(shippingState.trim())) {
        return { flag: false, msg: 'Please enter a Valid state name' };
    } else if (!isEmpty(shippingState) && !validateName(shippingState.trim())) {
        return { flag: false, msg: 'Please enter a Valid state name' };
    } else if (!isEmpty(shippingZipCode) && isEmpty(shippingZipCode.trim())) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(shippingZipCode) && !isValidUSZipcode(shippingZipCode.trim())) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(shippingZipCode) && shippingZipCode.trim().length < 5) {
        return { flag: false, msg: 'Please enter a Valid 5 digit Zip code' };
    } else if (!isEmpty(shippingContactNo) && shippingContactNo.length !== 14) {
        return { flag: false, msg: 'Please enter a Valid 10 digit Contact No.' };
    } else if (!isEmpty(shippingContactNo) && shippingContactNo === '(000) 000-0000') {
        return { flag: false, msg: 'Please enter a Valid 10 digit Contact No.' };
    }
    return { flag: true, msg: 'Validation success' };
}

export function validateProfileData(currentState) {
    const {
        firstName, lastName, oldPassword, newPassword, oldPasscode, newPasscode, billingAddressOne, billingAddressTwo, billingCountry,
        billingCity, billingState, billingZipCode, billingContactNo, shippingAddressOne, shippingAddressTwo,
        shippingCountry, shippingCity, shippingState, shippingZipCode, shippingContactNo
    } = currentState;

    const validData = checkProfileData(currentState);

    if (!validData.flag) {
        return validData;
    }
    const body = {
        user: {
            first_name: firstName,
            last_name: lastName,
            old_password: oldPassword,
            new_password: newPassword,
            old_passcode: oldPasscode,
            new_passcode: newPasscode,
            billing_info: {
                address1: billingAddressOne,
                address2: billingAddressTwo,
                country: billingCountry,
                city: billingCity,
                state: billingState,
                zipcode: billingZipCode,
                contactNumber: billingContactNo
            },
            shipping_info: {
                address1: shippingAddressOne,
                address2: shippingAddressTwo,
                country: shippingCountry,
                city: shippingCity,
                state: shippingState,
                zipcode: shippingZipCode,
                contactNumber: shippingContactNo
            }
        }
    };
    return { flag: true, msg: body };
}

export function validatePushSettingData(currentState) {
    const {
        renderDays, renderTime, frequencyPeriodsId, frequencyTimesId, timeZoneValue
    } = currentState;
    const body = {
        frequency_time: frequencyTimesId,
        frequency_period: frequencyPeriodsId,
        available_days_week: renderDays,
        available_times_day: renderTime,
        timezone: timeZoneValue
    };


    return { flag: true, data: body };
}

export function validateAddress(address) {
    delete address.address2;
    if (_.some(address, _.isEmpty)) {
        return 'Please fill out all the required information';
    } else if (!validateName(address.city)) {
        return 'Please enter a Valid City name';
    } else if (!validateName(address.state)) {
        return 'Please enter a Valid state name';
    } else if (!isValidUSZipcode(address.zipcode)) {
        return 'Please enter a Valid 5 digit Zip code';
    } else if (address.zipcode && address.zipcode.length < 5) {
        return 'Please enter a Valid 5 digit Zip code';
    } else if (address.contactNumber && address.contactNumber.length !== 14) {
        return 'Please enter a Valid 10 digit Contact No.';
    } else if (address.contactNumber && address.contactNumber === '(000) 000-0000') {
        return 'Please enter a Valid 10 digit Contact No.';
    }
    return false;
}
