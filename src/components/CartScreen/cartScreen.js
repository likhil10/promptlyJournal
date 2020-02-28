import React, { Component } from 'react';
import {
    Keyboard,
    NetInfo,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {
    NavigationActions,
    StackActions
} from 'react-navigation';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import style from './cartStyle';
import CartItem from './cartItem';
import { getCartAction } from '../../actions/getCartAction';
import { cartCheckoutAction } from '../../actions/cartCheckoutAction';
import { deleteCartItemAction } from '../../actions/deleteCartItemAction';
import Spinner from '../Common/spinner';
import AlertModal from '../Common/AlertModal';
import commonStyle from '../Common/commonStyle';
import constant from '../../utility/constants';
import Billing from './billingDetails';
import Shipping from './shippingDetails';
import Payment from './paymentDetails';
import { validateAddress } from '../SettingScreen/validateData';
import { usPhoneNumberFormat } from '../../utility/helperComponent';


class CartScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageAlert: '',
            openAlert: false,
            subTotal: 0,
            tax: 0,
            totalAmount: 0,
            activeSection: '',
            promoCode: '',
            sameAsBilling: false,
            selectedShipping: {},
            billingInfo: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                country: '',
                city: '',
                state: '',
                zipcode: '',
                contactNumber: ''
            },
            shippingInfo: {
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                country: '',
                city: '',
                state: '',
                zipcode: '',
                contactNumber: ''
            },
            addedPayment: {}
        };
        this.resetState = this.state;
    }


    componentDidMount() {
        this.fetchCartDetails();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.cartData && this.props.cartData !== nextProps.cartData) {
            const cartFullData = nextProps.cartData && nextProps.cartData.data;
            const totalAmount = cartFullData && this.calculateTotal(
                cartFullData.totalAmount,
                (cartFullData && cartFullData.shippingOptions[0] ? cartFullData.shippingOptions[0].amount : 0),
                cartFullData.tax
            );
            this.setState({
                subTotal: cartFullData.totalAmount && parseFloat(cartFullData.totalAmount.toFixed(2)),
                selectedShipping: cartFullData.shippingOptions[0],
                tax: cartFullData.tax && parseFloat(cartFullData.tax.toFixed(2)),
                totalAmount: totalAmount && parseFloat(totalAmount.toFixed(2))
            });
        }
    }

    fetchCartDetails = () => {
        const { dispatch } = this.props.navigation;
        dispatch(getCartAction()).then((res) => {
            const cartFullData = res && res.data;
            const totalAmount = cartFullData && this.calculateTotal(
                cartFullData.totalAmount,
                (cartFullData && cartFullData.shippingOptions[0] ? cartFullData.shippingOptions[0].amount : 0),
                cartFullData.tax
            );
            this.setState({
                subTotal: cartFullData.totalAmount && parseFloat(cartFullData.totalAmount.toFixed(2)),
                selectedShipping: cartFullData.shippingOptions[0],
                tax: cartFullData.tax && parseFloat(cartFullData.tax.toFixed(2)),
                totalAmount: totalAmount && parseFloat(totalAmount.toFixed(2)),
                billingInfo: cartFullData.billingAddress,
                shippingInfo: cartFullData.shippingAddress,
            });
        }).catch((err) => {
            this.openAlertModal(err);
        });
    }


    openAlertModal = (message) => {
        this.setState({
            openAlert: true,
            messageAlert: message,
        });
    };

    closeAlert = () => {
        this.setState({
            openAlert: false,
        });
    };

    navigateToPrintScreen = () => {
        const action = NavigationActions.navigate({
            routeName: 'DashboardScreenNavigator',
            action: StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({
                        routeName: 'PrintScreen',
                    })
                ],
            }),
        });
        this.props.navigation.dispatch(action);
    }

    handleAccording = (activeSection) => {
        this.setState({
            activeSection: (this.state.activeSection !== activeSection) ? activeSection : '',
        });
    };

    handleTextChange = (field, type, text) => {
        const statusCopy = Object.assign({}, this.state);
        if (type) {
            statusCopy[type][field] = field === 'contactNumber' ? usPhoneNumberFormat(text) : text;
        } else {
            statusCopy[field] = text;
        }
        this.setState(statusCopy);
    };

    toggleSameBillingOption = () => {
        this.setState({
            sameAsBilling: !this.state.sameAsBilling,
        });
    };

    calculateTotal = (subTotal, shippingCost, tax) => subTotal + shippingCost + tax

    toggleShippingOption = (item) => {
        const { subTotal, tax } = this.state;
        const totalAmount = this.calculateTotal(subTotal, (item.amount ? item.amount : 0), tax);
        this.setState({
            selectedShipping: item,
            totalAmount: totalAmount && (totalAmount.toFixed(2)),
        });
    };

    deleteCartItem = (id) => {
        const { dispatch } = this.props.navigation;
        NetInfo.isConnected.fetch()
            .then(isConnected => {
                if (isConnected) {
                    dispatch(deleteCartItemAction(id)).then(() => {
                        dispatch(getCartAction()).then(() => {
                        }).catch((err) => {
                            this.openAlertModal(err);
                        });
                    }).catch((err) => {
                        this.openAlertModal(err);
                    });
                } else {
                    this.openAlertModal(constant.NETWORK_ERROR);
                }
            });
    };

    addPaymentMethod = (payment) => {
        this.setState({
            addedPayment: payment,
        });
    };

    checkout = () => {
        const { dispatch } = this.props.navigation;
        const {
            sameAsBilling, billingInfo, shippingInfo, addedPayment, totalAmount, selectedShipping
        } = this.state;
        const billingError = validateAddress(billingInfo, _.isEmpty);
        const shippingError = validateAddress(shippingInfo, _.isEmpty);
        Keyboard.dismiss();
        if (_.isEmpty(addedPayment) && !addedPayment.nonce) {
            this.openAlertModal('Choose a payment method first');
        } else if (billingError) {
            this.openAlertModal(billingError);
        } else if (shippingError && !sameAsBilling) {
            this.openAlertModal(shippingError);
        } else {
            const body = {
                nonce: addedPayment.nonce,
                shipMethod: selectedShipping.type,
                amount: totalAmount.toString(),
                billing_address: billingInfo,
                shipping_address: sameAsBilling ? billingInfo : shippingInfo
            };
            NetInfo.isConnected.fetch()
                .then(isConnected => {
                    if (isConnected) {
                        dispatch(cartCheckoutAction(body))
                            .then(() => {
                                this.setState(this.resetState, () => this.fetchCartDetails());
                                this.openAlertModal(constant.ORDER_PLACED);
                            })
                            .catch((err) => {
                                this.openAlertModal(err);
                            });
                    } else {
                        this.openAlertModal(constant.NETWORK_ERROR);
                    }
                });
        }
    };

    renderAccordItem = (item) => {
        const {
            activeSection
        } = this.state;
        return (
            <View style={style.justifyAlign} key={item.key}>
                <View style={style.upperSection}>
                    <TouchableOpacity
                        style={style.accordTouchBody}
                        onPress={() => this.handleAccording(item.key)}
                    >
                        <View style={{ width: '90%' }}>
                            <Text style={[style.subHeadingTextStyle]}>
                                {item.key.toUpperCase()}{item.key !== 'payment' && ' DETAILS'}
                            </Text>
                        </View>
                        <View style={{ width: '10%', justifyContent: 'flex-start' }}>
                            <FontAwesome
                                name={activeSection && activeSection === item.key ? 'angle-down' : 'angle-right'}
                                size={30}
                                color={constant.TEXT_COLOR}
                            />
                        </View>
                    </TouchableOpacity>
                    {
                        activeSection && activeSection === item.key ? item.component : null
                    }
                </View>
                <View style={style.underlines} />
            </View>
        );
    }


    render() {
        const { fetching, cartData } = this.props;
        const {
            messageAlert, openAlert, subTotal, tax, totalAmount, sameAsBilling, selectedShipping, billingInfo,
            shippingInfo, addedPayment
        } = this.state;
        const cartFullData = cartData && cartData.data;
        const cartItems = cartFullData && cartFullData.items;
        const amountData = [
            { name: 'SUBTOTAL', value: subTotal },
            { name: 'SHIPPING', value: selectedShipping && selectedShipping.amount ? selectedShipping.amount : 0 },
            { name: 'EST. TAX', value: tax }];
        const AccordItems = [
            { key: 'billing', component: <Billing billingInfo={billingInfo} handleTextChange={this.handleTextChange} /> },
            {
                key: 'shipping',
                component:
                    <Shipping
                        sameAsBilling={sameAsBilling}
                        toggleSameBillingOption={this.toggleSameBillingOption}
                        selectedShipping={selectedShipping}
                        toggleShippingOption={this.toggleShippingOption}
                        shippingInfo={shippingInfo}
                        handleTextChange={this.handleTextChange}
                    />
            },
            {
                key: 'payment',
                component:
                    <Payment
                        showAlert={this.openAlertModal}
                        addPaymentMethod={this.addPaymentMethod}
                        addedPayment={addedPayment}
                        {...this.props}
                    />
            }];
        return (
            <View style={[style.container, style.paddingTopMost]}>
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps="handled"
                    alwaysBounceVertical={false}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    viewIsInsideTabBar
                >
                    <View style={[style.container, style.justifyAlign, commonStyle.paddingHorizontal20]}>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => this.props.navigation.goBack()}
                            style={style.linkContainer}
                        >
                            <MaterialIcons name="keyboard-backspace" size={30} color={constant.TEXT_COLOR} />
                        </TouchableOpacity>
                        <View style={style.headerContainer}>
                            <Text style={style.headerTextStyle}>CART</Text>
                            <View style={style.headerLine} />
                        </View>
                        { cartItems && cartItems.length ?
                            <View style={commonStyle.width100} >
                                {
                                    cartItems.map(item => (
                                        <CartItem item={item} deleteCartItem={this.deleteCartItem} key={item._id} />
                                    ))
                                }
                                <TouchableOpacity
                                    onPress={() => this.navigateToPrintScreen()}
                                    style={style.buttonBox}
                                >
                                    <Text style={[style.buttonText]}>ADD ANOTHER JOURNAL</Text>
                                </TouchableOpacity>
                                <View style={style.orderAmountContainer}>
                                    {
                                        amountData.map(item => (
                                            <View style={style.flexRowContainer} key={item.name}>
                                                <View style={style.width60} >
                                                    <Text style={style.amountTextStyle}>{item.name}</Text>
                                                </View>
                                                <View style={style.width40}>
                                                    <Text style={style.amountTextStyle}>${item.value}</Text>
                                                </View>
                                            </View>
                                        ))
                                    }
                                </View>
                                <View style={style.underlines} />
                                <View style={style.orderAmountContainer}>
                                    <View style={style.flexRowContainer}>
                                        <View style={style.width60} >
                                            <Text style={style.totalTextStyle}>Total</Text>
                                        </View>
                                        <View style={style.width40} >
                                            <Text style={style.totalTextStyle}>${totalAmount}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View> :
                            <View style={[style.buttonBox, { borderRadius: 0 }]}>
                                <Text style={[style.buttonText]}>{constant.NO_CART_ITEM}</Text>
                            </View>
                        }
                        <View style={[commonStyle.width100, commonStyle.paddingVertical20]}>
                            {
                                AccordItems.map((item => this.renderAccordItem(item)))
                            }
                            <TouchableOpacity
                                onPress={() => this.checkout()}
                                style={[style.themeButtonBox, !(cartItems && cartItems.length) && { backgroundColor: '#e6e6e6', }]}
                                disabled={!(cartItems && cartItems.length)}
                            >
                                <Text style={[style.themeButtonText]}>CHECKOUT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
                <Spinner
                    animating={fetching}
                />
                <AlertModal
                    message={messageAlert}
                    open={openAlert}
                    close={this.closeAlert}
                />
            </View>
        );
    }
}

CartScreen.propTypes = {
    navigation: PropTypes.object.isRequired,
    fetching: PropTypes.bool.isRequired,
    cartData: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    isConnected: state.checkNetworkReducer.isConnected,
    fetching: state.getCartReducer.fetching || state.brainTreePaymentReducer.fetching
        || state.deleteCartItemReducer.fetching || state.cartCheckoutReducer.fetching,
    cartData: state.getCartReducer.cartData
});

export default connect(mapStateToProps)(CartScreen);
